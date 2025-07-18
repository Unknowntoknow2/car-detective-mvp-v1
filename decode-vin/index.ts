import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Fallback vehicle data generator
const generateFallbackData = (vin: string) => {
  const currentYear = new Date().getFullYear();
  const yearDigit = vin.charAt(9);
  const year = yearDigit >= 'A' ? 2010 + (yearDigit.charCodeAt(0) - 65) : 2000 + parseInt(yearDigit);
  
  // Basic make detection from VIN
  const wmi = vin.substring(0, 3);
  let make = "Unknown";
  let model = "Unknown";
  
  if (wmi.startsWith("1G") || wmi.startsWith("1GC")) {
    make = "Chevrolet";
    model = vin.includes("SUB") || vin.charAt(7) === 'K' ? "Suburban" : "Silverado";
  } else if (wmi.startsWith("1F")) {
    make = "Ford";
    model = "F-150";
  } else if (wmi.startsWith("JT")) {
    make = "Toyota";
    model = "Camry";
  } else if (wmi.startsWith("1H") || wmi.startsWith("19")) {
    make = "Honda";
    model = "Accord";
  }
  
  return {
    vin,
    make,
    model,
    year: Math.min(Math.max(year, 1980), currentYear + 1),
    trim: "Standard",
    engine: "V8",
    transmission: "Automatic",
    drivetrain: "RWD",
    bodyType: "SUV",
    fueltype: "Gasoline",
    doors: "4",
    seats: "8",
    enginecylinders: "8",
    displacementl: "5.3",
    timestamp: new Date().toISOString(),
    is_fallback: true,
    fallback_reason: "NHTSA API temporarily unavailable"
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vin } = await req.json();

    if (!vin || vin.length !== 17) {
      return new Response(JSON.stringify({ error: "Invalid VIN" }), {
        headers: corsHeaders,
        status: 400,
      });
    }

    console.log("Decoding VIN:", vin);

    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
    const data = await response.json();
    const results = data.Results;

    // Log all results for debugging
    console.log("Raw API results:", JSON.stringify(results.slice(0, 10), null, 2));

    // Enhanced extract function with consistent "Unknown" fallback
    const extract = (label: string) => {
      const result = results.find((r) => r.Variable === label);
      const value = result?.Value;
      
      console.log(`Extracting ${label}: found '${value}'`);
      
      // Return "Unknown" for null, empty string, "null", "N/A", or "Not Applicable"
      if (!value || 
          value.trim() === "" || 
          value === "null" || 
          value === "N/A" || 
          value === "Not Applicable" || 
          value === "Not Available") {
        return "Unknown";
      }
      return value;
    };

      const extractNumber = (label: string) => {
        const value = results.find((r) => r.Variable === label)?.Value;
        const parsed = value ? parseInt(value) : null;
        return !isNaN(parsed) ? parsed : null;
      };

    // Try multiple keys for transmission with consistent "Unknown" fallback
    const getTransmission = () => {
      const transmissionFields = [
        "Transmission Style", 
        "Transmission",
        "Transmission Type"
      ];
      
      for (const field of transmissionFields) {
        const value = extract(field);
        if (value !== "Unknown") {
          console.log(`Found transmission in field: ${field} with value: ${value}`);
          return value;
        }
      }
      
      return "Unknown";
    };

    // Try multiple keys for trim with consistent "Unknown" fallback
    const getTrim = () => {
      const trimFields = [
        "Trim", 
        "Trim2",
        "Series"
      ];
      
      for (const field of trimFields) {
        const value = extract(field);
        if (value !== "Unknown") {
          console.log(`Found trim in field: ${field} with value: ${value}`);
          return value;
        }
      }
      
      return "Unknown";
    };

    const vehicleInfo = {
      vin,
      make: extract("Make"),
      model: extract("Model"),
      year: extractNumber("Model Year"),
      trim: getTrim(),
      engine: extract("Engine Model"),
      transmission: getTransmission(),
      drivetrain: extract("Drive Type"),
      bodyType: extract("Body Class"),
      timestamp: new Date().toISOString(),
    };

    console.log("Processed vehicle info with standardized fallbacks:", vehicleInfo);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!, 
      Deno.env.get("SUPABASE_ANON_KEY")!
    );

    const { error: insertError } = await supabase
      .from("decoded_vehicles")
      .upsert([vehicleInfo], { onConflict: "vin" });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      // Still return the data even if we can't save it
    }

    // Add metadata about the response
    const responseData = {
      ...vehicleInfo,
      api_status: isFromFallback ? 'fallback' : 'success',
      message: isFromFallback ? 'Using demo data - NHTSA API temporarily unavailable' : null
    };

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: "Internal error", details: err.message }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});
