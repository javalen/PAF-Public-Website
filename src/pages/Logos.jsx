import React from "react";
import { Link } from "react-router-dom";

import logoColor from "../assets/predictaf-logo.svg";
import logoBw from "../assets/predictaf-logo-dark.svg";
import iconColor from "../assets/predictaf-icon.svg";
import iconBw from "../assets/predictaf-icon-dark.svg";

const logoDownloads = [
  {
    id: "logo-color-svg",
    title: "Predictaf Wordmark (Color, SVG)",
    type: "Color",
    format: "SVG",
    category: "Primary Logo",
    src: logoColor,
    fileName: "predictaf-logo-color.svg",
  },
  {
    id: "logo-bw-svg",
    title: "Predictaf Wordmark (Black/White, SVG)",
    type: "Black & White",
    format: "SVG",
    category: "Primary Logo",
    src: logoBw,
    fileName: "predictaf-logo-bw.svg",
  },
  {
    id: "icon-color-svg",
    title: "Predictaf Icon (Color, SVG)",
    type: "Color",
    format: "SVG",
    category: "Badge / Icon",
    src: iconColor,
    fileName: "predictaf-icon-color.svg",
  },
  {
    id: "icon-bw-svg",
    title: "Predictaf Icon (Black/White, SVG)",
    type: "Black & White",
    format: "SVG",
    category: "Badge / Icon",
    src: iconBw,
    fileName: "predictaf-icon-bw.svg",
  },
  {
    id: "logo-color-png",
    title: "Predictaf Wordmark (Color, PNG)",
    type: "Color",
    format: "PNG",
    category: "Primary Logo",
    src: logoColor,
    fileName: "predictaf-logo-color.png",
    note: "Placeholder download using SVG preview until PNG file is added.",
  },
  {
    id: "badge-png",
    title: "Predictaf Badge (PNG)",
    type: "Badge",
    format: "PNG",
    category: "Badge / Icon",
    src: iconColor,
    fileName: "predictaf-badge.png",
    note: "Placeholder download using SVG preview until PNG file is added.",
  },
];

function DownloadCard({ item }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-28 w-full rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
        <img
          src={item.src}
          alt={item.title}
          className="max-h-20 max-w-[85%] object-contain"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
        <div className="text-xs text-slate-500">
          <span className="inline-block rounded-full bg-slate-100 px-2 py-1 mr-2">
            {item.category}
          </span>
          <span className="inline-block rounded-full bg-slate-100 px-2 py-1 mr-2">
            {item.type}
          </span>
          <span className="inline-block rounded-full bg-slate-100 px-2 py-1">
            {item.format}
          </span>
        </div>

        {item.note && <p className="text-xs text-amber-700">{item.note}</p>}

        <a
          href={item.src}
          download={item.fileName}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
        >
          Download
        </a>
      </div>
    </article>
  );
}

function DoDontCard({ title, points, tone }) {
  const colorClasses =
    tone === "do"
      ? "border-emerald-200 bg-emerald-50"
      : "border-rose-200 bg-rose-50";

  return (
    <div className={`rounded-2xl border p-5 ${colorClasses}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function FontSample({ name, usage, sample, links }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <p className="text-sm text-slate-600 mt-1">{usage}</p>
      <p className="mt-4 text-2xl text-slate-900">{sample}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Logos() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline"
          >
            Back to Home
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
            Predictaf Brand Guide & Logo Share
          </h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Use this page to download approved logo files, review logo usage
            rules, and access official brand typography references.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Logo Downloads
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Available formats include color and black/white versions, SVG assets,
            and PNG placeholders for quick sharing.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {logoDownloads.map((item) => (
              <DownloadCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Logo Usage Guidelines
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <DoDontCard
              title="Do"
              tone="do"
              points={[
                "Use official files from this page only.",
                "Keep clear space around the logo equal to icon height.",
                "Use full-color logo on light backgrounds.",
                "Use black/white logo where color contrast requires it.",
                "Scale proportionally without distortion.",
              ]}
            />

            <DoDontCard
              title="Don't"
              tone="dont"
              points={[
                "Do not stretch, squash, or rotate the logo.",
                "Do not change logo colors outside approved variants.",
                "Do not place logo on busy backgrounds without contrast.",
                "Do not add effects like shadows, outlines, or glows.",
                "Do not recreate the mark in other typefaces.",
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Brand Fonts
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Predictaf uses Funnel Display for headings and Roboto for body copy.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <FontSample
              name="Funnel Display"
              usage="Primary heading and emphasis font"
              sample="Predictaf Powers Better Operations"
              links={[
                {
                  label: "Google Fonts",
                  href: "https://fonts.google.com/specimen/Funnel+Display",
                },
              ]}
            />

            <FontSample
              name="Roboto"
              usage="Body text and UI readability font"
              sample="Clear, modern, and built for daily workflows."
              links={[
                {
                  label: "Google Fonts",
                  href: "https://fonts.google.com/specimen/Roboto",
                },
              ]}
            />
          </div>
        </section>
      </section>
    </main>
  );
}
