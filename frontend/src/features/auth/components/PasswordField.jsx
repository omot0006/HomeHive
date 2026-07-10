import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "../../../components/ui";

function PasswordField({ label = "Password", error, ...props }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input label={label} error={error} type={isVisible ? "text" : "password"} className="pr-12" {...props} />
      <button type="button" onClick={() => setIsVisible((visible) => !visible)} aria-label={isVisible ? "Hide password" : "Show password"} className="absolute right-3 top-9 rounded-hive-sm p-1.5 text-hive-muted transition hover:bg-hive-rose-soft hover:text-hive-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)]">
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default PasswordField;
