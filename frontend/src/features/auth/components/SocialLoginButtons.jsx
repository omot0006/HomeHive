import { Button } from "../../../components/ui";

function SocialLoginButtons({ onUnavailable }) {
  return (
    <>
      <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-hive-border" /><span className="text-xs font-semibold uppercase tracking-[0.12em] text-hive-muted">or continue with</span><span className="h-px flex-1 bg-hive-border" /></div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => onUnavailable("Google sign-in will be available when authentication is connected.")}><span className="font-bold text-hive-terracotta">G</span> Google</Button>
        <Button variant="outline" onClick={() => onUnavailable("GitHub sign-in will be available when authentication is connected.")}><span className="font-bold text-hive-ink">GH</span> GitHub</Button>
      </div>
    </>
  );
}

export default SocialLoginButtons;
