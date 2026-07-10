import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input(
  { label, hint, error, className, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-hive-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={cn(
          "min-h-12 w-full rounded-hive-md border bg-hive-surface px-4 text-hive-ink outline-none transition placeholder:text-hive-muted/70 focus:border-hive-terracotta focus:ring-4 focus:ring-[var(--hh-focus-ring)]",
          error ? "border-red-400" : "border-hive-border",
          className,
        )}
        {...props}
      />
      {(hint || error) && (
        <p id={descriptionId} className={cn("mt-2 text-sm", error ? "text-red-600" : "text-hive-muted")}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

export default Input;
