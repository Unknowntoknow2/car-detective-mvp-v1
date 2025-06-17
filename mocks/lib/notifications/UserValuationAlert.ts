
import { supabase } from '@/integrations/supabase/client';

export async function notifyUserOfDealerOffer({
  userEmail,
  vin,
  offerPrice,
  dealerName = 'A dealer'
}: {
  userEmail: string;
  vin: string;
  offerPrice: number;
  dealerName?: string;
}) {
  try {
    console.log('🔔 Triggering user notification for new dealer offer');
    
    const { data, error } = await supabase.functions.invoke('trigger-email-campaign', {
      body: {
        emailType: 'dealer_offer_notification',
        email: userEmail,
        data: {
          vin,
          offerPrice,
          dealerName,
          subject: `🚘 New Dealer Offer for Your Vehicle`,
          message: `${dealerName} has submitted an offer of $${offerPrice.toLocaleString()} for your vehicle (VIN: ${vin}). Log in to review and potentially accept the offer.`
        }
      }
    });

    if (error) {
      console.error('❌ Failed to send user notification:', error);
      throw error;
    }

    console.log('✅ User notification sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error sending user notification:', error);
    return { success: false, error };
  }
}

export async function notifyDealerOfAcceptedOffer({
  dealerEmail,
  userEmail,
  vin,
  offerPrice
}: {
  dealerEmail: string;
  userEmail: string;
  vin: string;
  offerPrice: number;
}) {
  try {
    console.log('🔔 Triggering dealer notification for accepted offer');
    
    const { data, error } = await supabase.functions.invoke('trigger-email-campaign', {
      body: {
        emailType: 'offer_accepted_notification',
        email: dealerEmail,
        data: {
          vin,
          offerPrice,
          userEmail,
          subject: `✅ Your Offer Has Been Accepted!`,
          message: `Great news! Your offer of $${offerPrice.toLocaleString()} for vehicle VIN: ${vin} has been accepted. Contact the owner at ${userEmail} to finalize the transaction.`
        }
      }
    });

    if (error) {
      console.error('❌ Failed to send dealer notification:', error);
      throw error;
    }

    console.log('✅ Dealer notification sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error sending dealer notification:', error);
    return { success: false, error };
  }
}
