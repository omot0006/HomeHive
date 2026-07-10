import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";

const steps = ["Welcome", "Your Hive", "Invite", "Personalize"];

function OnboardingProgress({ currentStep }) {
  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Onboarding progress">
      {steps.map((label, index) => {
        const step = index + 1;
        const complete = step < currentStep;
        const active = step === currentStep;
        return <li key={label} className="min-w-0"><div className="flex items-center gap-2"><span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold", complete ? "bg-hive-sage text-white" : active ? "bg-hive-terracotta text-white" : "bg-hive-rose-soft text-hive-muted")}>{complete ? <Check size={14} /> : step}</span><span className={cn("hidden truncate text-xs font-semibold sm:block", active ? "text-hive-ink" : "text-hive-muted")}>{label}</span></div><div className={cn("mt-2 h-1 rounded-full", step <= currentStep ? "bg-hive-terracotta" : "bg-hive-border")} /></li>;
      })}
    </ol>
  );
}

export default OnboardingProgress;
