import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import hiwBackground from "../assets/hiwBackground.jpg";
import mHiwBackground from "../assets/m-hiwBackground.jpg";
import appStoreBadge from "../assets/appStore.svg";
import googlePlayBadge from "../assets/googlePlay.svg";

const SLIDE_ALIGNMENT_NUDGE = 14;
const ANDROID_APP_URL =
  "https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share";
const IOS_APP_URL = "https://apps.apple.com/us/app/predictaf-mobile/id6738309158";

const keyFeatures = [
  {
    title: "Catalogs Facility & System Assets",
    description:
      "Easily organize Facilities and systems such as HVAC, electrical, fire safety, and other assets in one centralized platform.",
  },
  {
    title: "Set Smart Maintenance Schedules",
    description:
      "Create custom schedules for every system with automated tracking and reminders.",
  },
  {
    title: "Stay Ahead of Compliance",
    description:
      "Track permits, warranties, and inspections with alerts before anything expires.",
  },
  {
    title: "Monitor in Real Time",
    description:
      "Get a live view of system status, upcoming tasks, and overdue maintenance.",
  },
  {
    title: "Turn Data Into Action",
    description:
      "Use insights and analytics to improve performance, reduce risk, and plan ahead.",
  },
];

function KeyFeatureCard({ item, index }) {
  return (
    <article
      className="flex min-w-[760px] items-center gap-6 md:min-w-[820px]"
      aria-label={item.title}
    >
      <div className="relative h-[51px] w-[114px] shrink-0">
        <div className="absolute left-[4px] right-0 top-1/2 h-px -translate-y-1/2 bg-colorHilight" />
        <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-colorHilight" />
        <div className="absolute left-0 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-[8px] bg-colorHilight text-[14px] font-bold font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary">
          {index + 1}
        </div>
      </div>

      <div className="rounded-[24px] border-[3px] border-brandSecondary/30 bg-[radial-gradient(circle_at_70%_45%,rgba(0,58,140,0.85),rgba(0,58,140,0.85)_60%,rgba(0,58,140,1)_100%)] px-10 py-14 md:px-14 md:py-14">
        <h3 className="font-['Funnel_Display'] text-[32px] font-base leading-normal tracking-normal text-colorHilight md:text-[20px]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[560px] font-['Roboto'] text-lg font-normal leading-normal tracking-normal text-textPrimary-dark md:text-[16px]">
          {item.description}
        </p>
      </div>
    </article>
  );
}

KeyFeatureCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function KeyFeatures() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const headingWrapRef = useRef(null);
  const mobileFeatureRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [alignOffset, setAlignOffset] = useState(0);

  const displayFeatures = [...keyFeatures, ...keyFeatures];
  const activeDot = slideIndex % keyFeatures.length;
  const mobileActiveItem = keyFeatures[mobileSlideIndex];

  const updateAlignmentOffset = useCallback(() => {
    if (!headingWrapRef.current) return;
    const left = headingWrapRef.current.getBoundingClientRect().left;
    setAlignOffset(Math.max(0, left));
  }, []);

  const goToSlide = useCallback(
    (nextIndex) => {
      if (!trackRef.current) return;

      const targetCard = cardRefs.current[nextIndex];
      if (!targetCard) return;

      const targetX = -(
        targetCard.offsetLeft -
        (alignOffset + SLIDE_ALIGNMENT_NUDGE)
      );
      gsap.to(trackRef.current, {
        x: targetX,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          if (nextIndex === keyFeatures.length) {
            const firstCard = cardRefs.current[0];
            const resetX = firstCard
              ? -(firstCard.offsetLeft - (alignOffset + SLIDE_ALIGNMENT_NUDGE))
              : 0;
            gsap.set(trackRef.current, { x: resetX });
            setSlideIndex(0);
          }
        },
      });
    },
    [alignOffset],
  );

  useEffect(() => {
    updateAlignmentOffset();
  }, [updateAlignmentOffset]);

  useEffect(() => {
    const track = trackRef.current;
    goToSlide(slideIndex);

    return () => {
      if (track) {
        gsap.killTweensOf(track);
      }
    };
  }, [goToSlide, slideIndex]);

  useEffect(() => {
    if (isPaused || !isAutoScrollEnabled) return;

    // Move one feature at a time, then pause so users can read before advancing.
    const timer = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 5200);

    return () => clearInterval(timer);
  }, [isAutoScrollEnabled, isPaused]);

  useEffect(() => {
    const handleResize = () => {
      if (!trackRef.current) return;
      updateAlignmentOffset();
      const targetCard = cardRefs.current[slideIndex];
      if (!targetCard) return;
      gsap.set(trackRef.current, {
        x: -(targetCard.offsetLeft - (alignOffset + SLIDE_ALIGNMENT_NUDGE)),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [alignOffset, slideIndex, updateAlignmentOffset]);

  const handleNext = () => {
    setIsAutoScrollEnabled(false);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setIsAutoScrollEnabled(false);
    setSlideIndex(
      (prev) => (prev - 1 + keyFeatures.length) % keyFeatures.length,
    );
  };

  const handleDotClick = (index) => {
    setIsAutoScrollEnabled(false);
    setSlideIndex(index);
  };

  const handleMobileDotClick = (index) => {
    setMobileSlideIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileSlideIndex((prev) => (prev + 1) % keyFeatures.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mobileFeatureRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 639px)", () => {
      const tween = gsap.fromTo(
        mobileFeatureRef.current,
        { x: 72, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          overwrite: "auto",
        },
      );

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [mobileSlideIndex]);

  return (
    <section
      id="features"
      aria-labelledby="key-features-title"
      className="relative w-full overflow-hidden mt-0 sm:mt-16 lg:mt-20 py-32 sm:py-36 lg:py-40"
    >
      {/* Mobile background art */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage: `url(${mHiwBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Desktop/tablet background art */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage: `url(${hiwBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Mobile overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-brandPrimary/72 sm:hidden"
        aria-hidden="true"
      />

      {/* Desktop/tablet overlay */}
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block bg-[linear-gradient(180deg,rgba(0,80,179,0.42)_0%,rgba(0,80,179,0.3)_55%,rgba(0,80,179,0.42)_100%)]"
        aria-hidden="true"
      />

      {/* MOBILE VERSION */}
      <Container className="relative z-10 sm:hidden px-4">
        <div className="flex flex-col">
          <p className="font-['Funnel_Display'] text-xs font-extrabold uppercase leading-normal tracking-normal text-colorHilight">
            Key Features
          </p>

          <h2 className="mt-1 max-w-[320px] font-['Funnel_Display'] text-[36px] font-light leading-[1.1] tracking-normal text-textPrimary-dark">
            {/* How Predictaf Works */}
            The Source of Truth for Facility Operations
          </h2>

          <div ref={mobileFeatureRef} className="min-h-[286px]">
            <div className="relative mt-5 ml-2 h-14 w-10">
              <div className="absolute left-[15px] top-8 h-6 w-px bg-colorHilight" />
              <div className="absolute left-[12px] top-[30px] h-2 w-2 rounded-full bg-colorHilight" />
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-[10px] bg-colorHilight text-sm font-bold font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary">
                {mobileSlideIndex + 1}
              </div>
            </div>

            <article className="mt-2 min-h-[220px] rounded-[36px] border border-brandSecondary/30 bg-[radial-gradient(circle_at_70%_45%,rgba(24,144,255,0.2),rgba(0,80,179,0.85)_55%,rgba(0,80,179,0.95)_100%)] px-7 py-8 shadow-[0_0_0_1px_rgba(24,144,255,0.25)]">
              <h3 className="font-['Funnel_Display'] text-2xl font-medium leading-normal tracking-normal text-colorHilight">
                {mobileActiveItem.title}
              </h3>
              <p className="mt-3 font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textPrimary-dark">
                {mobileActiveItem.description}
              </p>
            </article>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {keyFeatures.map((_, index) => (
              <button
                key={`mobile-dot-${index}`}
                type="button"
                onClick={() => handleMobileDotClick(index)}
                aria-label={`Go to key feature ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  mobileSlideIndex === index
                    ? "w-5 bg-colorHilight"
                    : "w-2.5 bg-backgroundSecondary/35"
                }`}
              />
            ))}
          </div>

          <div className="mt-8">
            <Link to="/register" className="block w-full">
              <PafButton
                variant="emphasis"
                size="large"
                iconRight={<ArrowRight />}
                className="w-full"
              >
                Start a Free Trial
              </PafButton>
            </Link>

            <div className="mt-4 flex flex-col gap-3">
              <p className="font-['Roboto'] text-sm font-medium leading-normal tracking-normal text-textPrimary-dark/90">
                Download the mobile app
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={IOS_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="inline-flex"
                >
                  <img
                    src={appStoreBadge}
                    alt="Download on the App Store"
                    className="h-[54px] w-auto"
                  />
                </a>
                <a
                  href={ANDROID_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="inline-flex"
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    className="h-[54px] w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* DESKTOP/TABLET VERSION */}
      <div className="hidden sm:block">
        <Container className="relative z-10 max-w-[1250px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div ref={headingWrapRef}>
              <p className="font-['Funnel_Display'] text-sm font-extrabold uppercase leading-normal tracking-[0.4px] text-colorHilight">
                Key Features
              </p>
              <h2
                id="key-features-title"
                className="mt-1 font-['Funnel_Display'] text-[42px] font-light leading-[1.2] tracking-normal text-white"
              >
                {/* How Predictaf Works */}
                The Source of Truth for Facility Operations
              </h2>
            </div>

            <Link to="/register">
              <PafButton
                variant="emphasis"
                size="large"
                iconRight={<ArrowRight />}
              >
                Start a Free Trial
              </PafButton>
            </Link>
          </div>
        </Container>

        <div className="relative z-10 mt-10 w-screen">
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex w-max gap-8 pr-8 will-change-transform"
              style={{ paddingLeft: `${alignOffset}px` }}
            >
              {displayFeatures.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                >
                  <KeyFeatureCard
                    item={item}
                    index={index % keyFeatures.length}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous key feature"
            className="rounded p-1 text-colorHilight transition-opacity hover:opacity-80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {keyFeatures.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                aria-label={`Go to key feature ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeDot === index
                    ? "w-4 bg-colorHilight"
                    : "w-2 bg-colorHilight/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next key feature"
            className="rounded p-1 text-colorHilight transition-opacity hover:opacity-80"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
