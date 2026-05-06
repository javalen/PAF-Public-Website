import { ArrowRight, Gauge, MessageCircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";
import { usePricingWizard } from "./pricing-wizard/PricingWizardContext";

import { Container } from "./Container";
import PafButton from "./ui/PafButton";

// PricePredictor surfaces a quick CTA that opens the pricing wizard modal.
export default function PricePredictor() {
  const { setIsOpen } = usePricingWizard();
  return (
    // <section className="bg-colorHilight py-10 dark:bg-colorHilight-dark sm:py-12">
     <section className="bg-backgroundSecondary py-10 dark:bg-backgroundSecondary-dark sm:py-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            {/* <p className="font-['Funnel_Display'] text-[14px] font-extrabold uppercase leading-normal tracking-[0.4px] text-brandSecondary dark:text-brandSecondary-dark">
              Price Predictor
            </p> */}
            {/* <p className="font-['Funnel_Display'] text-[14px] font-extrabold uppercase leading-normal tracking-[0.4px] text-brandSecondary dark:text-brandSecondary-dark">
              Need help deciding which plan is right for you?
            </p> */}
            <p className="font-['Funnel_Display'] text-[14px] font-extrabold uppercase leading-normal tracking-[0.4px] text-brandSecondary dark:text-brandSecondary-dark">
              Which plan is right for you?
            </p>
            {/* <h2 className="mt-1 font-['Funnel_Display'] text-[28px] font-light leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[32px] lg:text-[35px]">
              Use our price predictor to find your ideal plan.
            </h2> */}
            <h2 className="mt-1 font-['Funnel_Display'] text-[28px] font-light leading-tight tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[32px] lg:text-[35px]">
              Use the price plan predictor to find the best plan for your organizations needs.
            </h2>
            {/* <h2 className="mt-1 font-['Funnel_Display'] text-[28px] font-light leading-tight tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[32px] lg:text-[35px]">
              Need help deciding which plan is right for you?
            </h2> */}
            {/* <p className="mt-1 max-w-[614px] font-['Roboto'] text-base font-normal leading-normal tracking-normal text-brandPrimary dark:brandPrimary-dark sm:text-[18px]">
              Try our price plan predictor to find the best plan for your organizations needs.
            </p> */}
          </div>

          <button 
            onClick={() => setIsOpen(true)}
            className="inline-block w-full sm:w-auto"
          >
            <PafButton
              variant="primary"
              size="medium"
              className="w-full min-w-[200px] justify-center"
              iconLeft={< MessageCircleQuestionMark className="h-5 w-5" />}
            >
              Try the Price Plan Predictor
            </PafButton>
          </button>
        </div>
      </Container>
    </section>
  );
}
