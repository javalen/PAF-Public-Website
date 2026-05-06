"use client";

import { Link } from "react-router-dom";
import PafButton from "./ui/PafButton";
import DarkModeToggle from "./ui/DarkModeToggle";
// import logoLight from "../assets/predictaf-logo.svg";
// import logoDark from "../assets/predictaf-logo-dark.svg";
import logoLight from "../assets/predictaf-logo-test.svg";
import logoDark from "../assets/predictaf-logo-dark-test.svg";

const primaryLinks = [
  { label: "About", href: "/#hero" },
  { label: "Who We Serve", href: "/#who-we-serve" },
  { label: "Key Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Mission", href: "/#mission" },
  {
    label: "Schedule a Demo",
    href: "https://calendar.app.google/p3Bi6LnTTzgfpo8M7",
    external: true,
  },
];

function renderNavLinks(withActions) {
  if (!withActions) {
    return (
      <div className="flex items-center gap-8 whitespace-nowrap">
        {primaryLinks.map((link) => {
          const isHash = link.href && (link.href.startsWith("#") || link.href.includes("/#"));
          const isExternal = link.external || isHash;

          return isExternal ? (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-base font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark hover:text-brandSecondary dark:hover:text-brandSecondary-dark"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              className="text-base font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark hover:text-brandSecondary dark:hover:text-brandSecondary-dark"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 whitespace-nowrap">
      <div className="flex items-center">
        <Link to="/" className="inline-flex items-center gap-2">
          {/* Full logo with text for desktop */}
          <img src={logoLight} alt="Predictaf" className="h-auto w-[165px] object-contain dark:hidden" draggable={false} />
          <img src={logoDark} alt="Predictaf" className="hidden h-auto w-[165px] object-contain dark:block" draggable={false} />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-8">
        {primaryLinks.map((link) => {
          const isHash = link.href && (link.href.startsWith("#") || link.href.includes("/#"));
          const isExternal = link.external || isHash;

          return isExternal ? (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-base font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark hover:text-brandSecondary dark:hover:text-brandSecondary-dark"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              className="text-base font-normal font-['Funnel_Display'] leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark hover:text-brandSecondary dark:hover:text-brandSecondary-dark"
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-4">
        <DarkModeToggle />

        <Link to="/register">
          <PafButton variant="primary" size="small">
            Sign Up
          </PafButton>
        </Link>

        <Link to="/login">
          <PafButton variant="secondary" size="small">
            Log In
          </PafButton>
        </Link>
      </div>
    </div>
  );
}

export function NavLinks() {
  return renderNavLinks(true);
}

export function FooterNavLinks() {
  return renderNavLinks(false);
}
