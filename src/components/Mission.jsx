import { Container } from "./Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PafButton from "./ui/PafButton";
import pledgeImage from "../assets/pledgeImage.jpg";

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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-14">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
