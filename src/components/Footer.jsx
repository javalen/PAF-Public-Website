import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Linkedin, MailCheck, Twitter } from "lucide-react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";
import Modal from "./ui/Modal";
import TermsContent from "./TermsContent";
import PrivacyContent from "./PrivacyContent";
import logoIconLight from "../assets/predictaf-icon-test.svg";
import logoIconDark from "../assets/predictaf-icon-test-dark.svg";
import PopUpDialog from "./PopUpDailog";
import { pbWebClient } from "../api/pocketbase";

export function Footer() {
  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

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
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex items-start">
            <img
              src={logoIconLight}
              alt="Predictaf icon"
              className="block h-auto w-[88px] dark:hidden"
            />
            <img
              src={logoIconDark}
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
              <a
                href="/#pricing"
                className="block font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                Request a Demo
              </a>
              <Link
                to="/support"
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
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="transition-colors hover:text-brandPrimary dark:hover:text-brandSecondary-dark"
              >
                <Twitter className="h-5 w-5" />
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
                iconLeft={< MailCheck className="w-5 h-5" />}
                
                className="w-full shrink-0 whitespace-nowrap sm:w-auto"
              >
                Subscribe
              </PafButton>

                       
            </form>
            <p className="mt-2 font-['Roboto'] text-xs font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
              Subscribe to for actionable tips to your inbox.
              {/* Unsubscribe anytime. */}
            </p>
          </div>


          <p className="mt-6 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
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
    </footer>
  );
}
