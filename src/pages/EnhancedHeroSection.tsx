import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client"; // Your real supabase client

export default function EnhancedHeroSection() {
  const [vin, setVin] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup() {
    setLoading(true);
    setError("");
    setVehicle(null);
    // Example Supabase RPC/REST call (customize for your schema!)
    const { data, error } = await supabase
      .from("decoded_vehicles")
      .select("*")
      .eq("vin", vin)
      .single();
    if (error) setError(error.message);
    else setVehicle(data);
    setLoading(false);
  }

  return (
    <section className="py-10">
      <input
        value={vin}
        onChange={e => setVin(e.target.value)}
        placeholder="Enter VIN"
        className="border rounded px-2 py-1"
      />
      <button onClick={handleLookup} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">Lookup</button>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {vehicle && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <div><b>Make:</b> {vehicle.make}</div>
          <div><b>Model:</b> {vehicle.model}</div>
          <div><b>Year:</b> {vehicle.year}</div>
        </div>
      )}
    </section>
  );
}
