import React, { useState } from "react";

export default function ManualEntryForm() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire to Supabase
    setResult({ make, model, year });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="border rounded p-2 w-full mb-2" placeholder="Make" value={make} onChange={e => setMake(e.target.value)} />
      <input className="border rounded p-2 w-full mb-2" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
      <input className="border rounded p-2 w-full mb-2" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
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
