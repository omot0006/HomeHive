import { cn } from "../../utils/cn";

function LoadingState({ label = "Loading…", className }) {
  return (
    <div className={cn("flex min-h-40 flex-col items-center justify-center gap-3 text-sm font-medium text-hive-muted", className)} role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-hive-rose-soft border-t-hive-terracotta" />
      <span>{label}</span>
    </div>
  );
}

export default LoadingState;
