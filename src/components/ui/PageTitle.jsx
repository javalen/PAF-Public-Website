import PropTypes from "prop-types";
import InfoTooltip from "./InfoTooltip";

/**
 * PageTitle Component
 * 
 * Simple page title component with Mulish font for all dashboard pages
 * Optional info icon with tooltip hint
 */
const PageTitle = ({ title, showInfo = false, infoText = "", className = "" }) => {
  return (
    <div className="pt-2">
      <div className="flex items-center">
        {/* <h1 className={`text-2xl md:text-2xl font-semi-bold font-['Funnel_Display'] leading-10 tracking-tight text-textPrimary dark:text-textPrimary-dark ${className}`}> */}
        <h1 className={`text-2xl md:text-2xl font-light font-['Funnel_Display'] leading-10 tracking-normal text-textPrimary dark:text-textPrimary-dark ${className}`}>
          {title}
        </h1>
        {showInfo && infoText && (
          <InfoTooltip 
            text={infoText}
            placement="top"
            iconSize="18px"
            marginLeft="4px"
            className="text-textSecondary dark:text-textSecondary-dark cursor-help"
          />
        )}
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
  infoText: PropTypes.string,
  className: PropTypes.string,
};

export default PageTitle;
