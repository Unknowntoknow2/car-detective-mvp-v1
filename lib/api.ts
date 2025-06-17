// lib/api.ts

export async function decodeVIN(vin: string) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch vehicle data from NHTSA.");
  }
  const data = await response.json();
  return data;
}
