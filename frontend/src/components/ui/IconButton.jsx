import { cn } from "../../utils/cn";

function IconButton({ label, children, className, variant = "surface", ...props }) {
  const variants = {
    surface: "border border-hive-border bg-hive-surface text-hive-muted hover:border-hive-terracotta hover:text-hive-terracotta",
    ghost: "text-hive-muted hover:bg-hive-rose-soft hover:text-hive-terracotta",
  };

  return <button type="button" aria-label={label} className={cn("inline-flex h-11 w-11 items-center justify-center rounded-hive-md transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)] disabled:pointer-events-none disabled:opacity-55", variants[variant], className)} {...props}>{children}</button>;
}

export default IconButton;
