import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageGrid({ images, mobileImages, fullWidth = true, layout = "split-right" }) {
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);
  const desktopItemRefs = useRef([]);
  const mobileItemRefs = useRef([]);

  // Use dedicated mobile images when provided, otherwise reuse desktop images.
  const mobileImageArray =
    mobileImages && mobileImages.length >= 4 ? mobileImages.slice(0, 4) : images.slice(0, 4);

  const gridColumnsClass =
    layout === "split-middle"
      ? "grid-cols-[minmax(0,1.55fr)_minmax(0,1.2fr)_minmax(0,2.25fr)]"
      : "grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.4fr)]";

  const getItemClassName = (index) => {
    if (layout === "split-middle") {
      if (index === 0) return "relative overflow-hidden row-span-2 col-start-1 row-start-1";
      if (index === 1) return "relative overflow-hidden col-start-2 row-start-1";
      if (index === 2) return "relative overflow-hidden col-start-2 row-start-2";
      if (index === 3) return "relative overflow-hidden row-span-2 col-start-3 row-start-1";
    }

    return `relative overflow-hidden ${index < 2 ? "row-span-2" : ""}`;
  };

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Clear any inline backgroundColor to let Tailwind classes handle it.
    wrapperRef.current.style.backgroundColor = "";

    const mm = gsap.matchMedia();

    // Mobile-specific image reveal for the mobile-optimized grid.
    mm.add("(max-width: 639px)", () => {
      const items = mobileItemRefs.current.filter(Boolean);
      if (items.length < 4) return undefined;

      gsap.set(items[0], { x: "-28vw" });
      gsap.set(items[1], { x: "20vw" });
      gsap.set(items[2], { x: "-20vw" });
      gsap.set(items[3], { x: "28vw" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 92%",
          end: "top 48%",
          scrub: 1.2,
        },
      });

      tl.to(items, { x: 0, duration: 3.2, ease: "power2.inOut", stagger: 0.08 }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Desktop/tablet image reveal for the desktop grid.
    mm.add("(min-width: 640px)", () => {
      const items = desktopItemRefs.current.filter(Boolean);
      if (items.length < 4) return undefined;

      gsap.set(items[0], { x: "-40vw" });
      gsap.set(items[1], { x: "-25vw" });
      gsap.set(items[2], { x: "25vw" });
      gsap.set(items[3], { x: "40vw" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 1.5,
        },
      });

      tl.to(items, { x: 0, duration: 4, ease: "power2.inOut", stagger: 0.08 }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [images, mobileImages]);

  const [img1, img2, img3, img4] = images;
  const imageArray = [img1, img2, img3, img4];

  const grid = (
    <div
      ref={gridRef}
      className={`relative mx-auto grid ${gridColumnsClass} grid-rows-2 gap-0.5`}
      style={{ height: "345px", maxWidth: "1400px" }}
    >
      {imageArray.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) desktopItemRefs.current[i] = el;
          }}
          className={getItemClassName(i)}
        >
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-backgroundPrimary dark:bg-backgroundPrimary-dark"
      style={mobileImages ? undefined : { height: "345px" }}
    >
      {/* Mobile asymmetric grid with dedicated mobile animation */}
      <div className="sm:hidden flex flex-col gap-[4px]">
        {/* Top row: wider left cell, narrower right cell */}
        <div className="flex gap-[4px]">
          <div
            ref={(el) => {
              if (el) mobileItemRefs.current[0] = el;
            }}
            className="h-[170px] overflow-hidden"
            style={{ flex: "226 1 0%" }}
          >
            <img src={mobileImageArray[0].src} alt={mobileImageArray[0].alt} className="w-full h-full object-cover" />
          </div>
          <div
            ref={(el) => {
              if (el) mobileItemRefs.current[1] = el;
            }}
            className="h-[170px] overflow-hidden"
            style={{ flex: "160 1 0%" }}
          >
            <img src={mobileImageArray[1].src} alt={mobileImageArray[1].alt} className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Bottom row: slightly narrower left, slightly wider right */}
        <div className="flex gap-[4px]">
          <div
            ref={(el) => {
              if (el) mobileItemRefs.current[2] = el;
            }}
            className="h-[90px] overflow-hidden"
            style={{ flex: "185 1 0%" }}
          >
            <img src={mobileImageArray[2].src} alt={mobileImageArray[2].alt} className="w-full h-full object-cover" />
          </div>
          <div
            ref={(el) => {
              if (el) mobileItemRefs.current[3] = el;
            }}
            className="h-[90px] overflow-hidden"
            style={{ flex: "200 1 0%" }}
          >
            <img src={mobileImageArray[3].src} alt={mobileImageArray[3].alt} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Desktop grid – hidden on mobile when mobileImages is provided */}
      <div
        className="hidden sm:block"
        style={{ height: "345px" }}
      >
        {fullWidth ? (
          grid
        ) : (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            {grid}
          </div>
        )}
      </div>
    </div>
  );
}

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  mobileImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
  fullWidth: PropTypes.bool,
  layout: PropTypes.oneOf(["split-right", "split-middle"]),
};
