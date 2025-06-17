export interface Car { vin: string; make: string; model: string; year: number; }
export interface Photo { url: string; label?: string; }
export interface Valuation { price: number; confidence: number; source: string; }
export interface AICondition { category: string; value: string; confidence: number; }