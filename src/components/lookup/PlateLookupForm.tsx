import React, { useState } from "react";

export default function PlateLookupForm() {
  const [plate, setPlate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    // TODO: Replace with real Supabase API call
    setTimeout(() => {
      setLoading(false);
      if (!plate) {
        setError("Please enter a license plate.");
      } else {
        setResult({ make: "HONDA", model: "Civic", year: "2022" });
      }
    }, 1200);
  }

  return (
    <form onSubmit={handleLookup}>
      <input
        className="border rounded p-2 w-full mb-2"
        placeholder="Enter License Plate"
        value={plate}
        onChange={e => setPlate(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Looking up..." : "Lookup"}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <div><b>Make:</b> {result.make}</div>
          <div><b>Model:</b> {result.model}</div>
          <div><b>Year:</b> {result.year}</div>
        </div>
      )}
    </form>
  );
}
