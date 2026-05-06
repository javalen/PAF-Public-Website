import PropTypes from "prop-types";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip, Popover } from "@mui/material";
import { useState } from "react";

/**
 * InfoTooltip Component
 * 
 * Consistent info icon with tooltip across the application
 * Desktop: hover-based tooltip
 * Mobile: click-based popover for accessibility
 */
const InfoTooltip = ({ 
  text, 
  placement = "top", 
  iconSize = "14px", 
  className = "text-textSecondary dark:text-textSecondary-dark cursor-help",
  maxWidth = "300px",
  marginLeft = "4px"
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle mobile popover open/close
  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Detect mobile on mount and resize
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop: Hover tooltip
  if (!isMobile) {
    return (
      <Tooltip 
        title={text}
        placement={placement}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: '#333',
              color: '#fff',
              fontSize: '12px',
              maxWidth: maxWidth,
              padding: '8px 12px',
            },
          },
          arrow: {
            sx: {
              color: '#333',
            },
          },
        }}
      >
        <InfoOutlinedIcon 
          sx={{ fontSize: iconSize, marginLeft: marginLeft }}
          className={className}
        />
      </Tooltip>
    );
  }

  // Mobile: Click-based popover
  return (
    <>
      <button
        onClick={handleClickOpen}
        className={`${className} p-1 rounded-md hover:bg-backgroundSecondary dark:hover:bg-backgroundSecondary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brandPrimary dark:focus:ring-brandPrimary-dark focus:ring-opacity-50`}
        aria-label="Show info"
        style={{ marginLeft }}
      >
        <InfoOutlinedIcon sx={{ fontSize: iconSize }} />
      </button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px',
            maxWidth: maxWidth,
            marginTop: '8px',
          },
        }}
      >
        <div className="text-sm font-['Roboto'] leading-normal tracking-normal">
          {text}
        </div>
      </Popover>
    </>
  );
};

InfoTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  placement: PropTypes.string,
  iconSize: PropTypes.string,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  marginLeft: PropTypes.string,
};

export default InfoTooltip;
