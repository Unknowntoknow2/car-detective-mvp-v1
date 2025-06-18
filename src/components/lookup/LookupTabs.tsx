import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Tab = "vin" | "plate" | "manual";

export default function LookupTabs() {
  const [tab, setTab] = useState<Tab>("vin");
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVinSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    // Supabase query
    const { data, error } = await supabase
      .from("decoded_vehicles")
      .select("vin, make, model, year, trim, engine, bodytype, transmission, drivetrain, fueltype, doors, seats, displacementl, enginecylinders")
      .eq("vin", vin)
      .single();

    setLoading(false);
    if (error) setError("No vehicle found for that VIN.");
    else setResult(data);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto mb-6">
      <div className="flex mb-4">
        {(["vin", "plate", "manual"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 font-medium rounded-t transition-colors ${
              tab === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {t === "vin" ? "VIN Lookup" : t === "plate" ? "Plate Lookup" : "Manual Entry"}
          </button>
        ))}
      </div>
      {tab === "vin" && (
        <form className="flex flex-col gap-3" onSubmit={handleVinSubmit}>
          <input
            value={vin}
            onChange={e => setVin(e.target.value)}
            placeholder="Enter VIN"
            className="border px-3 py-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold" disabled={loading}>
            {loading ? "Looking up..." : "Lookup VIN"}
          </button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {result && (
            <div className="mt-4 bg-green-50 p-4 rounded shadow text-left">
              <div><b>Make:</b> {result.make}</div>
              <div><b>Model:</b> {result.model}</div>
              <div><b>Year:</b> {result.year}</div>
              <div><b>Trim:</b> {result.trim}</div>
              <div><b>Engine:</b> {result.engine}</div>
              <div><b>Body:</b> {result.bodytype || result.bodyType}</div>
              <div><b>Transmission:</b> {result.transmission}</div>
              <div><b>Drivetrain:</b> {result.drivetrain}</div>
              <div><b>Fuel Type:</b> {result.fueltype}</div>
              <div><b>Doors:</b> {result.doors}</div>
              <div><b>Seats:</b> {result.seats}</div>
              <div><b>Displacement (L):</b> {result.displacementl}</div>
              <div><b>Engine Cylinders:</b> {result.enginecylinders}</div>
            </div>
          )}
        </form>
      )}
      {/* Plate and manual tabs can have similar code, or you can add later */}
      {tab === "plate" && (
        <div className="text-gray-400 italic p-6 text-center">Plate Lookup coming soon.</div>
      )}
      {tab === "manual" && (
        <div className="text-gray-400 italic p-6 text-center">Manual Entry coming soon.</div>
      )}
    </div>
  );
}
