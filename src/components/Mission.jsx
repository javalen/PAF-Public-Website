import { Container } from "./Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PafButton from "./ui/PafButton";
import pledgeImage from "../assets/pledgeImage.jpg";
import appStoreBadge from "../assets/appStore.svg";
import googlePlayBadge from "../assets/googlePlay.svg";

const ANDROID_APP_URL =
  "https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share";
const IOS_APP_URL = "#";

export function Mission() {
  return (
    <section
      id="mission"
      aria-labelledby="about-title"
      className="relative overflow-hidden border-t border-borderPrimary dark:border-borderPrimary-dark bg-brandPrimary py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >

      </div>

      <Container className="relative z-10 max-w-[1250px]">
        {/* Mobile-only Mission layout with download badges. */}
        <div className="flex flex-col gap-6 lg:hidden">
          <div className="flex flex-col gap-1">
            <p className="font-['Funnel_Display'] text-xs font-extrabold uppercase leading-normal tracking-normal text-colorHilight">
              Mission
            </p>
            <h2
              id="about-title"
              className="font-['Funnel_Display'] text-[36px] font-light leading-[1.1] tracking-normal text-white"
            >
              The Predictaf Pledge
            </h2>
          </div>

          <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-white/95">
            Predictaf empowers HOA, COA, and POA communities to protect
            property values, reduce risk, and prevent costly surprises by
            transforming maintenance, compliance, and capital planning into a
            proactive, transparent, and intelligent system.
          </p>

          <div className="relative mx-auto w-full max-w-[320px]">
            <img
              src={pledgeImage}
              alt="Predictaf building illustration"
              className="h-auto w-full object-contain mix-blend-soft-light opacity-85"
            />
          </div>

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

          <div className="flex flex-col gap-3 pt-1">
            <p className="font-['Roboto'] text-sm font-medium leading-normal tracking-normal text-white/85">
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

        {/* Desktop/tablet Mission layout stays unchanged. */}
        <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-14">
          <div className="relative mx-auto w-full max-w-[500px] lg:order-2 lg:mx-0">
            <img
              src={pledgeImage}
              alt="Predictaf building illustration"
              className="h-auto w-full object-contain mix-blend-soft-light opacity-85"
            />
          </div>

          <div className="max-w-[620px] lg:order-1">
            <p className="font-['Funnel_Display'] text-sm font-extrabold uppercase leading-normal tracking-[0.4px] text-colorHilight">
              Mission
            </p>

            <h2
              id="about-title"
              className="mt-1 font-['Funnel_Display'] text-[36px] font-light leading-[1.2] tracking-normal text-white sm:text-[42px]"
            >
              The Predictaf Pledge
            </h2>

            <p className="mt-5 max-w-[580px] font-['Roboto'] text-base font-normal leading-normal tracking-normal text-white/95 sm:text-[18px]">
              Predictaf empowers HOA, COA, and POA communities to protect
              property values, reduce risk, and prevent costly surprises by
              transforming maintenance, compliance, and capital planning into a
              proactive, transparent, and intelligent system.
            </p>
            {/* <p className="mt-5 max-w-[614px] font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-white/90 sm:text-[18px]">
              We help community associations govern with confidence, preserve long-term assets, and create safer, more stable neighborhoods—so boards can lead responsibly and residents can live with peace of mind.
            </p> */}

            <div className="mt-7">
              <Link to="/register" className="inline-flex">
                <PafButton variant="emphasis" size="large" iconRight={<ArrowRight />}>
                  Start a Free Trial
                </PafButton>
              </Link>
            </div>

            {/* Description for app store buttons */}
            <p className="mt-5 font-['Roboto'] text-sm font-medium leading-normal tracking-normal text-white/85">
              Download the mobile app
              {/* Get started quickly and effortlessly today!
              Sign up in just 30 seconds. Download the app, create a client account, and start enjoying the benefits of Predictaf almost immediately. */}
            </p>

            {/* App store buttons for desktop view */}
            <div className="mt-5 flex flex-wrap gap-3">
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
      </Container>
    </section>
  );
}
