import { useState, useEffect, useCallback } from "react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import TextHighlight from "./ui/TextHighlight";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import StatusTag from "./ui/StatusTag";

// Carousel images sourced from existing project assets
import facilityImg from "../assets/heroImage1.jpg";

const CAROUSEL_IMAGES = [
  { src: facilityImg, alt: "Facility management overview" },
  // { src: hvacImg, alt: "HVAC system monitoring" },
];

const SHORT_TEXT_BEFORE =
  "Predictaf is a proactive maintenance and compliance management system designed for large-scale residential and commercial properties, ";

const FULL_TEXT_BEFORE =
  "Predictaf is a proactive maintenance and compliance management system designed for large-scale residential and commercial properties, ";

const HIGHLIGHT_TEXT = "particularly those with limited engineering oversight";

const FULL_TEXT_AFTER =
  "The mobile app and web control panel enable users to catalog and manage critical building systems such as mechanical equipment, HVAC units, fire sprinkler systems, and electrical panels, while linking each asset to a tailored maintenance schedule. The products then track schedules in real-time, flagging overdue tasks and upcoming service requirements. Additionally, Predictaf manages time-sensitive documentation like warranties, permits, and inspections by tracking expiration dates and sending automated alerts. The result is improved operational visibility, reduced liability, and data-driven oversight all in a centralized interface";

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
    setCurrent(
      (c) => (c - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length,
    );

  useEffect(() => {
    if (!hasMultipleImages || paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [hasMultipleImages, next, paused]);

  return (
    <section
      id="hero"
      className="bg-brandPrimary lg:bg-backgroundPrimary dark:lg:bg-backgroundPrimary-dark pt-6 pb-0 sm:py-20 lg:py-24"
    >
      <Container>
        {/* MOBILE HERO (visible below lg): adjust mobile spacing, copy, CTA, and image order here */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-6">
            {/* Mobile heading and top CTA block */}
            <div className="flex flex-col gap-5">
              <h1 className="text-[42px] font-light font-['Funnel_Display'] tracking-normal leading-[1.1] text-white">
                From Reactive
                <br />
                to Predictive
              </h1>

              <div className="mt-1 flex flex-col gap-4">
                {/* <div className="inline-flex">
                  <StatusTag variant="success" size="xs" showIndicator={false}>
                    For a limited time only enjoy a 3 month Free Trial!
                  </StatusTag>
                </div> */}
                <a href="/register" className="w-full">
                  <PafButton
                    variant="emphasis"
                    size="large"
                    iconRight={<ArrowRight />}
                    className="w-full"
                  >
                    Start a Free Trial
                  </PafButton>
                </a>
                <p className="text-base font-['Roboto'] tracking-normal leading-normal text-white">
                  Sign Up in 30 Seconds • No credit card required
                </p>
              </div>
            </div>

            {/* Mobile carousel block */}
            <div className="relative w-full">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-backgroundSecondary dark:bg-backgroundSecondary-dark shadow-lg">
                {CAROUSEL_IMAGES.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 w-full h-full object-cover ${
                      hasMultipleImages ? "transition-opacity duration-700" : ""
                    } ${i === current ? "opacity-100" : "opacity-0"}`}
                  />
                ))}

                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                      className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-backgroundPrimary/70 dark:bg-backgroundPrimary-dark/70 text-textPrimary dark:text-textPrimary-dark hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark transition-colors"
                    >
                      {paused ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )}
                    </button>

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
                          ? "w-6 bg-white"
                          : "w-2 bg-backgroundSecondary/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile long-form copy and secondary CTA */}
            <div className="bg-backgroundPrimary dark:bg-backgroundPrimary-dark -mx-4 px-4 pt-6 pb-20 sm:-mx-6 sm:px-6 sm:rounded-md">
              <p className="text-lg font-['Roboto'] tracking-normal leading-relaxed text-brandPrimary dark:text-textSecondary-dark">
                {SHORT_TEXT_BEFORE}
                <TextHighlight>{HIGHLIGHT_TEXT}</TextHighlight>.
                {!expanded && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => !e)}
                      className="font-['Roboto'] leading-normal tracking-normal text-brandPrimary dark:text-colorHilight underline transition-colors hover:text-brandSecondary dark:hover:text-brandSecondary"
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
                    className="mt-4 font-['Roboto'] leading-normal tracking-normal text-brandPrimary dark:text-colorHilight underline transition-colors hover:text-brandSecondary dark:hover:text-brandSecondary"
                  >
                    Read Less
                  </button>
                </>
              )}

              <a
                href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full"
              >
                <PafButton
                  variant="primary"
                  size="large"
                  className="w-full"
                  iconLeft={<Calendar className="w-5 h-5" />}
                >
                  Schedule a Demo
                </PafButton>
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP HERO (visible at lg+): adjust desktop layout, spacing, and typography here */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Desktop left column: heading, copy, expandable text, and CTA */}
          <div className="flex flex-col gap-5">
            <p className="mb-[-16px] text-sm font-extrabold font-['Funnel_Display'] tracking-widest uppercase leading-normal text-brandSecondary dark:text-brandSecondary-dark">
              About
            </p>

            <h1 className="text-5xl font-light font-['Funnel_Display'] tracking-normal leading-[1.1] text-brandPrimary dark:text-brandPrimary-dark">
              From Reactive
              <br />
              to Predictive
            </h1>

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
                      className="font-['Roboto'] leading-normal tracking-normal text-brandPrimary underline transition-colors hover:text-brandSecondary dark:text-colorHilight dark:hover:text-brandSecondary"
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
                    className="mt-4 font-['Roboto'] leading-normal tracking-normal text-brandPrimary underline transition-colors hover:text-brandSecondary dark:text-colorHilight dark:hover:text-brandSecondary"
                  >
                    Read Less
                  </button>
                </>
              )}

              <div className="mt-6 flex flex-col gap-4">
                <div className="inline-flex">
                  <StatusTag variant="success" size="lg" showIndicator={false}>
                    {/* For a limited time only enjoy a 3 month Free Trial! */}
                    Enjoy a FREE 3-month trial available for a limited time
                    only!
                  </StatusTag>
                </div>
                <a href="/register" className="w-auto">
                  <PafButton
                    variant="primary"
                    size="large"
                    iconRight={<ArrowRight />}
                  >
                    Start a Free Trial
                  </PafButton>
                </a>
                <p className="text-base font-['Roboto'] tracking-normal leading-normal text-brandPrimary dark:text-brandPrimary-dark">
                  Sign Up in 30 Seconds • No credit card required
                </p>
              </div>
            </div>
          </div>

          {/* Desktop right column: carousel and pagination dots */}
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-backgroundSecondary dark:bg-backgroundSecondary-dark shadow-lg">
              {CAROUSEL_IMAGES.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover ${
                    hasMultipleImages ? "transition-opacity duration-700" : ""
                  } ${i === current ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                    className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-backgroundPrimary/70 dark:bg-backgroundPrimary-dark/70 text-textPrimary dark:text-textPrimary-dark hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark transition-colors"
                  >
                    {paused ? (
                      <Play className="h-4 w-4" />
                    ) : (
                      <Pause className="h-4 w-4" />
                    )}
                  </button>

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
