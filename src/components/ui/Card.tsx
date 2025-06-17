import React from "react";
export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 24 }}>{children}</div>;
}
export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
export function CardHeader({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} style={{ fontWeight: 600, marginBottom: 8 }}>{children}</div>;
}
export function CardTitle({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} style={{ fontSize: 18 }}>{children}</div>;
}
export function CardDescription({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} style={{ color: "#666", fontSize: 14 }}>{children}</div>;
}
export function CardFooter({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} style={{ borderTop: "1px solid #eee", marginTop: 16, paddingTop: 8 }}>{children}</div>;
}
