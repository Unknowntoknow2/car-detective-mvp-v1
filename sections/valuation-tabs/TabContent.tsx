import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AICondition } from "@/types/photo";
import { PhotoUpload } from "@/components/photo/PhotoUpload";

interface TabContentProps {
  vehicle: any;
  isLoading: boolean;
  onConditionAnalysisComplete: (analysis: AICondition) => void;
  onPhotoUpload: (files: File[]) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  vehicle,
  isLoading,
  onConditionAnalysisComplete,
  onPhotoUpload
}) => {
  const [conditionOverride, setConditionOverride] = useState('');

  const handleConditionOverrideChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConditionOverride(e.target.value);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="condition-override">Override AI Condition</Label>
        <Input
          type="text"
          id="condition-override"
          placeholder="Enter condition (e.g., Excellent, Good, Fair)"
          value={conditionOverride}
          onChange={handleConditionOverrideChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <Label>Upload Photos</Label>
        {/* Fix the PhotoUpload component usage */}
          <PhotoUpload
            isLoading={isLoading}
            vehicle={vehicle}
            onPhotosChange={(photos) => {
              console.log('Photos changed:', photos);
              // Handle photo changes here
            }}
            onPhotoUpload={(files: File[]) => {
              console.log('Photos uploaded:', files);
              onPhotoUpload(files);
            }}
          />
      </div>

      <div>
        <Button disabled={isLoading}>
          Analyze Vehicle
        </Button>
      </div>
    </div>
  );
};
