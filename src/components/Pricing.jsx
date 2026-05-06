import { CheckCircle2, Sparkles } from "lucide-react";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

import { Container } from "./Container";
import PafButton from "./ui/PafButton";

const pricingPlans = [
  {
    name: "Starter",
    description:
      "Small teams can quickly start with the basics.",
    price: "$18",
    ctaLabel: "Try for Free",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required",
    features: [
      "Create up to 5 Facilities",
      "Manage Multiple Systems",
      "Maintenance Schedules",
      "Secure Compliance Documents",
    ],
  },
  {
    name: "Small Business",
    description:
      "Growing teams who need more essential tools and resources.",
    price: "$49",
    ctaLabel: "Try for Free",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required",
    features: [
      "Create up to 25 Facilities",
      "Manage Multiple Systems",
      "Maintenance Schedules",
      "Analytics and Reporting",
      "Secure Compliance Documents",
    ],
  },
  {
    name: "Premium",
    description:
      "Departments overseeing up to 50 facilities seeking more efficiency.",
    price: "$99",
    ctaLabel: "Try for Free",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required",
    features: [
      "Create up to 50 Facilities",
      "Manage Multiple Systems",
      "Maintenance Schedules",
      "Analytics and Reporting",
      "Automated Workflows",
      "Secure Compliance Documents",
      "Reserve Studies",
    ],
    isMostPopular: true,
  },
  {
    name: "Enterprise",
    description:
      "Multi-site organizations needing dedicated services and integrations and governance.",
    ctaLabel: "Request a Quote",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    features: [
      "Create unlimited facilities",
      "Manage Multiple Systems",
      "Maintenance Schedules",
      "Analytics and Reporting",
      "Automated Workflows",
      "Secure Compliance Documents",
      "Reserve Studies",
      "Tenant Portal",
      "Dedicated Backend Services",
    ],
  },
];

// Renders one pricing card in the new flat, comparison-style layout.
function PricingCard({
  name,
  description,
  price,
  priceNote,
  ctaLabel,
  ctaHref,
  trialLabel,
  creditText,
  features,
  isMostPopular = false,
}) {
  return (
    <article
      className={`relative rounded-2xl border p-5 ${
        isMostPopular
          ? "bg-backgroundSecondary dark:bg-backgroundSecondary-dark"
          : "bg-backgroundPrimary dark:bg-backgroundPrimary-dark"
      } ${
        isMostPopular
          ? "border-brandSecondary dark:border-brandSecondary"
          : "border-borderSecondary dark:border-borderSecondary-dark"
      }`}
    >
      {isMostPopular && (
        <div className="absolute right-4 top-0 rounded-b border-b border-l border-r  border-brandSecondary bg-backgroundPrimary px-2.5 py-1 dark:bg-backgroundPrimary-dark">
          <span className="inline-flex items-center gap-1 text-xs font-medium font-['Roboto'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
            <Sparkles className="h-3.5 w-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <h3
        className={`whitespace-nowrap font-['Funnel_Display'] text-[30px] font-medium leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark sm:text-[32px] md:text-[34px] ${
          isMostPopular ? "mt-6 pr-32" : ""
        }`}
      >
        {name}
      </h3>
      <p className="mt-2 min-h-[68px] font-['Roboto'] text-[17px] font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
        {description}
      </p>

      {price && (
        <>
          <p className="mt-2 flex items-baseline whitespace-nowrap font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
            <span className="text-[58px] font-bold">{price}</span>
            <span className="text-[18px] font-medium">/user/mo</span>
          </p>
          {priceNote && (
            <p className="mt-0.5 font-['Roboto'] text-[14px] font-medium leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              {priceNote}
            </p>
          )}
        </>
      )}

      <div className="mt-4 inline-flex rounded-full border border-borderTagTrue bg-backgroundTagTrue px-4 py-1">
        <span className="font-['Roboto'] text-[14px] font-medium leading-normal tracking-normal text-colorSuccess">
          {trialLabel}
        </span>
      </div>

      <a href={ctaHref} className="mt-5 inline-block">
        <PafButton variant="primary" size="medium">
          {ctaLabel}
        </PafButton>
      </a>

      {creditText && (
        <p className="mt-2 font-['Roboto'] text-[17px] font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
          {creditText}
        </p>
      )}

      <ul className="mt-5 mb-5 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brandSecondary dark:text-brandSecondary" />
            <span className="font-['Roboto'] text-[20px] font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark sm:text-[17px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string,
  priceNote: PropTypes.string,
  ctaLabel: PropTypes.string.isRequired,
  ctaHref: PropTypes.string.isRequired,
  trialLabel: PropTypes.string.isRequired,
  creditText: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMostPopular: PropTypes.bool,
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Converts the plan list into billing-cycle aware display values.
  const visiblePlans = useMemo(() => {
    return pricingPlans.map((plan) => {
      if (!plan.price) {
        return {
          ...plan,
          price: undefined,
          priceNote: undefined,
        };
      }

      const monthlyPrice = Number(plan.price.replace(/[^\d.]/g, ""));
      const isYearly = billingCycle === "yearly";
      const calculatedPrice = isYearly ? monthlyPrice * 0.8 : monthlyPrice;

      return {
        ...plan,
        price: `$${Math.round(calculatedPrice)}`,
          priceNote: isYearly ? "billed yearly" : undefined,
      };
    });
  }, [billingCycle]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-backgroundPrimary py-20 dark:bg-backgroundPrimary-dark sm:py-24 lg:py-28"
    >
      <Container className="max-w-[1250px]">
        <p className="font-['Funnel_Display'] text-sm font-extrabold uppercase leading-normal tracking-[0.4px] text-brandSecondary dark:text-brandSecondary-dark">
          Pricing Options
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="pricing-title"
            className="font-['Funnel_Display'] text-[38px] font-light leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[42px]"
          >
            Plans for Every Team
          </h2>

          <div className="inline-flex items-center justify-end gap-2 rounded-[15px] bg-brandPrimary p-[5px] dark:bg-brandPrimary">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
                aria-pressed={billingCycle === "monthly"}
              className={`rounded-[10px] px-3 py-1 font-['Funnel_Display'] text-xs font-semibold leading-normal tracking-normal transition-colors ${
                billingCycle === "monthly"
                  // ? "bg-colorHilight text-brandPrimary"
                  ? "bg-backgroundSecondary text-brandPrimary"
                  : "bg-transparent text-backgroundPrimary"
              }`}
            >
              Pay Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
                aria-pressed={billingCycle === "yearly"}
              className={`rounded-[10px] px-3 py-1 font-['Funnel_Display'] text-xs font-semibold leading-normal tracking-normal transition-colors ${
                billingCycle === "yearly"
                  // ? "bg-colorHilight text-brandPrimary"
                  ? "bg-backgroundSecondary text-brandPrimary"
                  : "bg-transparent text-backgroundPrimary"
              }`}
            >
              Pay Yearly ( Save up to 20% )
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visiblePlans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
