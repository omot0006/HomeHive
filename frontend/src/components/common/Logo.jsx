import homeHiveIcon from "../../assets/logos/homehive-icon.png";

const sizes = {
  small: { icon: "h-8", text: "text-base" },
  default: { icon: "h-9", text: "text-lg" },
  large: { icon: "h-12", text: "text-2xl" },
};

function Logo({
  size = "default",
  iconOnly = false,
  iconTone = "brand",
  className = "",
  textClassName = "",
}) {
  const selectedSize = sizes[size] ?? sizes.default;
  const iconClassName = `${selectedSize.icon} aspect-[988/711] shrink-0 object-contain`;

  return (
    <span className={`inline-flex shrink-0 items-center gap-3 ${className}`.trim()}>
      {iconTone === "navy" ? (
        <span
          aria-hidden={!iconOnly}
          aria-label={iconOnly ? "HomeHive" : undefined}
          role={iconOnly ? "img" : undefined}
          className={`${iconClassName} bg-[#07143d]`}
          style={{
            WebkitMaskImage: `url(${homeHiveIcon})`,
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskImage: `url(${homeHiveIcon})`,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
        />
      ) : (
        <img src={homeHiveIcon} alt={iconOnly ? "HomeHive" : ""} className={iconClassName} />
      )}
      {!iconOnly && (
        <span className={`${selectedSize.text} font-bold leading-none tracking-tight ${textClassName}`.trim()}>
          HomeHive
        </span>
      )}
    </span>
  );
}

export default Logo;
