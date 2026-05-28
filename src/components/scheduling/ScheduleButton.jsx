import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

// Reusable CTA button for launching the scheduling modal from any page section.
export default function ScheduleButton({
  onClick,
  children = "Schedule a Demo",
  className = "",
  ariaLabel,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || children}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded-xl",
        "bg-brandPrimary px-5 py-3 text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-white",
        "shadow-[0_12px_30px_-12px_rgba(15,23,42,0.55)]",
        "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brandSecondary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary focus-visible:ring-offset-2",
        "dark:focus-visible:ring-brandPrimary-dark dark:focus-visible:ring-offset-backgroundPrimary-dark",
        className,
      ].join(" ")}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

ScheduleButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};
