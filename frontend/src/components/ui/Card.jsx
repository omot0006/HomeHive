import { cn } from "../../utils/cn";

function Card({ children, className, interactive = false, ...props }) {
  return (
    <section
      className={cn(
        "rounded-hive-xl border border-hive-border/70 bg-hive-surface shadow-hive-card",
        interactive &&
          "transition duration-200 hover:-translate-y-1 hover:shadow-hive-float",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export default Card;
