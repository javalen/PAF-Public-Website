import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ClipboardList,
  FileCheck2,
  Landmark,
  Users,
} from "lucide-react";

import { capturePilotLead } from "../api/demoLead";
import logoLight from "../assets/predictaf-logo.svg";
import "./Pilot.css";

const SCHEDULE_URL =
  import.meta.env.VITE_SCHEDULE_DEMO_URL ||
  "https://calendar.app.google/p3Bi6LnTTzgfpo8M7";

const PILOT_TITLE = "Founding Community Pilot | Predictaf";
const PILOT_DESCRIPTION = "Five HOA communities. A 90-day working partnership to bring assets, maintenance, documents, work requests, and reserve priorities into view with Predictaf.";
const HOME_TITLE = "Predictaf | CMMS + System & Facility Reserve Studies";
const HOME_DESCRIPTION = "Predictaf connects CMMS operations with system-level and facility-level Reserve Studies, helping property teams turn maintenance evidence into clearer capital plans.";

const outcomes = [
  {
    icon: Building2,
    title: "Know what your community owns",
    copy: "Bring shared facilities and major systems into one working inventory.",
  },
  {
    icon: CalendarDays,
    title: "See what needs attention",
    copy: "Put recurring maintenance and inspections on a visible schedule.",
  },
  {
    icon: FileCheck2,
    title: "Keep important records in view",
    copy: "Track the documents and dates that are easy to lose in email or folders.",
  },
  {
    icon: Landmark,
    title: "Connect today to the long term",
    copy: "See how system information can support reserve and capital planning conversations.",
  },
  {
    icon: Users,
    title: "Make ownership clear",
    copy: "Give board members, managers, and service teams a shared view of open work.",
  },
];

const phases = [
  {
    number: "01",
    when: "Start together",
    title: "Set the foundation",
    copy: "We agree on scope, collect the records you already have, and help set up the community in Predictaf.",
  },
  {
    number: "02",
    when: "Work in the platform",
    title: "Put it to use",
    copy: "Your team uses Predictaf for real maintenance, documents, work requests, and planning. We meet regularly to learn what helps and what needs work.",
  },
  {
    number: "03",
    when: "Review the results",
    title: "Decide what comes next",
    copy: "We review what became clearer and what still needs attention. You decide whether continuing makes sense for your community.",
  },
];

function PilotInterest() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    try {
      await capturePilotLead(values);
      setStatus("success");
    } catch (cause) {
      setError(cause?.message || "We couldn't save your request. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="interest" className="pilot-interest" aria-labelledby="pilot-interest-title">
      <div className="pilot-container pilot-interest-grid">
        <div>
          <span className="pilot-kicker">Take the first step</span>
          <h2 id="pilot-interest-title">Could your community be one of the five?</h2>
          <p>
            Tell us how to reach you. We’ll talk about your community, where records
            and responsibilities live today, and whether the pilot is a good fit.
          </p>
          <div className="pilot-interest-note">
            <Check aria-hidden="true" />
            <span>Board members can express interest. Community managers can nominate an association they manage.</span>
          </div>
        </div>

        <div className="pilot-form-card">
          {status === "success" ? (
            <div className="pilot-form-success" role="status">
              <span className="pilot-success-icon"><Check aria-hidden="true" /></span>
              <h3>We received your interest.</h3>
              <p>Thank you. We’ll follow up by email. If you’d like to talk sooner, choose a time below.</p>
              <a href={SCHEDULE_URL} target="_blank" rel="noopener noreferrer" className="pilot-button pilot-button-primary">
                Schedule a pilot conversation
              </a>
            </div>
          ) : (
            <>
              <span className="pilot-form-label">Founding Community Pilot</span>
              <h3>Express interest</h3>
              <p>This starts a conversation. It does not enroll your community.</p>
              <form onSubmit={submit}>
                <label htmlFor="pilot-name">Full name</label>
                <input
                  id="pilot-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={values.name}
                  onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                />
                <label htmlFor="pilot-email">Email address</label>
                <input
                  id="pilot-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@example.com"
                />
                {error && (
                  <p className="pilot-form-error" role="alert">
                    {error} You can also <a href="mailto:info@predictaf.com?subject=Founding%20Community%20Pilot">email us directly</a>.
                  </p>
                )}
                <button type="submit" className="pilot-button pilot-button-primary" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Request a pilot conversation"}
                </button>
                <small>We’ll use your details to follow up about the pilot. See our <Link to="/privacy">Privacy Policy</Link>.</small>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Pilot() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = PILOT_TITLE;
    if (description) {
      description.content = PILOT_DESCRIPTION;
    }

    return () => {
      // A direct /pilot/ visit starts with pilot/index.html metadata. Restore
      // the default site's metadata when navigating away in the SPA.
      document.title = previousTitle === PILOT_TITLE ? HOME_TITLE : previousTitle;
      if (description) {
        description.content = previousDescription === PILOT_DESCRIPTION
          ? HOME_DESCRIPTION
          : previousDescription;
      }
    };
  }, []);

  return (
    <div className="pilot-page">
      <header className="pilot-header">
        <div className="pilot-container pilot-header-inner">
          <Link to="/" aria-label="Predictaf home" className="pilot-logo-link">
            <img src={logoLight} alt="Predictaf" />
          </Link>
          <nav aria-label="Pilot page navigation">
            <a href="#program">The program</a>
            <a href="#fit">Who it’s for</a>
            <a href="#process">How it works</a>
          </nav>
          <a href="#interest" className="pilot-header-cta">Express interest</a>
        </div>
      </header>

      <main>
        <section className="pilot-hero" aria-labelledby="pilot-title">
          <div className="pilot-container pilot-hero-grid">
            <div className="pilot-hero-copy">
              <span className="pilot-eyebrow"><span aria-hidden="true" /> Predictaf Founding Community Pilot</span>
              <h1 id="pilot-title">Help shape a better way to care for your community.</h1>
              <p>
                We’re inviting <strong>five HOA communities</strong> into a 90-day working partnership.
                Together, we’ll turn scattered property information into a clearer picture of
                what your community owns, what needs attention, and what lies ahead.
              </p>
              <div className="pilot-hero-actions">
                <a href="#interest" className="pilot-button pilot-button-primary">Request a pilot conversation</a>
                <a href="#program" className="pilot-text-link">See what’s involved <ArrowRight aria-hidden="true" /></a>
              </div>
              <p className="pilot-hero-assurance">No pilot fee · Hands-on setup · No obligation to continue</p>
            </div>

            <div className="pilot-hero-art">
              <img src="/reserve-operations-story.jpg" alt="Property team reviewing building equipment together" />
              <div className="pilot-hero-stamp" aria-label="Five communities, ninety days">
                <span>THE INVITATION</span>
                <strong>05</strong>
                <span>COMMUNITIES</span>
                <i aria-hidden="true" />
                <small>90 days of working together</small>
              </div>
            </div>
          </div>
        </section>

        <section className="pilot-intro" id="program" aria-labelledby="pilot-program-title">
          <div className="pilot-container pilot-intro-grid">
            <div>
              <span className="pilot-kicker">An invitation to work together</span>
              <h2 id="pilot-program-title">Your community. Your real work. A clearer way forward.</h2>
            </div>
            <div>
              <p>
                This is a guided partnership, shaped around an actual association.
                We help bring your facilities, systems, maintenance schedules, key documents,
                work requests, and reserve information into Predictaf. Your board and manager
                use it in everyday work and tell us where it helps most.
              </p>
              <p>
                The goal is practical: make important work easier to see, assign, and discuss
                before a missed task or missing record becomes a surprise.
              </p>
            </div>
          </div>
        </section>

        <section className="pilot-outcomes" aria-labelledby="pilot-outcomes-title">
          <div className="pilot-container">
            <div className="pilot-section-heading">
              <span className="pilot-kicker">What we’ll put in view</span>
              <h2 id="pilot-outcomes-title">Five questions every community should be able to answer.</h2>
            </div>
            <div className="pilot-outcome-grid">
              {outcomes.map(({ icon: Icon, title, copy }, index) => (
                <article key={title} className="pilot-outcome-card">
                  <span className="pilot-outcome-number">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pilot-exchange" id="fit" aria-labelledby="pilot-fit-title">
          <div className="pilot-container pilot-exchange-grid">
            <div className="pilot-exchange-lead">
              <span className="pilot-kicker">A good fit is a two-way commitment</span>
              <h2 id="pilot-fit-title">Bring your community. We’ll bring the hands-on help.</h2>
              <p>
                The strongest pilot partners are boards or managers who want a clearer handle
                on their physical assets and are ready to use the system together for 90 days.
              </p>
            </div>
            <div className="pilot-exchange-cards">
              <article>
                <span className="pilot-exchange-icon"><ClipboardList aria-hidden="true" /></span>
                <h3>Your part</h3>
                <ul>
                  <li><Check aria-hidden="true" /> Share the records you already have</li>
                  <li><Check aria-hidden="true" /> Identify a board or manager point of contact</li>
                  <li><Check aria-hidden="true" /> Use the platform and give candid feedback</li>
                </ul>
              </article>
              <article>
                <span className="pilot-exchange-icon"><Users aria-hidden="true" /></span>
                <h3>Our part</h3>
                <ul>
                  <li><Check aria-hidden="true" /> Help organize and onboard your community</li>
                  <li><Check aria-hidden="true" /> Support your team as it starts using Predictaf</li>
                  <li><Check aria-hidden="true" /> Review progress with you throughout the pilot</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="pilot-process" id="process" aria-labelledby="pilot-process-title">
          <div className="pilot-container">
            <div className="pilot-section-heading">
              <span className="pilot-kicker">The 90-day journey</span>
              <h2 id="pilot-process-title">Start with what you have. Learn from what happens.</h2>
            </div>
            <div className="pilot-phase-grid">
              {phases.map((phase) => (
                <article key={phase.number}>
                  <span className="pilot-phase-number">{phase.number}</span>
                  <span className="pilot-phase-when">{phase.when}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.copy}</p>
                </article>
              ))}
            </div>
            <div className="pilot-terms">
              <strong>What happens after 90 days?</strong>
              <p>
                Before the pilot begins, we’ll agree on its scope and show you the preferred
                price available if you choose to continue. At the end, your community makes
                that decision. There is no automatic paid enrollment.
              </p>
            </div>
          </div>
        </section>

        <PilotInterest />
      </main>

      <footer className="pilot-footer">
        <div className="pilot-container pilot-footer-inner">
          <Link to="/" aria-label="Predictaf home"><img src={logoLight} alt="Predictaf" /></Link>
          <p>Built for the people who care for communities.</p>
          <div><Link to="/privacy">Privacy</Link><Link to="/">Back to Predictaf</Link></div>
        </div>
      </footer>
    </div>
  );
}
