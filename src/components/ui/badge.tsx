import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "border-transparent bg-slate-900 text-white hover:bg-slate-900/80",
      secondary: "border-transparent bg-slate-200 text-slate-900 hover:bg-slate-300",
      outline: "border-slate-300 text-slate-900",
    };

    return (
      <div ref={ref} className={cn("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2", variants[variant], className)} {...props} />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
