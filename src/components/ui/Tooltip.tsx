import * as React from "react";
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export function Tooltip(props: any) {
  return <span {...props}>Tooltip</span>;
}
export function TooltipTrigger(props: any) {
  return <button {...props}>Trigger</button>;
}
export function TooltipContent(props: any) {
  return <div {...props}>Content</div>;
}
