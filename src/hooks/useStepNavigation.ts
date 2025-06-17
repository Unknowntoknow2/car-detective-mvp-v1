
import { useState, useCallback } from "react";
import { ManualEntryFormData } from "@/types/manual-entry";

type LookupType = "vin" | "plate" | "manual" | "photo";

interface UseStepNavigationProps {
  initialStep?: number;
  totalSteps: number;
  onLookup: (type: LookupType, identifier: string, state?: string, manualData?: any) => Promise<void>;
}

export function useStepNavigation({ 
  initialStep = 1, 
  totalSteps, 
  onLookup 
}: UseStepNavigationProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = useCallback(async (
    type: LookupType,
    value: string,
    state?: string,
    manualData?: ManualEntryFormData
  ) => {
    setIsLoading(true);
    try {
      await onLookup(type, value, state, manualData);
    } finally {
      setIsLoading(false);
    }
  }, [onLookup]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    handleLookup,
    isLoading,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps
  };
}
