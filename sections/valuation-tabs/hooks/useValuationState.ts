
import { useState } from "react";
import { useVehicleLookup } from "@/hooks/useVehicleLookup";
import { ManualEntryFormData, VehicleData, ConditionLevel } from "@/types/manualEntry";

export function useValuationState() {
  const [activeTab, setActiveTab] = useState("vin");
  const [vinData, setVinData] = useState("");
  const [plateData, setPlateData] = useState({ plate: "", state: "" });
  const [manualData, setManualData] = useState<ManualEntryFormData>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    condition: ConditionLevel.Good,
    zipCode: "",
  });
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const { lookupVehicle, isLoading, vehicle, error } = useVehicleLookup();

  const handleVinLookup = async () => {
    if (vinData.length === 17) {
      await lookupVehicle("vin", vinData);
    }
  };

  const handlePlateLookup = async () => {
    if (plateData.plate && plateData.state) {
      await lookupVehicle("plate", plateData.plate, plateData.state);
    }
  };

  const handleManualSubmit = async () => {
    await lookupVehicle("manual", "", undefined, manualData);
  };

  return {
    activeTab,
    setActiveTab,
    vinData,
    setVinData,
    plateData,
    setPlateData,
    manualData,
    setManualData,
    vehicleData: vehicle || vehicleData,
    setVehicleData,
    isLoading,
    error,
    handleVinLookup,
    handlePlateLookup,
    handleManualSubmit,
  };
}
