import React from "react";
import PropTypes from "prop-types";

/**
 * PafChip - Chip component for navigation and selection
 * Used for filtering and navigation in various contexts
 * New design: Square with rounded corners, optional left icon, optional badge count
 */
const PafChip = ({ 
  label, 
  isSelected = false, 
  onClick, 
  disabled = false,
  count = null,
  showCount = false,
  icon = null,
  variant = "default"
}) => {
  // Base container classes aligned to Figma chip geometry
  const baseClasses = "h-9 sm:h-10 px-1 py-1 rounded-[8px] border inline-flex items-center gap-0.5 overflow-hidden transition-colors duration-200 cursor-pointer";
  
  // Variant classes for different states - added hover states
  const variantClasses = {
    default: isSelected 
      ? "bg-backgroundSecondary dark:bg-backgroundSecondary-dark border-borderSecondary dark:border-borderSecondary-dark shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" 
      : "bg-backgroundPrimary dark:bg-backgroundPrimary-dark border-borderPrimary dark:border-borderPrimary-dark hover:bg-backgroundHover dark:hover:bg-backgroundHover-dark hover:border-borderSecondary dark:hover:border-borderSecondary-dark",
    primary: isSelected 
      ? "bg-backgroundPrimary dark:bg-backgroundPrimary-dark border-brandPrimary dark:border-brandPrimary-dark shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" 
      : "bg-backgroundPrimary dark:bg-backgroundPrimary-dark border-borderPrimary dark:border-borderPrimary-dark hover:bg-backgroundHover dark:hover:bg-backgroundHover-dark hover:border-brandPrimary dark:hover:border-brandPrimary-dark",
    secondary: isSelected 
      ? "bg-backgroundSecondary dark:bg-backgroundPrimary-dark border-brandSecondary dark:border-brandSecondary-dark shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]" 
      : "bg-backgroundSecondary dark:bg-backgroundSecondary-dark border-borderSecondary dark:border-borderSecondary-dark hover:bg-backgroundHover dark:hover:bg-backgroundHover-dark hover:border-brandSecondary dark:hover:border-brandSecondary-dark",
  };
  
  // Icon container matches Figma selected icon pill styling
  const iconContainerClasses = isSelected
    ? "p-1 bg-backgroundTagBlue dark:bg-backgroundTagBlue-dark rounded-[999px] flex items-center justify-center"
    : "hidden";
  
  // Label text sizing and weight based on Figma specs
  const textClasses = isSelected
    ? "text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
    : "text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-textPrimary dark:hover:text-textPrimary-dark";
  
  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ""}`;
  
  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Icon Container - Always rendered if icon exists to maintain consistent height, but invisible when not selected */}
      {icon && (
        <div className={iconContainerClasses}>
          <div className="relative flex items-center justify-center">
            {React.cloneElement(icon, {
              className: "w-5 h-5 text-brandPrimary dark:text-brandPrimary-dark"
            })}
          </div>
        </div>
      )}
      
      {/* Label and Count Container */}
      <div className="self-stretch flex items-center justify-center pl-1 pr-1.5">
        <span className={textClasses}>
          {label}
        </span>
        
        {/* Count Badge - Only show if showCount is true and count is provided */}
        {showCount && count !== null && (
          <span className="min-w-[20px] h-4 sm:h-5 px-1 sm:px-2 bg-brandPrimary dark:bg-brandPrimary-dark text-white dark:text-white rounded-full text-xs font-medium font-['Roboto'] leading-normal tracking-normal flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </button>
  );
};

PafChip.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  count: PropTypes.number,
  showCount: PropTypes.bool,
  icon: PropTypes.element,
  variant: PropTypes.oneOf(["default", "primary", "secondary"]),
};

export default PafChip;
