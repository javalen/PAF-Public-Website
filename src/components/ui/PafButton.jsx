import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";

// Primary button component with consistent styling, responsive sizing, and icon support
// Supports visual variants (primary, secondary, danger, textlink) and four size options (xs, small, medium, large)
// Automatically adjusts layout for icon-only buttons and handles responsive size classes
export function PafButton({
  children,
  variant = "primary", // Visual style: 'primary' | 'secondary' | 'danger' | 'textlink'
  size = "medium", // Button size: 'xs' | 'small' | 'medium' | 'large' (supports responsive: "large sm:medium")
  disabled = false,
  iconLeft = null, // Icon to display on left side of text
  iconRight = null, // Icon to display on right side of text
  iconOnly = false, // Force icon-only mode (no text padding)
  className = "", // Additional CSS classes
  ...props // Spread remaining props to button element
}) {
  // Base styles applied to all buttons - Mulish font, rounded corners, transitions
  const base =
    // "font-['Mulish',sans-serif] inline-flex items-center justify-center gap-1 overflow-hidden rounded-[30px] font-bold tracking-normal leading-normal transition-colors duration-200";

    "font-['Funnel_Display',sans-serif] inline-flex items-center justify-center gap-1 overflow-hidden rounded-[10px] font-normal tracking-wide leading-normal transition-colors duration-200";
  
  // Variant styles - defines colors and hover states for each button type
  const variants = {
    // primary: "bg-brandPrimary text-white hover:bg-brandSecondary",
    emphasis: "bg-colorHilight text-brandPrimary hover:bg-brandTertiary hover:text-colorHilight",
    primary: "bg-brandPrimary text-white hover:bg-brandSecondary hover:dark:bg-colorHilight hover:dark:text-brandPrimary",
    // primary: "bg-brandPrimary border border-brandPrimary text-white hover:bg-colorHilight hover:text-brandPrimary",
    secondary: "bg-backgroundSecondary dark:bg-backgroundSecondary-dark text-textPrimary dark:text-textPrimary-dark border border-borderSecondary dark:border-borderSecondary-dark hover:border-black dark:hover:border-white",
    danger: "bg-backgroundTagFalse text-textTagFalse border border-borderTagFalse hover:border-textTagFalse",
    textlink: "bg-transparent border-0 rounded-none text-brandPrimary dark:text-brandPrimary-dark hover:underline font-['Roboto',sans-serif] tracking-normal leading-normal",
    underlined: "bg-transparent border-0 rounded-none text-brandPrimary dark:text-brandPrimary-dark underline hover:text-brandSecondary dark:hover:text-brandSecondary-dark font-['Roboto',sans-serif] tracking-normal leading-normal",
  };
  
  // Determine appropriate icon size based on button size
  // Extracts base size from responsive string (e.g., "large sm:medium" -> "large")
  const getIconSize = (sizeInput) => {
    const baseSize = typeof sizeInput === 'string' && sizeInput.includes(':') 
      ? sizeInput.split(' ')[0] 
      : sizeInput;
    
    const iconSizes = {
      xs: "w-3 h-3",      // 12px
      small: "w-4 h-4",   // 16px
      medium: "w-4 h-4",  // 16px
      large: "w-5 h-5",   // 20px
    };
    return iconSizes[baseSize] || iconSizes.medium;
  };

  const iconSizeClass = getIconSize(size);
  
  // Detect icon-only mode - either explicitly set or no children with icons present
  const isIconOnly = iconOnly || (!children && (iconLeft || iconRight));

  // Textlink variant is text-only and should not receive button-like padding.
  const getTextLinkSizeClasses = (sizeInput) => {
    const textSizes = {
      xs: "text-xs p-0",
      small: "text-sm p-0",
      medium: "text-base p-0",
      large: "text-lg p-0",
    };

    if (typeof sizeInput === "string" && !sizeInput.includes(":")) {
      return textSizes[sizeInput] || textSizes.medium;
    }

    if (typeof sizeInput === "string" && sizeInput.includes(":")) {
      const responsiveTextSizes = {
        "sm:xs": "sm:text-xs sm:p-0",
        "sm:small": "sm:text-sm sm:p-0",
        "sm:medium": "sm:text-base sm:p-0",
        "sm:large": "sm:text-lg sm:p-0",
        "md:xs": "md:text-xs md:p-0",
        "md:small": "md:text-sm md:p-0",
        "md:medium": "md:text-base md:p-0",
        "md:large": "md:text-lg md:p-0",
        "lg:xs": "lg:text-xs lg:p-0",
        "lg:small": "lg:text-sm lg:p-0",
        "lg:medium": "lg:text-base lg:p-0",
        "lg:large": "lg:text-lg lg:p-0",
      };

      return sizeInput
        .split(" ")
        .map((sizePart) => {
          if (sizePart.includes(":")) return responsiveTextSizes[sizePart] || "";
          return textSizes[sizePart] || textSizes.medium;
        })
        .join(" ");
    }

    return textSizes.medium;
  };
  
  // Generate size classes including responsive variants
  // Handles both simple sizes ("medium") and responsive sizes ("large sm:medium")
  const getSizeClasses = (sizeInput) => {
    // Simple size without responsive variants
    if (typeof sizeInput === 'string' && !sizeInput.includes(':')) {
      const sizes = {
        xs: isIconOnly ? "text-xs py-1 px-2" : "text-xs py-1 px-3",
        small: isIconOnly ? "text-sm py-1.5 px-3" : "text-sm py-1.5 px-3",
        medium: isIconOnly ? "text-base py-2 px-4" : "text-base py-2 px-4", 
        large: isIconOnly ? "text-lg py-2.5 px-5" : "text-lg py-3 px-6",
      };
      return sizes[sizeInput] || sizes.medium;
    }
    
    // Responsive size string (e.g., "large sm:medium")
    if (typeof sizeInput === 'string' && sizeInput.includes(':')) {
      const responsiveSizes = {
        xs: isIconOnly ? "text-xs py-1 px-2" : "text-xs py-1 px-3",
        small: isIconOnly ? "text-sm py-1.5 px-3" : "text-sm py-1.5 px-3",
        medium: isIconOnly ? "text-base py-2 px-4" : "text-base py-2 px-4",
        large: isIconOnly ? "text-lg py-2.5 px-5" : "text-lg py-3 px-6",
        "sm:xs": isIconOnly ? "sm:text-xs sm:py-1 sm:px-2" : "sm:text-xs sm:py-1 sm:px-3",
        "sm:small": isIconOnly ? "sm:text-sm sm:py-1.5 sm:px-3" : "sm:text-sm sm:py-1.5 sm:px-3",
        "sm:medium": isIconOnly ? "sm:text-base sm:py-2 sm:px-4" : "sm:text-base sm:py-2 sm:px-4",
        "sm:large": isIconOnly ? "sm:text-lg sm:py-2.5 sm:px-5" : "sm:text-lg sm:py-3 sm:px-6",
        "md:xs": isIconOnly ? "md:text-xs md:py-1 md:px-2" : "md:text-xs md:py-1 md:px-3",
        "md:small": isIconOnly ? "md:text-sm md:py-1.5 md:px-3" : "md:text-sm md:py-1.5 md:px-3",
        "md:medium": isIconOnly ? "md:text-base md:py-2 md:px-4" : "md:text-base md:py-2 md:px-4",
        "md:large": isIconOnly ? "md:text-lg md:py-2.5 md:px-5" : "md:text-lg md:py-3 md:px-6",
        "lg:xs": isIconOnly ? "lg:text-xs lg:py-1 lg:px-2" : "lg:text-xs lg:py-1 lg:px-3",
        "lg:small": isIconOnly ? "lg:text-sm lg:py-1.5 lg:px-3" : "lg:text-sm lg:py-1.5 lg:px-3",
        "lg:medium": isIconOnly ? "lg:text-base lg:py-2 lg:px-4" : "lg:text-base lg:py-2 lg:px-4",
        "lg:large": isIconOnly ? "lg:text-lg lg:py-2.5 lg:px-5" : "lg:text-lg lg:py-3 lg:px-6",
      };
      
      // Parse responsive string and combine all size classes
      return sizeInput.split(' ').map(sizePart => {
        if (sizePart.includes(':')) {
          return responsiveSizes[sizePart] || '';
        } else {
          const sizes = {
            xs: isIconOnly ? "text-xs py-1 px-2" : "text-xs py-1 px-3",
            small: isIconOnly ? "text-sm py-1.5 px-3" : "text-sm py-2 px-4",
            medium: isIconOnly ? "text-base py-2 px-4" : "text-base py-2 px-4",
            large: isIconOnly ? "text-lg py-2.5 px-5" : "text-lg py-3 px-6",
          };
          return sizes[sizePart] || sizes.medium;
        }
      }).join(' ');
    }
    
    // Fallback to medium size
    return isIconOnly ? "text-base py-2 px-4" : "text-base py-2 px-4";
  };

  // Clone icon elements and apply proper sizing classes
  // Ensures icons are consistently sized regardless of their source
  const renderIcon = (icon) => {
    if (!icon) return null;
    
    // Clone React element and merge size classes with existing classes
    if (typeof icon === 'object' && icon.type) {
      return React.cloneElement(icon, {
        className: clsx(iconSizeClass, icon.props.className),
      });
    }
    
    return icon;
  };

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        ["textlink", "underlined"].includes(variant) ? getTextLinkSizeClasses(size) : getSizeClasses(size),
        isIconOnly && "gap-0", // Remove gap for icon-only buttons
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled}
      {...props}
    >
      {iconLeft && renderIcon(iconLeft)}
      {children && (
        <span className="px-1 flex justify-center items-center">{children}</span>
      )}
      {iconRight && renderIcon(iconRight)}
    </button>
  );
}

PafButton.displayName = "PafButton";

PafButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["emphasis", "primary", "secondary", "danger", "textlink", "underlined"]),
  size: PropTypes.string,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  iconOnly: PropTypes.bool,
  className: PropTypes.string,
};

export default PafButton;
