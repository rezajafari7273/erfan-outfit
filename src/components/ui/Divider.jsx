import React from "react";

export default function Divider({
  orientation = "horizontal",
  variant = "solid",
  color = "default",
  labelPosition = "center",
  children,
  className = "",
}) {
  const colorMap = {
    default: "border-gray-200 from-transparent via-gray-200 to-transparent",
    gray: "border-gray-300 from-transparent via-gray-300 to-transparent",
    primary: "border-primary from-transparent via-primary to-transparent",
    cyan: "border-cyan-500 from-transparent via-cyan-500 to-transparent",
    rose: "border-rose-500 from-transparent via-rose-500 to-transparent",
    amber: "border-amber-500 from-transparent via-amber-500 to-transparent",
    purple: "border-purple-500 from-transparent via-purple-500 to-transparent",
  };

  const borderStyleMap = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
    gradient: "gradient",
  };

  const currentColor = colorMap[color] || colorMap.default;
  const currentBorderStyle = borderStyleMap[variant] || borderStyleMap.solid;

  // ۱. حالت عمودی
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block h-auto self-stretch border-r ${currentBorderStyle} ${currentColor.split(" ")[0]} ${className}`}
      />
    );
  }

  // ۲. حالت افقی بدون children
  if (!children) {
    if (variant === "gradient") {
      return (
        <div
          role="separator"
          className={`w-full h-[1px] bg-gradient-to-r ${currentColor} my-4 ${className}`}
        />
      );
    }
    return (
      <hr
        className={`w-full border-t ${currentBorderStyle} ${currentColor.split(" ")[0]} my-4 ${className}`}
      />
    );
  }

  // ۳. حالت افقی همراه با children (دکمه یا متن)
  return (
    <div
      role="separator"
      className={`flex items-center w-full my-4 ${className}`}
    >
      {/* خط سمت راست: از primary به شفاف */}
      {variant === "gradient" ? (
        <div
          className={`flex-grow h-[1px] bg-gradient-to-r from-primary to-transparent ${
            labelPosition === "start" ? "max-w-[10%]" : ""
          }`}
        />
      ) : (
        <div
          className={`flex-grow border-t ${currentBorderStyle} ${currentColor.split(" ")[0]} ${
            labelPosition === "start" ? "max-w-[10%]" : ""
          }`}
        />
      )}

      {/* محتوای وسط (دکمه) */}
      <div className="px-3 text-xs font-medium shrink-0">
        {children}
      </div>

      {/* خط سمت چپ: از شفاف به primary */}
      {variant === "gradient" ? (
        <div
          className={`flex-grow h-[1px] bg-gradient-to-r from-transparent to-primary ${
            labelPosition === "end" ? "max-w-[10%]" : ""
          }`}
        />
      ) : (
        <div
          className={`flex-grow border-t ${currentBorderStyle} ${currentColor.split(" ")[0]} ${
            labelPosition === "end" ? "max-w-[10%]" : ""
          }`}
        />
      )}
    </div>
  );
}