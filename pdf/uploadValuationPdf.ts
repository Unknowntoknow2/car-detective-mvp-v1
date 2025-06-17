
import { supabase } from '@/integrations/supabase/client';
import { generateValuationPdf } from './generateValuationPdf';
import { ReportData } from './types';
import { v4 as uuidv4 } from 'uuid';
import { generateAINSummaryForPdf, formatAINSummaryForPdf } from '../ain/generateSummaryForPdf';
import { 
  generateTrackingId, 
  createWatermarkConfig, 
  createTrackingConfig,
  addWatermarkToPdf,
  logPdfGeneration
} from './addWatermarkAndTracking';
import { generateDebugInfo, formatDebugInfoForPdf } from './generateDebugInfo';
import { sendPdfToVerifiedDealers } from '../../emails/sendValuationPdfToDealer';

export interface UploadPdfResult {
  url: string;
  filename: string;
  trackingId: string;
  publicUrl?: string;
}

export async function uploadValuationPdf(
  reportData: ReportData,
  userId: string,
  options: {
    emailToDealers?: boolean;
    includeDebugInfo?: boolean;
    includeAINSummary?: boolean;
    includeAuctionData?: boolean;
  } = {}
): Promise<UploadPdfResult> {
  try {
    console.log('🚀 Starting enhanced PDF generation with auction data and AIN summary');
    
    // Generate tracking ID and watermark config
    const trackingId = generateTrackingId(userId, reportData.vin);
    const watermarkConfig = createWatermarkConfig(true);
    const trackingConfig = createTrackingConfig(userId, reportData.vin);

    // Generate AIN summary if requested (default true for premium)
    let ainSummary = '';
    if (options.includeAINSummary !== false) {
      try {
        console.log('🧠 Generating AIN summary for PDF');
        const summaryData = await generateAINSummaryForPdf(reportData);
        ainSummary = formatAINSummaryForPdf(summaryData);
        console.log('✅ AIN summary generated successfully');
      } catch (error) {
        console.error('❌ Failed to generate AIN summary:', error);
      }
    }

    // Generate debug info if requested (typically for internal use)
    let debugInfo = '';
    if (options.includeDebugInfo && process.env.NODE_ENV === 'development') {
      try {
        const debugData = generateDebugInfo(reportData);
        debugInfo = formatDebugInfoForPdf(debugData);
        console.log('🔧 Debug info generated');
      } catch (error) {
        console.error('❌ Failed to generate debug info:', error);
      }
    }

    // Generate the PDF with enhanced features
    console.log('📄 Generating PDF with enhanced data:', {
      hasAuctionData: !!(reportData.auctionResults && reportData.auctionResults.length > 0),
      hasAINSummary: !!ainSummary,
      hasDebugInfo: !!debugInfo,
      trackingId
    });

    const pdfBytes = await generateValuationPdf(reportData, {
      isPremium: true,
      includeAuctionData: options.includeAuctionData !== false,
      includeExplanation: true,
      includeAINSummary: options.includeAINSummary !== false,
      watermark: watermarkConfig.enabled ? watermarkConfig.text : undefined,
      trackingId,
      ainSummary,
      debugInfo
    });

    // Create filename with tracking ID
    const timestamp = Date.now();
    const vinSuffix = reportData.vin ? `-${reportData.vin.slice(-6)}` : '';
    const filename = `valuation-${reportData.make}-${reportData.model}${vinSuffix}-${trackingId}.pdf`;

    // Upload to Supabase Storage with enhanced metadata
    const { data, error } = await supabase.storage
      .from('premium_reports')
      .upload(filename, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
        metadata: {
          user_id: userId,
          tracking_id: trackingId,
          vehicle_vin: reportData.vin || '',
          vehicle_make: reportData.make,
          vehicle_model: reportData.model,
          estimated_value: reportData.estimatedValue.toString(),
          includes_ain_summary: String(!!ainSummary),
          includes_debug_info: String(!!debugInfo),
          includes_auction_data: String(!!(reportData.auctionResults && reportData.auctionResults.length > 0)),
          watermarked: String(watermarkConfig.enabled),
          auction_records_count: String(reportData.auctionResults?.length || 0)
        }
      });

    if (error) {
      console.error('❌ Error uploading PDF:', error);
      throw new Error(`Failed to upload PDF: ${error.message}`);
    }

    // Generate a signed URL valid for 24 hours
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('premium_reports')
      .createSignedUrl(filename, 24 * 60 * 60); // 24 hours

    if (signedUrlError) {
      console.error('❌ Error creating signed URL:', signedUrlError);
      throw new Error(`Failed to create download URL: ${signedUrlError.message}`);
    }

    if (!signedUrlData?.signedUrl) {
      throw new Error('No signed URL returned from Supabase');
    }

    // Log PDF generation for audit trail
    if (reportData.vin) {
      try {
        await logPdfGeneration(trackingId, reportData.vin, userId);
        console.log('✅ PDF generation logged successfully');
      } catch (logError) {
        console.error('⚠️ Failed to log PDF generation:', logError);
        // Don't fail the upload if logging fails
      }
    }

    const result: UploadPdfResult = {
      url: signedUrlData.signedUrl,
      filename,
      trackingId
    };

    // Email to verified dealers if requested
    if (options.emailToDealers !== false) {
      try {
        console.log('📧 Sending PDF to verified dealers');
        await sendPdfToVerifiedDealers(
          trackingId,
          signedUrlData.signedUrl,
          {
            year: reportData.year,
            make: reportData.make,
            model: reportData.model,
            vin: reportData.vin
          },
          reportData.estimatedValue
        );
        console.log('✅ PDF emailed to dealers successfully');
      } catch (emailError) {
        console.error('❌ Failed to email PDF to dealers:', emailError);
        // Don't fail the upload if email fails
      }
    }

    console.log('🎉 Enhanced PDF generation completed successfully');
    return result;
  } catch (error) {
    console.error('❌ Error in uploadValuationPdf:', error);
    throw error;
  }
}

export async function deletePremiumReport(filename: string): Promise<void> {
  const { error } = await supabase.storage
    .from('premium_reports')
    .remove([filename]);

  if (error) {
    console.error('Error deleting PDF:', error);
    throw new Error(`Failed to delete PDF: ${error.message}`);
  }
}
