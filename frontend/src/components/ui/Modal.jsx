import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

function Modal({ isOpen, onClose, title, description, children, className }) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-hive-ink/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn("max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-hive-xl border border-white/60 bg-hive-surface p-6 shadow-hive-float sm:p-8", className)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-2xl font-bold tracking-tight text-hive-ink">{title}</h2>
            {description && <p id={descriptionId} className="mt-2 text-hive-muted">{description}</p>}
          </div>
          <button ref={closeButtonRef} type="button" aria-label="Close dialog" onClick={onClose} className="rounded-hive-sm p-2 text-hive-muted transition hover:bg-hive-rose-soft hover:text-hive-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)]">
            <X size={20} />
          </button>
        </div>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
