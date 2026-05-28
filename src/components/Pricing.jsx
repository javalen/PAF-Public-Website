import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
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
    ctaLabel: "Start a Free Trial",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required for trial",
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
    ctaLabel: "Start a Free Trial",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required for trial",
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
    ctaLabel: "Start a Free Trial",
    ctaHref: "/register",
    trialLabel: "Enjoy a 3-month free trial!",
    creditText: "No credit card required for trial",
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
    creditText: "No credit card required for trial",
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
  isExpanded = false,
  onToggleDetails,
}) {
  return (
    <article
      className={`relative rounded-[8px] border p-6 ${
        isMostPopular
          ? "bg-backgroundSecondary dark:bg-backgroundSecondary-dark"
          : "bg-backgroundPrimary dark:bg-backgroundPrimary-dark"
      } ${
        isMostPopular
          ? "border-brandPrimary dark:border-brandPrimary-dark"
          : "border-borderSecondary dark:border-borderSecondary-dark"
      }`}
    >
      {isMostPopular && (
        <div className="absolute right-4 top-0 rounded-b-[8px] border-b border-l border-r border-brandPrimary bg-backgroundPrimary px-2 py-1 dark:bg-backgroundPrimary-dark dark:border-brandPrimary-dark">
          <span className="inline-flex items-center gap-1 text-xs font-medium font-['Roboto'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
            <Sparkles className="h-3.5 w-3.5" />
            Most Popular
          </span>
        </div>
      )}

      <h3
        className={`font-['Funnel_Display'] text-[25px] font-medium leading-[1.2] tracking-normal text-textPrimary dark:text-textPrimary-dark sm:text-[32px] md:text-[34px] ${
          isMostPopular ? "mt-6 pr-32" : "mt-6"
        }`}
      >
        {name}
      </h3>
      <p className="mt-2 font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
        {description}
      </p>

      {price && (
        <>
          <p className="mt-4 flex items-baseline whitespace-nowrap font-['Funnel_Display'] leading-[1.1] tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
            <span className="text-[50px] font-extrabold">{price}</span>
            <span className="text-[18px] font-normal">/user/mo</span>
          </p>
          {priceNote && (
            <p className="mt-2 font-['Roboto'] text-sm font-medium leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              {priceNote}
            </p>
          )}
        </>
      )}

      <div className="mt-2 inline-flex rounded-[10px] border border-borderTagTrue bg-backgroundTagTrue px-3 py-1 sm:mt-4">
        <span className="font-['Funnel_Display'] text-base font-medium leading-normal tracking-normal text-textTagTrue">
          {trialLabel}
        </span>
      </div>

      <a href={ctaHref} className="mt-2 block w-full">
        <PafButton variant="primary" size="medium" iconRight={<ArrowRight />} className="w-full">
          {ctaLabel}
        </PafButton>
      </a>

      {creditText && (
        <p className="mt-2 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
          {creditText}
        </p>
      )}

      {/* Mobile only: compact expand/collapse control for plan details. */}
      <div className="mt-4 sm:hidden">
        <button
          type="button"
          onClick={onToggleDetails}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-2 font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
        >
          Expand for Plan Details
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Desktop: always show details. Mobile: show only when expanded. */}
      <ul className={`mt-4 space-y-2 ${isExpanded ? "block" : "hidden"} sm:mt-5 sm:mb-5 sm:block`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-brandSecondary dark:text-brandSecondary" />
            <span className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark sm:text-[17px]">
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
  isExpanded: PropTypes.bool,
  onToggleDetails: PropTypes.func,
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedPlans, setExpandedPlans] = useState({});

  // Expands or collapses plan details on mobile cards.
  const handleToggleDetails = (planName) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planName]: !prev[planName],
    }));
  };

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
      className="bg-backgroundPrimary py-[33px] dark:bg-backgroundPrimary-dark sm:py-24 lg:py-28"
    >
      <Container className="max-w-[1250px]">
        <p className="font-['Funnel_Display'] text-xs font-extrabold uppercase leading-normal tracking-normal text-brandSecondary dark:text-brandSecondary-dark sm:text-sm sm:tracking-[0.4px]">
          Pricing Options
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="pricing-title"
            className="font-['Funnel_Display'] text-[36px] font-light leading-[1.1] tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[42px] sm:leading-normal"
          >
            {/* Mobile-only line break to match compact heading layout. */}
            Flexible Plans for
            <br className="sm:hidden" /> Any Team
          </h2>

          <div className="flex w-full justify-end sm:w-auto">
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
        </div>

        <div className="mt-[14px] grid grid-cols-1 gap-6 sm:mt-8 md:grid-cols-2 xl:grid-cols-4">
          {visiblePlans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              isExpanded={Boolean(expandedPlans[plan.name])}
              onToggleDetails={() => handleToggleDetails(plan.name)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
