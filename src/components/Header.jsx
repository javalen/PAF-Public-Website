"use client";

import { useEffect, useState } from "react";

import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "./Button";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { Link } from "react-router-dom";
// import iconLight from "../assets/predictaf-icon.svg";
// import iconDark from "../assets/predictaf-icon-dark.svg";
import iconLight from "../assets/predictaf-icon-test.svg";
import iconDark from "../assets/predictaf-icon-test-dark.svg";

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
        d="M17 14l-5-5-5 5"
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

function MobileNavLink({ href, children, onClick }) {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");
  const isHash = href.startsWith("#") || href.includes("/#");

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
        className="block text-base leading-7 tracking-tight text-gray-700"
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
        className="block text-base leading-7 tracking-tight text-gray-700"
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
      className="block text-base leading-7 tracking-tight text-gray-700"
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
        <Container className="relative z-50 flex justify-between py-4">
          {/* Mobile: icon only */}
          <div className="flex items-center lg:hidden">
            <Link to="/" className="inline-flex items-center">
              <img src={iconLight} alt="Predictaf" className="h-[45px] w-auto object-contain dark:hidden" draggable={false} />
              <img src={iconDark} alt="Predictaf" className="hidden h-[45px] w-auto object-contain dark:block" draggable={false} />
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
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
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
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
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
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-8">
                            <MobileNavLink href="/#hero" onClick={close}>
                              About
                            </MobileNavLink>

                            <MobileNavLink href="/#who-we-serve" onClick={close}>
                              Who We Serve
                            </MobileNavLink>

                            <MobileNavLink href="/#features" onClick={close}>
                              Key Features
                            </MobileNavLink>

                            <MobileNavLink href="/#pricing" onClick={close}>
                              Pricing
                            </MobileNavLink>

                            <MobileNavLink href="/#mission" onClick={close}>
                              Mission
                            </MobileNavLink>

                            <MobileNavLink href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7" onClick={close}>
                              Schedule a Demo
                            </MobileNavLink>

                            <MobileNavLink
                              href="https://www.youtube.com/@PredictiveAF"
                              onClick={close}
                            >
                              PAF on YouTube
                            </MobileNavLink>

                            <MobileNavLink href="/support" onClick={close}>
                              Support
                            </MobileNavLink>

                            <MobileNavLink
                              href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7"
                              onClick={close}
                            >
                              Request a Demo
                            </MobileNavLink>

                            <MobileNavLink
                              href="https://www.predictiveaf.com/PredictiveAF_Intro_Deck.pdf"
                              onClick={close}
                            >
                              Download Overview
                            </MobileNavLink>

                            <MobileNavLink href="/news-letter" onClick={close}>
                              Newsletters
                            </MobileNavLink>
                          </div>

                          <div className="mt-8 flex flex-col gap-4">
                            <Button href="/register" variant="outline">
                              Register
                            </Button>
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
