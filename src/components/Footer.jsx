import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import Modal from "./ui/Modal";
import TermsContent from "./TermsContent";
import PrivacyContent from "./PrivacyContent";

import iconLight from "../assets/predictaf-icon.svg";
import iconDark from "../assets/predictaf-icon-dark.svg";

import logoLight from "../assets/predictaf-logo.svg";
import logoDark from "../assets/predictaf-logo-dark.svg";

import linkedinIcon from "../assets/linkedin.svg";
import facebookIcon from "../assets/facebook.svg";
import youtubeIcon from "../assets/youtube.svg";
import xIcon from "../assets/x.svg";
import PopUpDialog from "./PopUpDailog";
import SchedulingModal from "./scheduling/SchedulingModal";
import { pbWebClient } from "../api/pocketbase";

const SCHEDULE_DEMO_URL =
  import.meta.env.VITE_SCHEDULE_DEMO_URL ||
  "https://calendar.app.google/p3Bi6LnTTzgfpo8M7";

export function Footer() {
  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.email?.value;
    if (!email) return;

    try {
      const data = {
        email,
        joined_date: new Date().toLocaleDateString(),
      };

      await pbWebClient.collection("mail_list").create(data);
      setOpen(true);
      e.currentTarget.reset();
    } catch (error) {
      console.log(`Error subscribing ${error}`);
    }
  };

  return (
    <footer className="border-t border-borderPrimary dark:border-borderPrimary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark">
      <Container className="py-14 sm:py-16 lg:py-20">
        {/* MOBILE FOOTER (matches mobile mockup, hidden on sm+) */}
        <div className="sm:hidden">
          <div className="space-y-6 pb-8">
            <div className="flex items-center">
              <img
                src={logoLight}
                alt="Predictaf"
                className="block h-auto w-[170px] dark:hidden"
              />
              <img
                src={logoDark}
                alt="Predictaf"
                className="hidden h-auto w-[170px] dark:block"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-['Funnel_Display'] text-[18px] font-medium leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark">
                Subscribe to the newsletter
              </h3>
              <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                Our newsletter delivers powerful insights and practical
                strategies that drive results.
              </p>
              <form className="space-y-3" onSubmit={onSubmit}>
                <input
                  name="email"
                  type="email"
                  aria-label="Email address"
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder-textTertiary dark:placeholder-textTertiary focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brandPrimary dark:focus:ring-brandPrimary"
                />
                <PafButton
                  type="submit"
                  variant="primary"
                  size="large"
                  className="w-full"
                  iconLeft={<MailCheck className="w-5 h-5" />}
                >
                  Subscribe
                </PafButton>
          
              </form>
            </div>

            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setTermsOpen(true)}
                className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark"
              >
                Terms
              </button>
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(true)}
                className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark"
              >
                Request a Demo
              </button>
              <Link
                to="/careers"
                className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark"
              >
                Careers
              </Link>
            </div>

            <div className="flex items-center gap-4 text-textSecondary dark:text-textSecondary-dark">
              <a
                href="https://www.linkedin.com/company/predictaf/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/predictaf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
              </a>

              {/* x off for now <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <img src={xIcon} alt="X" className="h-6 w-6" />
              </a> */}

              <a
                href="https://www.youtube.com/@Predictaf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Youtube"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <img src={youtubeIcon} alt="Youtube" className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div className="border-t border-borderPrimary dark:border-borderPrimary-dark pt-4">
            <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              &copy; {new Date().getFullYear()} Predictaf, Inc. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* DESKTOP/TABLET FOOTER (existing layout, hidden on mobile) */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="flex items-start">
              <img
                src={iconLight}
                alt="Predictaf icon"
                className="block h-auto w-[88px] dark:hidden"
              />
              <img
                src={iconDark}
                alt="Predictaf icon"
                className="hidden h-auto w-[88px] dark:block"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                Legal
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setTermsOpen(true)}
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark text-left"
                >
                  Terms
                </button>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark text-left"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                Contact
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  Schedule a Demo
                </button>
                <Link
                  to="/careers"
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  Careers
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-['Funnel_Display'] text-xl font-medium leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                Mobile App
              </h3>
              <div className="space-y-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  Download for Android
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  Download for iOS
                </a>
              </div>

              <div className="flex items-center gap-3 text-textSecondary dark:text-textSecondary-dark">
                <a
                  href="https://www.linkedin.com/company/predictaf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  <img src={linkedinIcon} alt="LinkedIn" className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/predictaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  <img src={facebookIcon} alt="Facebook" className="h-5 w-5" />
                </a>

                {/* x off for now <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  <img src={xIcon} alt="X" className="h-5 w-5" />
                </a> */}

                <a
                  href="https://www.youtube.com/@Predictaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Youtube"
                  className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
                >
                  <img src={youtubeIcon} alt="Youtube" className="h-7 w-7" />
                </a>

              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center border-t border-borderPrimary dark:border-borderPrimary-dark pt-8 md:mt-12 md:flex-row-reverse md:justify-between md:pt-6">
            <div className="w-full max-w-[440px]">
              <form
                className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
                onSubmit={onSubmit}
              >
                <input
                  name="email"
                  type="email"
                  aria-label="Email address"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2 text-sm font-['Roboto'] font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder-textTertiary dark:placeholder-textTertiary focus:border-transparent focus:outline-none focus:ring-1 focus:ring-brandPrimary dark:focus:ring-brandPrimary sm:max-w-[270px]"
                />
                <PafButton
                  type="submit"
                  variant="primary"
                  size="medium"
                  iconLeft={<MailCheck className="w-5 h-5" />}
                  className="w-full shrink-0 whitespace-nowrap sm:w-auto"
                >
                  Subscribe
                </PafButton>
              </form>
              <p className="mt-2 font-['Roboto'] text-xs font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                Subscribe to our newsletter for powerful insights and
                strategies.
                {/* Unsubscribe anytime. */}
              </p>
            </div>

            <p className="mt-6 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark md:mt-0">
              &copy;  {new Date().getFullYear()} Predictaf, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
      {/* Terms & Conditions modal */}
      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms & Conditions"
        size="xl"
        showHeader
        showCloseButton
      >
        <TermsContent />
      </Modal>

      {/* Privacy Policy modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
        size="xl"
        showHeader
        showCloseButton
      >
        <PrivacyContent />
      </Modal>

      <PopUpDialog
        open={open}
        setOpen={setOpen}
        title="Success!!"
        text="Thank you for joining"
        buttonLbl={"Close"}
      />

      <SchedulingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        iframeUrl={SCHEDULE_DEMO_URL}
        title="Schedule a Demo"
        description="Book a quick walkthrough with our team without leaving this page."
        onOpen={() => {
          // Optional analytics hook for modal opens.
          console.log("SchedulingModal", "opened from footer");
        }}
        onBookingStart={() => {
          // Optional analytics hook for first booking interaction.
          console.log("SchedulingModal", "booking intent started from footer");
        }}
      />
    </footer>
  );
}
