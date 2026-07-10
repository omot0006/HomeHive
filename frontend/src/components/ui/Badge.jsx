import { cn } from "../../utils/cn";

const variants = {
  neutral: "bg-hive-rose-soft text-hive-ink",
  success: "bg-hive-sage-soft text-hive-sage",
  warning: "bg-hive-warning-soft text-hive-warning",
  accent: "bg-hive-rose-soft text-hive-terracotta-strong",
  dark: "bg-hive-ink-soft text-white",
};

function Badge({ children, variant = "neutral", className }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", variants[variant], className)}>{children}</span>;
}

export default Badge;
