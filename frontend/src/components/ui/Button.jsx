import { LoaderCircle } from "lucide-react";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-hive-terracotta text-white shadow-[0_10px_22px_rgb(221_117_65_/_0.22)] hover:bg-hive-terracotta-strong",
  secondary: "bg-hive-honey text-hive-ink hover:bg-[#e8a52d]",
  outline:
    "border border-hive-border bg-hive-surface text-hive-ink hover:border-hive-terracotta hover:bg-hive-rose-soft",
  ghost: "text-hive-ink hover:bg-hive-rose-soft",
  dark: "bg-hive-ink-soft text-white hover:bg-[#1f2721]",
};

const sizes = {
  sm: "min-h-11 px-3.5 text-sm",
  md: "min-h-11 px-4.5 text-sm",
  lg: "min-h-13 px-6 text-base",
};

function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-hive-md font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)] disabled:pointer-events-none disabled:opacity-55",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default Button;
