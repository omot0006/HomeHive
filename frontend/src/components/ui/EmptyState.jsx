import { Inbox } from "lucide-react";
import Button from "./Button";

function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-hive-xl border border-dashed border-hive-border bg-hive-surface px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-hive-md bg-hive-rose-soft text-hive-terracotta">
        <Icon size={22} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-hive-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-hive-muted">{description}</p>
      {actionLabel && onAction && <Button className="mt-5" size="sm" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export default EmptyState;
