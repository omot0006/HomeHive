import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const Select = forwardRef(function Select(
  { label, hint, error, className, id, children, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const descriptionId = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined;

  return (
    <div className="w-full">
      {label && <label htmlFor={selectId} className="mb-2 block text-sm font-semibold text-hive-ink">{label}</label>}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={cn(
          "min-h-12 w-full rounded-hive-md border bg-hive-surface px-4 text-hive-ink outline-none transition focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]",
          error ? "border-hive-danger" : "border-hive-border",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {(hint || error) && <p id={descriptionId} className={cn("mt-2 text-sm", error ? "text-hive-danger" : "text-hive-muted")}>{error || hint}</p>}
    </div>
  );
});

export default Select;
