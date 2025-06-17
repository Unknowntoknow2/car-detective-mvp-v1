import React from "react";
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#333", color: "#fff", cursor: "pointer" }}>{children}</button>;
}
