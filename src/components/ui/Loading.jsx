export default function Loading({
  size = "md",
  text,
  className = "",
}) {
  const sizes = {
    sm: "size-4 border-2",
    md: "size-6 border-2",
    lg: "size-8 border-[3px]",
  };

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        gap-3
        text-text-secondary
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      <span
        className={`
          animate-spin
          rounded-full
          border-border
          border-t-primary
          ${sizes[size]}
        `}
      />

      {text && (
        <span className="text-sm">
          {text}
        </span>
      )}

      <span className="sr-only">
        در حال بارگذاری
      </span>
    </div>
  );
}