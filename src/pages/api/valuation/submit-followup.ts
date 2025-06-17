
import { supabase } from '@/integrations/supabase/client';
import { FollowUpAnswers } from '@/types/follow-up-answers';

export default async function submitFollowUp(followUpData: FollowUpAnswers) {
  try {
    // Validate required fields
    if (!followUpData.vin) {
      throw new Error('VIN is required');
    }

    // Create a valuation record first
    const { data: valuation, error: valuationError } = await supabase
      .from('valuations')
      .insert({
        vin: followUpData.vin,
        zip_code: followUpData.zip_code,
        mileage: followUpData.mileage,
        condition: followUpData.condition,
        estimated_value: 25000, // This would be calculated based on the follow-up data
        confidence_score: 85,
        user_id: null, // For now, allowing anonymous submissions
        created_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (valuationError) {
      console.error('Error creating valuation:', valuationError);
      throw new Error('Failed to create valuation');
    }

    // Store the follow-up answers
    const { error: followUpError } = await supabase
      .from('follow_up_answers')
      .insert({
        ...followUpData,
        valuation_id: valuation.id,
        created_at: new Date().toISOString()
      });

    if (followUpError) {
      console.error('Error storing follow-up answers:', followUpError);
      throw new Error('Failed to store follow-up data');
    }

    return { success: true, id: valuation.id };
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
}
