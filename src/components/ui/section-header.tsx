import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export const SectionHeader = ({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-widest text-[#c4956a]">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3a3530] font-['Libre_Baskerville',serif] leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-[#7a7470] leading-relaxed max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
