import { Blocks, BriefcaseBusiness, MapPin } from "lucide-react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import TextHighlight from "./ui/TextHighlight";
import StatusTag from "./ui/StatusTag";
import linkedinIcon from "../assets/linkedin.svg";

const OPEN_ROLES = [

  {
    title: "Customer Success Manager",
      location: "Remote (US)",
    type: "Coming Soon",
    summary:
      "Partner with clients to drive adoption, improve workflows, and turn product insights into operational wins.",
  },
  {
    title: "Senior Full-Stack Engineer",
    location: "Remote (US)",
    type: "Coming Soon",
    summary:
      "Build and scale property operations workflows across web and mobile with React and modern API tooling.",
  },
  {
    title: "Product Designer",
      location: "Remote (US)",
    type: "Coming Soon",
    summary:
      "Design clear, accessible interfaces that help facilities teams move from reactive to predictive maintenance.",
  },
];

const CORE_VALUES = [
  "Customer outcomes over feature volume",
  "Clear communication and fast feedback loops",
  "Ownership from idea to shipped result",
  "Long-term thinking with practical execution",
];

export default function CareersPageContent() {
  return (
    <main className="bg-backgroundPrimary dark:bg-backgroundPrimary-dark">
      <section className="border-b border-borderPrimary dark:border-borderPrimary-dark py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-4 py-2 text-sm font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              < Blocks className="h-4 w-4 text-brandSecondary dark:text-brandSecondary-dark" />
              Careers at Predictaf
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
              Build the future of
              <br className="hidden sm:block" />
              facility operations
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              We are building tools that help teams prevent costly failures before they happen. Follow us on LinkedIn <TextHighlight>to get updates on our recruitment schedule.</TextHighlight>
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* <a href="mailto:careers@predictaf.com?subject=Career%20Inquiry"> */}
              <a href="https://www.linkedin.com/company/predictaf/">
                <PafButton
                  variant="primary"
                  size="large"
                  iconLeft={(
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 bg-current transition-colors"
                      style={{
                        WebkitMaskImage: `url(${linkedinIcon})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskImage: `url(${linkedinIcon})`,
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                      }}
                    />
                  )}
    s
                >
                  Follow Us
                </PafButton>
              </a>
              {/* <a href="mailto:careers@predictaf.com?subject=Career%20Inquiry">
                  iconLeft={<img src={linkedinIcon} alt="" className="h-4 w-4 brightness-0 invert" aria-hidden="true" />}
                    Contact Recruiting
                </PafButton>
              </a> */}


              {/* <Link to="/support">
                <PafButton variant="secondary" size="large">
                  Contact Recruiting
                </PafButton>
              </Link> */}

            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
            <div className="rounded-2xl border border-borderPrimary dark:border-borderPrimary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-normal font-['Funnel_Display'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                How We Work
              </h2>
              <p className="mt-4 text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                We stay close to customers, ship in small batches, and optimize for reliability. Everyone contributes to product direction and takes ownership of measurable outcomes.
              </p>

              <ul className="mt-6 space-y-3">
                {CORE_VALUES.map((value) => (
                  <li
                    key={value}
                    className="flex items-start gap-3 text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brandSecondary dark:bg-brandSecondary-dark" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-borderPrimary dark:border-borderPrimary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-brandSecondary dark:text-brandSecondary-dark" />
                <h2 className="text-2xl sm:text-3xl font-normal font-['Funnel_Display'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                  Career Paths
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {OPEN_ROLES.map((role) => (
                  <article
                    key={role.title}
                    className="rounded-xl border border-borderSecondary dark:border-borderSecondary-dark p-5"
                  >
                    <h3 className="text-xl font-normal font-['Funnel_Display'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                      {role.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {role.location}
                      </span>
                      <StatusTag variant="neutral" size="xs" showIndicator={false}>
                        {role.type}
                      </StatusTag>
                    </div>
                    <p className="mt-3 text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                      {role.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}