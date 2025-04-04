"use client";

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
import Logo from "../assets/paf.png";
import { Link } from "react-router-dom";

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

// function MobileNavLink(props) {
//   return (
//     <PopoverButton
//       as={Link}
//       className="block text-base leading-7 tracking-tight text-gray-700"
//       {...props}
//     />
//   );
// }

function MobileNavLink({ href, children, onClick }) {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");
  const isHash = href.startsWith("#") || href.includes("/#");

  const handleClick = (e) => {
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

export function Header() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-4">
          <div className="relative z-10 flex items-center gap-16">
            <a href="/" aria-label="Home">
              <img src={Logo} className="h-20 w-auto" />
            </a>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
              <a
                href="https://www.predictiveaf.com/PredictiveAF_Intro_Deck.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
              >
                Download Overview
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open, close }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
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
                          <div className="space-y-4">
                            <MobileNavLink href="/#features" onClick={close}>
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#pricing" onClick={close}>
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink href="/#faqs" onClick={close}>
                              FAQs
                            </MobileNavLink>
                            <MobileNavLink href="/#about" onClick={close}>
                              About
                            </MobileNavLink>
                            <MobileNavLink href="/quickstart">
                              Quick Start
                            </MobileNavLink>
                            <MobileNavLink href="https://www.youtube.com/@PredictiveAF">
                              PAF on YouTube
                            </MobileNavLink>
                            <MobileNavLink href="/support">
                              Support
                            </MobileNavLink>
                            <MobileNavLink href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7">
                              Request a Demo
                            </MobileNavLink>
                            <MobileNavLink href="https://www.predictiveaf.com/PredictiveAF_Intro_Deck.pdf">
                              Download Overview
                            </MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Button href="/register" variant="outline">
                              Register
                            </Button>
                            {/* <Button href="#">Download the app</Button> */}
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <Button
              href="/register"
              variant="outline"
              className="hidden lg:block"
            >
              Register
            </Button>
            {/* <Button href="#" className="hidden lg:block">
              Download
            </Button> */}
          </div>
        </Container>
      </nav>
    </header>
  );
}
