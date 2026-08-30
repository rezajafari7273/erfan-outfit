const variants = {
  info: {
    container: "border-blue-200 bg-blue-50",
    title: "text-blue-900",
    text: "text-blue-700",
  },

  success: {
    container: "border-success/30 bg-success/10",
    title: "text-success",
    text: "text-text-secondary",
  },

  warning: {
    container: "border-amber-200 bg-amber-50",
    title: "text-amber-900",
    text: "text-amber-700",
  },

  error: {
    container: "border-error/30 bg-error/10",
    title: "text-error",
    text: "text-text-secondary",
  },
};

export default function Alert({
  variant = "info",
  title,
  children,
  icon,
  className = "",
}) {
  const styles = variants[variant];

  return (
    <div
      role="alert"
      className={`
        flex
        gap-3
        rounded-xl
        border
        p-4
        ${styles.container}
        ${className}
      `}
    >
      {icon && (
        <div className="mt-0.5 shrink-0">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        {title && (
          <h3 className={`text-sm font-semibold ${styles.title}`}>
            {title}
          </h3>
        )}

        {children && (
          <div
            className={`
              text-sm
              leading-6
              ${title ? "mt-1" : ""}
              ${styles.text}
            `}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}