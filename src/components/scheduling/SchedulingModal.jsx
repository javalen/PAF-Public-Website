import { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import PropTypes from "prop-types";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

const DEFAULT_IFRAME_URL =
  "https://calendar.app.google/p3Bi6LnTTzgfpo8M7";

// Reusable scheduling modal with premium transitions, accessibility defaults, and iframe loading states.
export default function SchedulingModal({
  isOpen,
  onClose,
  iframeUrl = DEFAULT_IFRAME_URL,
  title = "Book a Demo",
  description = "Pick a time that works for your team. We will walk through your workflow and answer questions live.",
  iframeTitle = "Google Appointment Scheduling",
  onOpen,
  onBookingStart,
  onIframeLoaded,
}) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isIframeBlocked, setIsIframeBlocked] = useState(false);
  const [bookingTracked, setBookingTracked] = useState(false);
  const closeButtonRef = useRef(null);

  useLockBodyScroll(isOpen);

  // Reset loading and booking tracking whenever the modal is reopened or URL changes.
  useEffect(() => {
    if (!isOpen) {
      setIsIframeLoading(true);
      setIsIframeBlocked(false);
      setBookingTracked(false);
      return;
    }

    setIsIframeLoading(true);
    setIsIframeBlocked(false);
    setBookingTracked(false);
    onOpen?.();

    // Focus the close button after mount for keyboard accessibility.
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, iframeUrl, onOpen]);

  // If embed never loads, assume provider blocked iframe embedding and show fallback action.
  useEffect(() => {
    if (!isOpen || !isIframeLoading) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsIframeBlocked(true);
      setIsIframeLoading(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isOpen, isIframeLoading]);

  // Close modal on Escape key press.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Track first user intent to interact with the scheduler for optional analytics hooks.
  const trackBookingIntent = () => {
    if (bookingTracked) {
      return;
    }
    setBookingTracked(true);
    onBookingStart?.();
  };

  const panelMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 24, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 12, scale: 0.98 },
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
    }),
    []
  );

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <div className="absolute inset-0 overflow-y-auto">
          <div className="min-h-full p-0 sm:flex sm:items-center sm:justify-center sm:p-6 lg:p-8">
            <motion.section
              {...panelMotion}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className={[
                "relative flex h-[100dvh] w-full flex-col overflow-hidden",
                "bg-backgroundPrimary dark:bg-backgroundPrimary-dark",
                "sm:h-auto sm:max-h-[92dvh] sm:max-w-5xl sm:rounded-3xl",
                "sm:border sm:border-borderPrimary dark:sm:border-borderPrimary-dark",
                "sm:shadow-[0_28px_80px_-24px_rgba(15,23,42,0.55)]",
              ].join(" ")}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-borderPrimary bg-backgroundSecondary/70 px-4 py-4 backdrop-blur-sm dark:border-borderPrimary-dark dark:bg-backgroundSecondary-dark/70 sm:px-6">
                <div className="pr-4">
                  <h2 className="text-xl font-medium font-['Funnel_Display'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark sm:text-2xl">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark sm:text-base">
                    {description}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close scheduling modal"
                  className={[
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    "border border-borderPrimary bg-backgroundPrimary text-textPrimary",
                    "transition-colors duration-200 hover:bg-backgroundSecondary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary",
                    "dark:border-borderPrimary-dark dark:bg-backgroundPrimary-dark dark:text-textPrimary-dark",
                    "dark:hover:bg-backgroundSecondary-dark dark:focus-visible:ring-brandPrimary-dark",
                  ].join(" ")}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative flex-1 min-h-0 bg-backgroundPrimary dark:bg-backgroundPrimary-dark">
                {isIframeLoading ? (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-backgroundPrimary/95 px-6 dark:bg-backgroundPrimary-dark/95">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-borderSecondary border-t-brandPrimary dark:border-borderSecondary-dark dark:border-t-brandPrimary-dark" />
                    <p className="text-sm font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                      Loading scheduling experience...
                    </p>
                    <div className="w-full max-w-lg space-y-3">
                      <div className="h-4 animate-pulse rounded bg-backgroundSecondary dark:bg-backgroundSecondary-dark" />
                      <div className="h-4 w-3/4 animate-pulse rounded bg-backgroundSecondary dark:bg-backgroundSecondary-dark" />
                      <div className="h-52 animate-pulse rounded-2xl bg-backgroundSecondary dark:bg-backgroundSecondary-dark" />
                    </div>
                  </div>
                ) : null}

                {isIframeBlocked ? (
                  <div className="flex h-full min-h-[calc(100dvh-96px)] w-full items-center justify-center px-6 sm:min-h-[700px]">
                    <div className="w-full max-w-xl rounded-2xl border border-borderPrimary bg-backgroundSecondary p-6 text-center shadow-sm dark:border-borderPrimary-dark dark:bg-backgroundSecondary-dark">
                      <h3 className="text-xl font-medium font-['Funnel_Display'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                        Open Scheduler in a New Tab
                      </h3>
                      <p className="mt-3 text-sm font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                        This scheduling provider does not allow embedding on some domains. Continue in a secure new tab to complete your booking.
                      </p>
                      <div className="mt-5 flex items-center justify-center">
                        <a
                          href={iframeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={trackBookingIntent}
                          className="inline-flex items-center justify-center rounded-xl bg-brandPrimary px-5 py-3 text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-white transition-colors duration-200 hover:bg-brandSecondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandPrimary focus-visible:ring-offset-2"
                        >
                          Continue to Scheduler
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={iframeUrl}
                    title={iframeTitle}
                    className="block h-full min-h-[calc(100dvh-96px)] w-full sm:min-h-[700px]"
                    loading="lazy"
                    onLoad={() => {
                      setIsIframeBlocked(false);
                      setIsIframeLoading(false);
                      onIframeLoaded?.();
                    }}
                    onMouseDown={trackBookingIntent}
                    onFocus={trackBookingIntent}
                    allow="clipboard-write"
                  />
                )}
              </div>

              <div className="border-t border-borderPrimary bg-backgroundSecondary/80 px-4 py-3 text-xs font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary backdrop-blur-sm dark:border-borderPrimary-dark dark:bg-backgroundSecondary-dark/80 dark:text-textSecondary-dark sm:px-6">
                Your booking is secure. You can close this modal any time with Escape.
              </div>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export function SchedulingModalSpinner() {
  return <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />;
}

SchedulingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  iframeUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  iframeTitle: PropTypes.string,
  onOpen: PropTypes.func,
  onBookingStart: PropTypes.func,
  onIframeLoaded: PropTypes.func,
};
