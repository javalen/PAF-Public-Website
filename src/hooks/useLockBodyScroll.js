import { useEffect } from "react";

// Prevent page scrolling while overlays are open and restore the original state on close.
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    // Avoid layout shift when removing the scrollbar on desktop.
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

export default useLockBodyScroll;
