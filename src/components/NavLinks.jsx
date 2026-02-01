"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  { label: "Features", href: "/#features" },
  { label: "FAQs", href: "/#faqs" },
  { label: "About", href: "/#about" },
  { label: "Quick Start", href: "/quickstart" },
  {
    label: "Predictaf on YouTube",
    href: "https://www.youtube.com/@PredictiveAF",
    external: true,
  },
  { label: "Support", href: "/support" },
  {
    label: "Request a Demo",
    href: "https://calendar.app.google/p3Bi6LnTTzgfpo8M7",
    external: true,
  },
];

export function NavLinks() {
  return (
    <div className="flex items-center whitespace-nowrap">
      {links.map((l, i) => (
        <div key={l.label} className="flex items-center">
          {l.external ? (
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              {l.label}
            </a>
          ) : (
            <Link
              to={l.href}
              className="px-2 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              {l.label}
            </Link>
          )}

          {i < links.length - 1 && (
            <span className="mx-1 text-gray-300 opacity-60 select-none">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
