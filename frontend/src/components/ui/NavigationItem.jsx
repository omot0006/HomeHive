import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

function NavigationItem({ to, icon, children, onClick, className }) {
  const content = <>{icon}<span>{children}</span></>;
  const classes = (isActive) => cn(
    "flex items-center gap-3 rounded-hive-md px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--hh-focus-ring)]",
    isActive ? "bg-hive-honey text-hive-ink" : "text-white/65 hover:bg-white/10 hover:text-white",
    className,
  );

  if (to) return <NavLink to={to} onClick={onClick} className={({ isActive }) => classes(isActive)}>{content}</NavLink>;
  return <button type="button" onClick={onClick} className={cn(classes(false), "w-full text-left")}>{content}</button>;
}

export default NavigationItem;
