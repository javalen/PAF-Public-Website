import PropTypes from 'prop-types';

/**
 * TextHighlight component for drawing attention to text spans like a highlighter
 * @param {string} children - The text content to highlight
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Color variant for the highlight ('default', 'success', 'warning', 'error')
 * @param {React.ElementType} as - HTML element to render as (default: 'span')
 */
const TextHighlight = ({ 
  children, 
  className = "",
  variant = "default",
  as: Component = "span",
  ...props 
}) => {
  // Define highlight color variants
  const variants = {
    default: "bg-colorHilight dark:bg-colorHilight-dark/0",
   // default: "bg-colorHilight",
    success: "bg-green-100 border-green-400 dark:bg-green-900/30 dark:border-green-500",
    warning: "bg-yellow-100 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-500", 
    error: "bg-red-100 border-red-400 dark:bg-red-900/30 dark:border-red-500",
  };

  const highlightClasses = variants[variant] || variants.default;

  return (
    <Component
      className={`${highlightClasses} text-inherit p-1 pt-0.5 pb-0.5 rounded-sm ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

TextHighlight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
  as: PropTypes.elementType,
};

export default TextHighlight;