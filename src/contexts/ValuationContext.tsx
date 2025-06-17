import { createContext, useContext } from "react";
export const ValuationContext = createContext({});
export function useValuation() { return useContext(ValuationContext); }
