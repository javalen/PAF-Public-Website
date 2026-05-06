import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "./Container";
import PafButton from "./ui/PafButton";

const audienceGroups = [
  {
    title: "Property Managers",
    description:
      "Centralized dashboard for managing maintenance tasks, vendors, and documentation across all systems.",
  },
  {
    title: "Maintenance Teams",
    description:
      "Simplify task tracking and service history with real-time schedules and maintenance logs.",
  },
  {
    title: "Owners & Stakeholders",
    description:
      "Access clear insights into property performance, costs, and risk without needing technical expertise.",
  },
  {
    title: "HOA Boards",
    description:
      "Get full visibility into system health, compliance, and costs without needing technical expertise.",
  },
  {
    title: "Contractors & Vendors",
    description:
      "Streamlined coordination with building teams, upcoming tasks, and asset information at your fingertips.",
  },
];

export default function WhoWeServe() {
  return (
    <section
      id="who-we-serve"
      aria-labelledby="who-we-serve-title"
      className="bg-backgroundPrimary py-20 dark:bg-backgroundPrimary-dark sm:py-24 lg:py-28"
    >
      <Container className="max-w-[1250px]">
        <div className="flex flex-col gap-10 lg:gap-8">
          <div className="max-w-[541px]">
            <p className="font-['Funnel_Display'] text-sm font-extrabold uppercase leading-normal tracking-[0.4px] text-brandSecondary dark:text-brandSecondary-dark">
              Who We Serve
            </p>
            <h2
              id="who-we-serve-title"
              className="mt-1 font-['Funnel_Display'] text-[38px] font-light leading-[1.15] tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[42px]"
            >
              Supporting the people who keep things running.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-14 xl:gap-x-20">
            <div className="space-y-7">
              {audienceGroups.slice(0, 2).map((group) => (
                <article key={group.title} className="space-y-2">
                  <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
                    {group.title}
                  </h3>
                  <p className="max-w-[363px] font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                    {group.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="space-y-7">
              {audienceGroups.slice(2, 4).map((group) => (
                <article key={group.title} className="space-y-2">
                  <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
                    {group.title}
                  </h3>
                  <p className="max-w-[363px] font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                    {group.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-col justify-between gap-8 lg:min-h-[166px]">
              <article className="space-y-2">
                <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
                  {audienceGroups[4].title}
                </h3>
                <p className="max-w-[363px] font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                  {audienceGroups[4].description}
                </p>
              </article>

              <Link to="/register" className="w-full sm:w-[216px]">
                <PafButton
                  variant="primary"
                  size="medium"
                  iconRight={<ArrowRight />}
                  className="w-full"
                >
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