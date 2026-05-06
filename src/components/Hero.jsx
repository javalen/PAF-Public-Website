import { useState, useEffect, useCallback } from "react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import TextHighlight from "./ui/TextHighlight";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// Carousel images sourced from existing project assets
import facilityImg from "../assets/heroImage1.jpg";
import hvacImg from "../images/hvac.jpg";
import compExImg from "../images/compEx.jpg";
import sysExImg from "../images/sysEx.jpg";
import saftyExImg from "../images/saftyEx.jpg";

const CAROUSEL_IMAGES = [
  { src: facilityImg, alt: "Facility management overview" },
  // { src: hvacImg, alt: "HVAC system monitoring" },
  // { src: compExImg, alt: "Compliance tracking" },
  // { src: sysExImg, alt: "Systems dashboard" },
  // { src: saftyExImg, alt: "Safety compliance" },
];

const SHORT_TEXT_BEFORE =
  "Predicaf is a proactive maintenance and compliance management system designed for large-scale residential and commercial properties, ";

const FULL_TEXT_BEFORE =
  "Predicaf is a proactive maintenance and compliance management system designed for large-scale residential and commercial properties, ";

const HIGHLIGHT_TEXT = "particularly those with limited engineering oversight";

const FULL_TEXT_AFTER =
  "Our products enable users to catalog and manage critical building systems such as mechanical equipment, HVAC units, fire sprinkler systems, and electrical panels, while linking each asset to a tailored maintenance schedule. The system then tracks these schedules in real-time, flagging overdue tasks and upcoming service requirements. Additionally, it manages time-sensitive documentation like warranties, permits, and inspections by tracking expiration dates and sending automated alerts. The result is improved operational visibility, reduced liability, and data-driven oversight all in a centralized interface";

export function Hero() {
  const [expanded, setExpanded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasMultipleImages = CAROUSEL_IMAGES.length > 1;



  // Auto-advance carousel every 4 seconds unless paused
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % CAROUSEL_IMAGES.length),
    [],
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);

  useEffect(() => {
    if (!hasMultipleImages || paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [hasMultipleImages, next, paused]);

  return (
    <section id="hero" className="bg-backgroundPrimary dark:bg-backgroundPrimary-dark py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col gap-6">
            {/* ABOUT label */}
            <p className="text-sm font-extrabold font-['Funnel_Display'] tracking-widest uppercase text-brandSecondary dark:text-brandSecondary-dark leading-normal mb-[-16px]">
              About
            </p>

            {/* Heading */}
            <h1 className="text-5xl font-light font-['Funnel_Display'] tracking-normal leading-[1.1] text-brandPrimary dark:text-brandPrimary-dark">
              From Reactive
              <br />
              to Predictive
            </h1>

            {/* Body text – collapsed/expanded */}
            <div>
              <p className="text-lg font-['Roboto'] tracking-normal leading-relaxed text-brandPrimary dark:text-textSecondary-dark">
                {SHORT_TEXT_BEFORE}
                <TextHighlight>{HIGHLIGHT_TEXT}</TextHighlight>.
                {!expanded && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="underline text-brandPrimary dark:text-colorHilight hover:text-brandSecondary dark:hover:text-brandSecondary font-['Roboto'] tracking-normal leading-normal transition-colors"
                    >
                      Read More
                    </button>
                  </>
                )}
              </p>

              {expanded && (
                <>
                  <p className="mt-4 text-lg font-['Roboto'] tracking-normal leading-relaxed text-brandPrimary dark:text-textSecondary-dark">
                    {FULL_TEXT_AFTER}
                  </p>
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    className="mt-4 underline text-brandPrimary dark:text-colorHilight hover:text-brandSecondary dark:hover:text-brandSecondary font-['Roboto'] tracking-normal leading-normal transition-colors"
                  >
                    Read Less
                  </button>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 mt-2">
              <a href="/register">
                <PafButton variant="primary" size="large" iconRight={<ArrowRight />}>
                  Start a Free Trial
                </PafButton>
              </a>
              <p className="text-base font-['Roboto'] tracking-normal leading-normal text-brandPrimary dark:text-brandPrimary-dark">
                Sign Up in 30 Seconds • No credit card required
              </p>
            </div>
          </div>

          {/* ── RIGHT: image carousel ── */}
          <div className="relative w-full">
            {/* Image frame */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-backgroundSecondary dark:bg-backgroundSecondary-dark shadow-lg">
              {CAROUSEL_IMAGES.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover ${
                    hasMultipleImages ? "transition-opacity duration-700" : ""
                  } ${
                    i === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {hasMultipleImages && (
                <>
                  {/* Pause / Play toggle */}
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                    className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-backgroundPrimary/70 dark:bg-backgroundPrimary-dark/70 text-textPrimary dark:text-textPrimary-dark hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark transition-colors"
                  >
                    {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>

                  {/* Prev / Next arrow buttons */}
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full bg-backgroundPrimary/70 dark:bg-backgroundPrimary-dark/70 text-textPrimary dark:text-textPrimary-dark hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full bg-backgroundPrimary/70 dark:bg-backgroundPrimary-dark/70 text-textPrimary dark:text-textPrimary-dark hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {hasMultipleImages && (
              <div className="mt-4 flex justify-center gap-2">
                {CAROUSEL_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-brandPrimary dark:bg-brandPrimary-dark"
                        : "w-2 bg-borderSecondary dark:bg-borderSecondary-dark"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </Container>
    </section>
  );
}

