"use client";

import { useEffect, useState } from "react";

import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import PafButton from "./ui/PafButton";
import DarkModeToggle from "./ui/DarkModeToggle";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { Link } from "react-router-dom";


import iconLight from "../assets/predictaf-icon.svg";
import iconDark from "../assets/predictaf-icon-dark.svg";
import logoLight from "../assets/predictaf-logo.svg";
import logoDark from "../assets/predictaf-logo-dark.svg";


import appStoreBadge from "../assets/appStore.svg";
import googlePlayBadge from "../assets/googlePlay.svg";
import { ArrowRight } from "lucide-react";

const ANDROID_APP_URL =
  "https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share";
const IOS_APP_URL = "https://apps.apple.com/us/app/predictaf-mobile/id6738309158";

/* -------------------- ICONS -------------------- */

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 8l4 4 4-4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------- HELPERS -------------------- */

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function DesktopLink({ to, href, children }) {
  const cls =
    "relative -mx-2 -my-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 hover:bg-gray-200/50";
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  );
}

function Divider() {
  return <span className="mx-2 text-gray-300 opacity-60 select-none">|</span>;
}

function MobileNavLink({ href, children, onClick, className }) {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");
  const isHash = href.startsWith("#") || href.includes("/#");
  const linkClasses = cx(
    "block text-lg font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark",
    className,
  );

  const handleClick = () => {
    if (onClick) onClick(); // close menu
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <PopoverButton
      as={Link}
      to={href}
      onClick={handleClick}
      className={linkClasses}
    >
      {children}
    </PopoverButton>
  );
}

/* -------------------- RESOURCES DROPDOWN (DESKTOP) -------------------- */

function ResourcesMenu() {
  return (
    <Popover className="relative hidden lg:block">
      {({ open, close }) => (
        <>
          <PopoverButton
            className={cx(
              "relative -mx-2 -my-2 inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 hover:bg-gray-200/50",
              open ? "text-gray-900" : "",
            )}
          >
            Resources
            <ChevronDownIcon
              className={cx(
                "h-4 w-4 stroke-current transition-transform",
                open ? "rotate-180" : "",
              )}
            />
          </PopoverButton>

          <AnimatePresence initial={false}>
            {open && (
              <>
                <PopoverBackdrop
                  static
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-transparent"
                  onClick={() => close()}
                />

                <PopoverPanel
                  static
                  as={motion.div}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 top-full z-50 mt-2 w-[320px] origin-top-left rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-900/10"
                >
                  <div className="grid gap-1">
                    {/* Keep primary nav in NavLinks; use this for the “extras” */}
                    <a
                      href="https://www.predictiveaf.com/PredictiveAF_Intro_Deck.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div className="font-semibold">Download Overview</div>
                      <div className="text-xs text-gray-500">
                        Intro deck PDF
                      </div>
                    </a>

                    <a
                      href="/news-letter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div className="font-semibold">Newsletters</div>
                      <div className="text-xs text-gray-500">
                        Predictaf Insider archive
                      </div>
                    </a>

                    <div className="my-1 h-px bg-gray-100" />

                    <Link
                      to="/quickstart"
                      className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div className="font-semibold">Quick Start</div>
                      <div className="text-xs text-gray-500">
                        Get up and running fast
                      </div>
                    </Link>

                    <a
                      href="https://www.youtube.com/@PredictiveAF"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div className="font-semibold">Predictaf on YouTube</div>
                      <div className="text-xs text-gray-500">
                        Demos & walkthroughs
                      </div>
                    </a>

                    <Link
                      to="/support"
                      className="rounded-xl px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => close()}
                    >
                      <div className="font-semibold">Support</div>
                      <div className="text-xs text-gray-500">
                        Help center & contact
                      </div>
                    </Link>
                  </div>
                </PopoverPanel>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}

/* -------------------- HEADER -------------------- */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-[60] border-b border-borderPrimary dark:border-borderPrimary-dark bg-backgroundPrimary dark:bg-backgroundPrimary-dark transition-shadow duration-300",
        isScrolled
          // ? "shadow-[0_4px_14px_rgba(20,20,20,0.08)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
          // : "shadow-none",
          ? "bg-backgroundSecondary dark:bg-backgroundSecondary-dark"
          : "bg-backgroundPrimary",
      )}
    >
      <nav>
        <Container className="relative z-50 flex items-center justify-between py-4">
          {/* Mobile: full logo pre-scroll, icon-only on sticky state */}
          <div className="flex items-center lg:hidden">
            <Link to="/" className="inline-flex items-center">
              {isScrolled ? (
                <>
                 
                  <img
                    src={iconLight}
                    alt="Predictaf"
                    className="h-[50px] w-auto object-contain dark:hidden"
                    draggable={false}
                  />
                  <img
                    src={iconDark}
                    alt="Predictaf"
                    className="hidden h-[50px] w-auto object-contain dark:block"
                    draggable={false}
                  />
                  {/* <img
                    src={logoLight}
                    alt="Predictaf"
                    className="h-[38px] w-auto object-contain dark:hidden"
                    draggable={false}
                  />
                  <img
                    src={logoDark}
                    alt="Predictaf"
                    className="hidden h-[38px] w-auto object-contain dark:block"
                    draggable={false}
                  /> */}
                </>
              ) : (
                <>
                  <img
                    src={logoLight}
                    alt="Predictaf"
                    className="h-[38px] w-auto object-contain dark:hidden"
                    draggable={false}
                  />
                  <img
                    src={logoDark}
                    alt="Predictaf"
                    className="hidden h-[38px] w-auto object-contain dark:block"
                    draggable={false}
                  />
                </>
              )}
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center gap-1 whitespace-nowrap">
            <NavLinks />

            {/* <Divider /> */}

            {/* <DesktopLink to="/pricing">Pricing Wizard</DesktopLink> */}

            {/* <Divider /> */}

            {/* <ResourcesMenu /> */}
          </div>

          <div className="flex items-center gap-6">
            {/* Mobile menu */}
            <Popover className="lg:hidden">
              {({ open, close }) => (
                <>
                  <div className="ml-auto flex items-center gap-2">
                    <DarkModeToggle />

                    {isScrolled && (
                      <Link to="/register" className="inline-flex">
                        <PafButton variant="primary" size="small">
                          Sign Up
                        </PafButton>
                      </Link>
                    )}

                    <PopoverButton
                      className="relative z-10 -mr-1 inline-flex items-center rounded-lg p-2 stroke-gray-900 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none dark:stroke-gray-100 dark:hover:bg-white/10 dark:hover:stroke-white"
                      aria-label="Toggle site navigation"
                    >
                      {open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )}
                    </PopoverButton>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-transparent"
                        />

                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute left-0 right-0 top-full z-0 origin-top overflow-hidden rounded-b-2xl bg-backgroundPrimary dark:bg-backgroundPrimary-dark pt-0 shadow-2xl shadow-gray-900/20 h-[calc(100dvh-78px)] flex flex-col"
                        >
                          {/* Mobile menu sheet: menu links Funnel Display, no logo */}
                          <div className="h-full flex flex-col border-t border-borderPrimary dark:border-borderPrimary-dark bg-backgroundPrimary dark:bg-backgroundPrimary-dark">
                            <div className="flex-1 overflow-y-auto divide-y divide-borderPrimary dark:divide-borderPrimary-dark">
                              <div className="px-6 py-3.5">
                                <MobileNavLink href="/#hero" onClick={close} className="font-['Funnel_Display'] leading-normal tracking-normal text-lg">
                                  About
                                </MobileNavLink>
                              </div>
                              <div className="px-6 py-3.5">
                                <MobileNavLink href="/#who-we-serve" onClick={close} className="font-['Funnel_Display'] leading-normal tracking-normal text-lg">
                                  Who We Serve
                                </MobileNavLink>
                              </div>
                              <div className="px-6 py-3.5">
                                <MobileNavLink href="/#features" onClick={close} className="font-['Funnel_Display'] leading-normal tracking-normal text-lg">
                                  Key Features
                                </MobileNavLink>
                              </div>
                              <div className="px-6 py-3.5">
                                <MobileNavLink href="/#pricing" onClick={close} className="font-['Funnel_Display'] leading-normal tracking-normal text-lg">
                                  Pricing
                                </MobileNavLink>
                              </div>
                              <div className="px-6 py-3.5">
                                <MobileNavLink
                                  href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7"
                                  onClick={close}
                                  className="font-['Funnel_Display'] leading-normal tracking-normal text-lg"
                                >
                                  Schedule a Demo
                                </MobileNavLink>
                              </div>
                            </div>

                            <div className="mt-auto shrink-0 bg-brandPrimary px-4 pb-5 pt-9 dark:bg-brandPrimary">
                              <div className="flex flex-col gap-5">
                                <Link to="/register" onClick={close} className="w-full">
                                  <PafButton
                                    variant="emphasis"
                                    size="large"
                                    className="w-full"
                                    iconRight={< ArrowRight />}
                                  >
                                    Start a Free Trial
                                  </PafButton>
                                </Link>

                                {/* <Link to="/login" onClick={close} className="w-full"> */}
                                {/* <Link to="https://west.predictaf.com/" onClick={close} className="w-full">
                                  <PafButton
                                    variant="secondary"
                                    size="large"
                                    className="w-full border-0 bg-backgroundPrimary text-brandPrimary hover:bg-backgroundPrimary/95 dark:bg-backgroundPrimary-dark dark:text-brandPrimary-dark"
                                  >
                                    Log In
                                  </PafButton>
                                </Link> */}


                                <a
                                  // href="https://west.predictaf.com/"
                                  href="/login" 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={close}
                                  className="w-full"
                                >
                                  <PafButton
                                    variant="secondary"
                                    size="large"
                                    className="w-full border-0 bg-backgroundPrimary text-brandPrimary hover:bg-backgroundPrimary/95 dark:bg-backgroundPrimary-dark dark:text-brandPrimary-dark"
                                  >
                                    Log In
                                  </PafButton>
                                </a>

                                <div className="flex items-center justify-center gap-3 p-4">
                                  <a
                                    href={ANDROID_APP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="inline-flex"
                                  >
                                    <img
                                      src={googlePlayBadge}
                                      alt="Get it on Google Play"
                                      className="h-[40px] w-auto"
                                    />
                                  </a>
                                  <a
                                    href={IOS_APP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={close}
                                    className="inline-flex"
                                  >
                                    <img
                                      src={appStoreBadge}
                                      alt="Download on the App Store"
                                      className="h-[40px] w-auto"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>

          </div>
        </Container>
      </nav>
    </header>
  );
}
