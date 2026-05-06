import React from "react";

const StatusTag = ({ 
  status, 
  variant = "default",
  size = "sm",
  showIndicator = true,
  customStyles = {},
  ...props 
}) => {
  // Predefined status configurations
  const statusConfigs = {
    // Boolean-based statuses
    hidden: {
      true: { text: "Hidden in Mobile App", colors: "bg-backgroundTagFalse text-textTagFalse border border-colorTagFalse" },
      false: { text: "Visible in Mobile App", colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue" }
    },
    active: {
      true: { text: "Active", colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue" },
      false: { text: "Inactive", colors: "bg-gray-100 text-gray-800" }
    },
    online: {
      true: { text: "Online", colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue" },
      false: { text: "Offline", colors: "bg-backgroundTagFalse text-textTagFalse border border-borderTagFalse" }
    },
    // String-based statuses
    priority: {
      high: { text: "High", colors: "bg-backgroundTagFalse text-textTagFalse border border-borderTagFalse" },
      medium: { text: "Medium", colors: "bg-backgroundTagWarning text-textTagWarning border border-colorSun" },
      low: { text: "Low", colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue" },
      fair: { text: "Fair", colors: "bg-backgroundTagWarning text-textTagWarning border border-colorSun" }
    },
    status: {
      pending: { text: "Pending", colors: "bg-backgroundTagWarning text-textTagWarning border border-colorSun" },
      approved: { text: "Approved", colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue" },
      rejected: { text: "Rejected", colors: "bg-backgroundTagFalse text-textTagFalse border border-borderTagFalse" },
      draft: { text: "Draft", colors: "bg-gray-100 text-gray-800" },
      fair: { text: "Fair", colors: "bg-backgroundTagWarning text-textTagWarning border border-colorSun" },
      new: { text: "New", colors: "bg-backgroundTagBlue text-brandPrimary border border-brandSecondary" }
    },
    role: {
      system: { text: "System", colors: "bg-backgroundTagBlue text-brandPrimary border border-brandSecondary" },
      client: { text: "Client", colors: "bg-backgroundSecondary text-brandPrimary border border-brandPrimary" },
      guest: { text: "Guest", colors: "bg-gray-100 text-gray-800" }
    }
  
  };

  // Size configurations
  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-sm"
  };

  // Get configuration based on variant and status
  let config;

  if (variant === "error" || variant === "negative") {
    config = {
      text: status || "Error",
      colors: "bg-backgroundTagFalse text-textTagFalse border border-borderTagFalse"
    };
  } else if (variant === "success" || variant === "positive") {
    config = {
      text: status || "Success",
      colors: "bg-backgroundTagTrue text-textTagTrue border border-borderTagTrue"
    };
  } else if (variant === "warning") {
    config = {
      text: status || "Warning",
      colors: "bg-backgroundTagWarning text-textTagWarning border border-colorSun"
    };
  } else if (variant === "normal") {
    config = {
      text: status || "Normal",
      colors: "bg-backgroundTagBlue text-brandPrimary border border-brandSecondary" 
    };
  } else if (variant === "neutral") {
    config = {
      text: status || "Neutral",
      colors: "bg-backgroundPrimary dark:bg-backgroundPrimary-dark text-textPrimary dark:text-textPrimary-dark border border-borderSecondary dark:border-borderSecondary-dark"
    };
  } else if (variant === "role") {
    config = statusConfigs.role?.[String(status)?.toLowerCase()];
  } else {
    config = statusConfigs[variant]?.[String(status)];
  }

  // Fallback for custom status or unknown variant
  const fallbackConfig = {
    text: typeof status === 'string' ? status.charAt(0).toUpperCase() + status.slice(1) : String(status),
    colors: "bg-backgrounPrimary dark:bg-backgroundPrimary-dark text-textPrimary dark:text-textPrimary-dark border border-borderSecondary dark:border-borderSecondary-dark"
  };

  const finalConfig = config || fallbackConfig;
  const sizeClass = sizeClasses[size] || sizeClasses.sm;

  // Circle color mapping based on the badge colors
  const getCircleColor = (colors) => {
    if (colors.includes('text-textTagTrue')) {
      return 'bg-colorSuccess';
    } else if (colors.includes('text-textTagFalse')) {
      return 'bg-colorError';
    } else if (colors.includes('text-textTagWarning')) {
      return 'bg-colorSun';
    } else if (colors.includes('text-purple-800')) {
      return 'bg-purple-600';
    } else if (colors.includes('text-blue-800')) {
      return 'bg-blue-600';
    } else {
      return 'bg-gray-600';
    }
  };

  // Box shadow for pulse effect
  const getPulseStyle = (colors) => {
    if (colors.includes('text-textTagTrue')) {
      return { boxShadow: '0 0 0 5px rgba(17, 174, 116, 0.2)' };
    } else if (colors.includes('text-textTagFalse')) {
      return { boxShadow: '0 0 0 5px rgba(245, 34, 45, 0.2)' };
    } else if (colors.includes('text-textTagWarning')) {
      return { boxShadow: '0 0 0 5px rgba(250, 173, 20, 0.3)' }; // colorSun with opacity
    } else if (colors.includes('text-purple-800')) {
      return { boxShadow: '0 0 0 5px rgba(147, 51, 234, 0.3)' };
    } else if (colors.includes('text-blue-800')) {
      return { boxShadow: '0 0 0 5px rgba(37, 99, 235, 0.3)' };
    } else {
      return { boxShadow: '0 0 0 5px rgba(75, 85, 99, 0.3)' };
    }
  };

  // Special circle classes for warning/amber variant
  const getCircleClasses = (colors) => {
    if (colors.includes('text-textTagWarning')) {
      return 'w-1.5 h-1.5 bg-colorSun rounded-full';
    }
    return `w-1.5 h-1.5 rounded-full ${getCircleColor(colors)}`;
  };

  const circleClasses = getCircleClasses(finalConfig.colors);
  const pulseStyle = getPulseStyle(finalConfig.colors);

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded font-medium ${sizeClass} ${finalConfig.colors} ${customStyles.className || ''}`}
      style={customStyles.style}
      {...props}
    >
      {showIndicator && (
        <span 
          className={circleClasses}
          style={pulseStyle}
        ></span>
      )}
      {props.children ? props.children : finalConfig.text}
    </div>
  );
};

export default StatusTag;
