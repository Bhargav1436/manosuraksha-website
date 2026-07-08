/**
 * Decorative divider between homepage sections.
 * Renders a subtle warm gradient line with a center dot ornament.
 */
export const SectionDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "0 24px",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(196,149,106,0.3))",
          borderRadius: 1,
        }}
      />
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #c4956a, #dbb894)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(196,149,106,0.3), transparent)",
          borderRadius: 1,
        }}
      />
    </div>
  );
};
