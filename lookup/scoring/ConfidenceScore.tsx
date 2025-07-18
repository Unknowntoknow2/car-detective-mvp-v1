
import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfidenceScoreProps {
  score: number;
  comparableVehicles: number;
}

export const ConfidenceScore = (
  { score, comparableVehicles }: ConfidenceScoreProps,
) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium text-muted-foreground">
        Confidence Score
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p className="font-medium mb-1">Data Confidence Rating</p>
              <p className="text-sm">
                Based on {comparableVehicles} comparable vehicles in your area.
              </p>
              <ul className="text-sm list-disc pl-4 mt-2">
                <li>Market sample size</li>
                <li>Data completeness</li>
                <li>Regional price accuracy</li>
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <p className="text-lg font-semibold text-primary">
      {score}%
    </p>
  </div>
);
