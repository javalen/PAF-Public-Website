import { Blocks, BriefcaseBusiness, MapPin } from "lucide-react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import TextHighlight from "./ui/TextHighlight";
import StatusTag from "./ui/StatusTag";

// LI icon needs to be imported as svg this way to work in dark mode
const LinkedinIcon = () => (
  <svg
    viewBox="0 0 21 20"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M0 1.43267C0 0.641641 0.659722 0 1.47357 0H18.5935C19.4074 0 20.0671 0.641644 20.0671 1.43268V18.5673C20.0671 19.3586 19.4074 20 18.5935 20L1.47357 20C0.659722 20 0 19.3586 0 18.5673V1.43267ZM6.19996 16.7421V7.71095H3.18811V16.7421H6.19996ZM4.69402 6.4779C5.74432 6.4779 6.39804 5.78441 6.39804 4.91775C6.37846 4.03159 5.74432 3.35734 4.71395 3.35734C3.68368 3.35734 3.01007 4.03159 3.01007 4.91775C3.01007 5.78441 3.66365 6.4779 4.67439 6.4779H4.69402ZM10.8505 16.7421V11.6987C10.8505 11.4288 10.8701 11.1592 10.9496 10.9662C11.1674 10.4269 11.6629 9.86838 12.495 9.86838C13.5848 9.86838 14.0208 10.6966 14.0208 11.9106V16.7421H17.0324V11.5638C17.0324 8.7898 15.5465 7.49903 13.5649 7.49903C11.9672 7.49903 11.2509 8.37421 10.8506 8.98959V9.0207H10.8305C10.8371 9.0104 10.8438 9.00003 10.8506 8.98959V7.71095H7.8388C7.87832 8.55837 7.8388 16.7421 7.8388 16.7421H10.8505Z" />
  </svg>
);



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
                {/* <PafButton
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

                >
                  Follow Us
                </PafButton> */}
                <PafButton
                    type="button"
                    variant="primary"
                    size="large"
                    iconLeft={< LinkedinIcon/>}
                  // iconLeft={<img src={linkedinIcon} alt="" className="h-4 w-4 brightness-0 invert" aria-hidden="true" />}
                  // iconLeft={<img src={linkedinIcon} alt="" className="h-4 w-4" aria-hidden="true" />}
                  >
                    Follow 
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