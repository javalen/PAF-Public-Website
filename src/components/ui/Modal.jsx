import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import PageTitle from './PageTitle';
import StatusTag from './StatusTag';
import { useEffect, useState } from 'react';

// Reusable modal dialog component with responsive sizing and optional footer
// Mobile: bottom sheet with slide-up animation
// Desktop: centered dialog (existing behavior)
const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle = null,
  showSubtitle = false,
  children,
  size = 'lg',
  showHeader = true,
  showCloseButton = true,
  headerClassName = '',
  bodyClassName = '',
  className = '',
  footer = null,
  showFooter = false,
  stickyFooter = true,
  footerClassName = '',
  showRequiredNotice = false,
  formLabelSpacing = 'pb-2',
  disableBodyPadding = false,
}) => {
  // Track animation state for mobile slide-up effect
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Responsive size classes - mobile bottom sheet, desktop centered
  const sizeClasses = {
    sm: 'w-full sm:max-w-md sm:mx-auto',
    md: 'w-full sm:max-w-4xl sm:mx-auto',
    lg: 'w-full sm:max-w-7xl sm:mx-auto',
    full: 'w-full max-w-full mx-2 lg:mx-20',
  };

  // Handle modal open/close with animation timing
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure initial render with translate-y-full, then animate
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for slide-down animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Inject style for label spacing - MUST be unconditional
  useEffect(() => {
    // Only inject styles when modal is open
    if (!isOpen) return;

    const style = document.createElement('style');
    style.id = 'modal-label-spacing-style';

    const spacingMap = {
      'pb-0': '0px',
      'mb-0': '0px',
      'mb-0.5': '2px',
      'pb-0.5': '2px',
      'mb-1': '4px',
      'pb-1': '4px',
      'mb-2': '8px',
      'pb-2': '8px',
      'mb-3': '12px',
      'pb-3': '12px',
      'mb-4': '16px',
      'pb-4': '16px',
    };
    const spacingValue = spacingMap[formLabelSpacing] || '0px';

    style.innerHTML = `
      .modal-form-content label {
        padding-bottom: ${spacingValue};
        margin-bottom: 0px !important;
      }
      .modal-form-content form {
        padding-top: 0.5rem !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('modal-label-spacing-style');
      if (el) el.remove();
    };
  }, [isOpen, formLabelSpacing]);

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Mobile swipe-down to dismiss handler
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    // Swipe down threshold: 100px
    if (touchStart - touchEnd < -100) {
      onClose();
    }
  };

  // Don't render if closed and animation complete
  if (!shouldRender) return null;

  // Smart padding detection
  const hasCustomPadding = bodyClassName && (
    bodyClassName.includes('p-') || 
    bodyClassName.includes('px-') || 
    bodyClassName.includes('py-') ||
    bodyClassName.includes('pt-') ||
    bodyClassName.includes('pb-') ||
    bodyClassName.includes('pl-') ||
    bodyClassName.includes('pr-')
  );
  
  const shouldApplyDefaultPadding = !disableBodyPadding && !hasCustomPadding;

  return ReactDOM.createPortal(
    (
      <div
        className={`
          fixed inset-0 z-[60] 
          flex items-end sm:items-center justify-center 
          bg-black 
          transition-opacity duration-300 ease-out
          ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}
          backdrop-blur-sm 
          sm:p-4 sm:p-6
        `}
        onClick={handleBackdropClick}
      >
        <div
          className={`
            relative 
            ${sizeClasses[size]} 
            bg-backgroundSecondary dark:bg-backgroundSecondary-dark 
            shadow-xl 
            overflow-y-auto 
            transition-transform duration-300 ease-out
            ${className}
            
            /* Slide animation (mobile + desktop) */
            max-h-[90dvh] 
            rounded-t-2xl sm:rounded-lg
            ${isAnimating ? 'translate-y-0 sm:translate-y-0' : 'translate-y-full sm:translate-y-full'}
            
            /* Desktop: max height */
            sm:max-h-[90vh]
          `}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Mobile swipe indicator */}
          <div className="sm:hidden flex justify-center pt-2 pb-1">
            <div className="w-12 h-1 rounded-full bg-borderSecondary dark:bg-borderSecondary-dark" />
          </div>

          {/* Header section */}
          {showHeader && (
            <div className={`
              flex items-center justify-between 
              rounded-t-2xl sm:rounded-t-lg 
              bg-backgroundSecondary dark:bg-backgroundSecondary-dark 
              px-4 py-2 sm:px-6 sm:py-4 
              border-b border-borderSecondary dark:border-borderSecondary-dark 
              ${headerClassName}
            `}>
              <div className="flex-1">
                {/* Mobile: larger title; desktop unchanged */}
                <PageTitle 
                  title={title}
                  className="text-[24px] sm:text-2xl leading-normal tracking-normal"
                />
                {showSubtitle && subtitle && (
                  <div className="text-textSecondary dark:text-textSecondary-dark text-xs sm:text-sm font-normal font-['Roboto'] leading-normal tracking-normal mt-0.5 sm:mt-1">
                    {subtitle}
                  </div>
                )}
              </div>
              {/* Close button with larger touch target on mobile */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="
                    text-textPrimary dark:text-textPrimary-dark 
                    hover:text-textSecondary dark:hover:text-textSecondary-dark 
                    focus:outline-none focus:ring-2 focus:ring-brandPrimary dark:focus:ring-brandPrimary-dark 
                    focus:ring-opacity-50 rounded-md 
                    p-2 sm:p-1 
                    transition-colors
                    min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0
                    flex items-center justify-center
                  "
                  aria-label="Close modal"
                >
                  <CloseIcon fontSize="small" />
                </button>
              )}
            </div>
          )}

          {/* Required Field Notice */}
          {showRequiredNotice && (
            <div className="px-4 pt-3 sm:px-6 sm:pt-6">
              <StatusTag status="* Required" variant="error" showIndicator={false} />
            </div>
          )}

          {/* Body content - extra bottom padding on mobile for footer actions */}
          <div className={`
            modal-form-content 
            text-textPrimary dark:text-textPrimary-dark 
            ${shouldApplyDefaultPadding ? 'p-4 pb-6 sm:p-6' : ''} 
            ${bodyClassName}
          `}>
            {children}
          </div>

          {/* Footer - sticky on desktop only, flows with content on mobile */}
          {showFooter && (
            <div
              className={`
                ${stickyFooter ? 'sm:sticky sm:bottom-0 sm:left-0' : ''} 
                w-full 
                bg-backgroundSecondary dark:bg-backgroundSecondary-dark 
                border-t border-borderSecondary dark:border-borderSecondary-dark 
                px-4 py-3 sm:px-6 
                flex flex-col gap-2 sm:flex-row sm:justify-end 
                ${stickyFooter ? 'sm:z-10' : ''} 
                sm:shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.12)] sm:dark:shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.32)]
                ${footerClassName}
              `}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    ),
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showSubtitle: PropTypes.bool,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  showHeader: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  className: PropTypes.string,
  footer: PropTypes.node,
  showFooter: PropTypes.bool,
  stickyFooter: PropTypes.bool,
  footerClassName: PropTypes.string,
  showRequiredNotice: PropTypes.bool,
  disableBodyPadding: PropTypes.bool,
};

export default Modal;
