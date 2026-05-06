import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageGrid({ images, fullWidth = true, layout = "split-right" }) {
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);

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
    if (!wrapperRef.current || !gridRef.current) return;

    const items = itemRefs.current.filter(Boolean);
    if (items.length < 4) return;

    // Clear any inline backgroundColor to let Tailwind classes handle it
    wrapperRef.current.style.backgroundColor = '';

    // Set initial state: images start from full-width page edges with partial visibility
    gsap.set(items[0], { x: "-40vw" });
    gsap.set(items[1], { x: "-25vw" });
    gsap.set(items[2], { x: "25vw" });
    gsap.set(items[3], { x: "40vw" });

    // Scrubbed animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 85%",
        end: "top 35%",
        scrub: 1.5,
      },
    });

    // Animate images sliding in
    tl.to(
      items,
      { x: 0, duration: 4, ease: "power2.inOut", stagger: 0.08 },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

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
            if (el) itemRefs.current[i] = el;
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
      className="relative w-screen overflow-hidden bg-backgroundPrimary dark:bg-backgroundPrimary-dark"
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
  );
}

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
  layout: PropTypes.oneOf(["split-right", "split-middle"]),
};
