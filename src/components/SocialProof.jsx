import { Container } from "./Container";
import userImage from "../assets/user1.jpg";

export default function SocialProof() {
  return (
    <section className="bg-brandTertiary dark:bg-backgroundSecondary-dark py-14 sm:py-16" aria-label="Customer testimonial">
      <Container className="max-w-[1250px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
          {/* Quote text size control: adjust text-xl / sm:text-2xl here */}
          <p className="font-['Funnel_Display'] text-lg sm:text-2xl font-normal leading-normal tracking-normal text-textPrimary-dark">
            "Knowing what needs attention now and next lets me stay on top of everything and be proactive in managing our units."
          </p>

          <div className="flex items-center gap-4">
            <img
              src={userImage}
              alt="Paul Salinas"
              className="h-[100px] w-[100px] rounded-[20px] border-0 border-borderPrimary object-cover"
            />
            <div className="text-left">
              <p className="font-['Funnel_Display'] text-base font-normal leading-normal tracking-normal text-textPrimary-dark">
                Paul Salinas
              </p>
              <p className="font-['Funnel_Display'] text-base font-normal leading-normal tracking-normal text-textPrimary-dark">
                Atlas Properties
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}