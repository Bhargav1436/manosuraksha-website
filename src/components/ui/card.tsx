import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
