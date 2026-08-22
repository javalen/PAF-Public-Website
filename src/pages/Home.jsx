import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Coins,
  Download,
  FileText,
  Gauge,
  HardHat,
  Layers3,
  Menu,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  X,
} from "lucide-react";

import { Pricing } from "../components/Pricing";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import logoLight from "../assets/predictaf-logo.svg";
import logoDark from "../assets/predictaf-logo-dark.svg";
import appStoreBadge from "../assets/appStore.svg";
import googlePlayBadge from "../assets/googlePlay.svg";
import "./Home.css";

const DEMO_URL = "https://calendar.app.google/p3Bi6LnTTzgfpo8M7";
const STORY_IMAGE = "/reserve-operations-story.jpg";
const IOS_APP_URL = "https://apps.apple.com/us/app/predictaf-mobile/id6738309158";
const ANDROID_APP_URL = "https://play.google.com/store/apps/details?id=com.predictiveaf.mobile";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Reserve Intelligence", href: "#reserve-intelligence" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Who It’s For", href: "#who-its-for" },
  { label: "Mobile App", href: "#mobile-app" },
  { label: "Pricing", href: "#pricing" },
];

const systemRows = [
  {
    name: "Rooftop HVAC",
    detail: "PM history supports current useful life",
    value: "2032",
    status: "On plan",
    tone: "good",
  },
  {
    name: "Elevator controls",
    detail: "Inspection evidence ready for review",
    value: "2029",
    status: "Review",
    tone: "review",
  },
  {
    name: "Roof membrane",
    detail: "Condition and replacement cost tracked",
    value: "2036",
    status: "Current",
    tone: "current",
  },
];

const operationalSteps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Capture what happens",
    body: "Preventive maintenance, inspections, tickets, service history, documents, and vendor evidence stay connected to the asset.",
  },
  {
    icon: Gauge,
    number: "02",
    title: "Understand each system",
    body: "Predictaf turns field evidence into a clearer view of condition, risk, remaining useful life, replacement timing, and cost.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Roll up the facility plan",
    body: "System-level Reserve Studies feed the facility-level Reserve Study, keeping the capital forecast grounded in real operations.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Review, approve, explain",
    body: "Stage material changes, preserve snapshots, compare funding approaches, and give boards a plain-language explanation of what changed and why.",
  },
];

const audiences = [
  {
    icon: Building2,
    title: "HOA, COA & POA Boards",
    body: "Make defensible capital decisions with a plan that traces back to actual assets, work, and evidence.",
  },
  {
    icon: Target,
    title: "Community Managers",
    body: "Bring maintenance priorities, reserve projects, funding needs, and board communication into one operating rhythm.",
  },
  {
    icon: HardHat,
    title: "Facility & Maintenance Teams",
    body: "See how today’s inspection or repair can influence the long-term outlook for the system you are maintaining.",
  },
  {
    icon: BarChart3,
    title: "Owners & Asset Managers",
    body: "Understand near-term risk and long-range capital exposure across one facility or a growing portfolio.",
  },
];

function BrandLogo() {
  return (
    <Link to="/" className="reserve-brand" aria-label="Predictaf home">
      <img src={logoLight} alt="Predictaf" className="reserve-logo reserve-logo-light" />
      <img src={logoDark} alt="Predictaf" className="reserve-logo reserve-logo-dark" />
    </Link>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="reserve-header">
      <div className="reserve-container reserve-header-inner">
        <BrandLogo />

        <nav className="reserve-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="reserve-header-actions">
          <DarkModeToggle />
          <a className="reserve-login" href="/login">
            Log in
          </a>
          <a
            className="reserve-button reserve-button-small reserve-button-small-secondary"
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
          >
            Book a Demo
          </a>
          <Link className="reserve-button reserve-button-small" to="/explore-demo">
            Explore Demo
          </Link>
          <button
            type="button"
            className="reserve-menu-button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="reserve-mobile-menu">
          <div className="reserve-container">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
                <ChevronRight aria-hidden="true" />
              </a>
            ))}
            <div className="reserve-mobile-actions">
              <a href="/login">Log in</a>
              <Link to="/explore-demo" onClick={() => setMenuOpen(false)}>Explore Demo</Link>
              <a href={DEMO_URL} target="_blank" rel="noreferrer">Book a demo</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ReserveDashboard() {
  return (
    <div className="reserve-dashboard" aria-label="Illustrative Predictaf system and facility reserve view">
      <div className="reserve-dashboard-topbar">
        <div>
          <span className="reserve-live-dot" />
          Reserve Intelligence
        </div>
        <span>Illustrative view</span>
      </div>

      <div className="reserve-dashboard-heading">
        <div>
          <span>Facility Reserve Study</span>
          <h2>Harbor Ridge Community</h2>
        </div>
        <span className="reserve-plan-chip">Cash Flow Plan</span>
      </div>

      <div className="reserve-dashboard-summary">
        <div className="reserve-chart-card">
          <div className="reserve-chart-labels">
            <div>
              <span>Expected capital expense</span>
              <strong>20-year outlook</strong>
            </div>
            <span className="reserve-updated"><RefreshCw /> Live from system data</span>
          </div>
          <div className="reserve-chart" aria-hidden="true">
            {[28, 46, 34, 72, 42, 88, 58, 36, 68, 50, 92, 64].map((height, index) => (
              <span key={index} style={{ "--bar-height": `${height}%` }} />
            ))}
          </div>
          <div className="reserve-chart-years" aria-hidden="true">
            <span>2027</span><span>2032</span><span>2037</span><span>2042</span><span>2047</span>
          </div>
        </div>

        <div className="reserve-funding-card">
          <Coins aria-hidden="true" />
          <span>Funding confidence</span>
          <strong>Plan aligned</strong>
          <p>System forecasts are rolled into the current facility outlook.</p>
          <div className="reserve-progress"><span /></div>
        </div>
      </div>

      <div className="reserve-system-header">
        <div>
          <span>System-level Reserve Studies</span>
          <strong>Every component keeps its own outlook.</strong>
        </div>
        <span>View all systems <ArrowRight /></span>
      </div>

      <div className="reserve-system-list">
        {systemRows.map((row) => (
          <div className="reserve-system-row" key={row.name}>
            <div className="reserve-system-icon"><Wrench aria-hidden="true" /></div>
            <div className="reserve-system-name">
              <strong>{row.name}</strong>
              <span>{row.detail}</span>
            </div>
            <div className="reserve-system-year">
              <span>Replacement</span>
              <strong>{row.value}</strong>
            </div>
            <span className={`reserve-system-status reserve-system-status-${row.tone}`}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <>
      <section className="reserve-hero" id="top">
        <div className="reserve-hero-grid" aria-hidden="true" />
        <div className="reserve-orb reserve-orb-one" aria-hidden="true" />
        <div className="reserve-orb reserve-orb-two" aria-hidden="true" />

        <div className="reserve-container reserve-hero-inner">
          <div className="reserve-hero-copy">
            <div className="reserve-eyebrow"><Sparkles /> CMMS + Reserve Intelligence</div>
            <h1>Every work order should make your reserve plan <em>smarter.</em></h1>
            <p>
              Predictaf connects day-to-day facility operations with <strong>system-level</strong> and <strong>facility-level Reserve Studies</strong>—so the capital plan reflects what is actually happening across your property.
            </p>
            <div className="reserve-hero-actions">
              <Link className="reserve-button reserve-button-primary" to="/register">
                Start your free trial <ArrowRight />
              </Link>
              <Link className="reserve-button reserve-button-secondary" to="/explore-demo">
                Explore Demo <PlayCircle />
              </Link>
              <a className="reserve-button reserve-button-secondary" href={DEMO_URL} target="_blank" rel="noreferrer">
                Book a Demo <CalendarClock />
              </a>
            </div>
            <div className="reserve-hero-proof">
              <span><Check /> No credit card required</span>
              <span><Check /> Built for real property operations</span>
            </div>
          </div>

          <div className="reserve-hero-visual">
            <div className="reserve-visual-label reserve-visual-label-top">
              <CheckCircle2 /> Service history captured
            </div>
            <ReserveDashboard />
            <div className="reserve-visual-label reserve-visual-label-bottom">
              <Layers3 /> System insight rolled up to facility plan
            </div>
          </div>
        </div>
      </section>

      <section className="reserve-proof-strip" aria-label="Predictaf platform benefits">
        <div className="reserve-container reserve-proof-grid">
          <div><Wrench /><span><strong>Operate</strong> with one CMMS record</span></div>
          <div><Gauge /><span><strong>Understand</strong> every system</span></div>
          <div><BarChart3 /><span><strong>Forecast</strong> facility capital needs</span></div>
          <div><FileText /><span><strong>Explain</strong> every decision</span></div>
        </div>
      </section>
    </>
  );
}

function PlatformStory() {
  return (
    <section className="reserve-section reserve-platform" id="platform">
      <div className="reserve-container">
        <div className="reserve-section-heading reserve-section-heading-wide">
          <div>
            <span className="reserve-kicker">One connected operating system</span>
            <h2>CMMS and Reserve Studies belong in the same conversation.</h2>
          </div>
          <p>
            Traditional CMMS tools stop at the completed work order. Traditional Reserve Studies can become stale between updates. Predictaf connects both, creating a living line of sight from field activity to long-term capital planning.
          </p>
        </div>

        <div className="reserve-loop-grid">
          <article>
            <span className="reserve-loop-icon"><ClipboardCheck /></span>
            <small>Operations</small>
            <h3>The work happening today</h3>
            <p>Assets, preventive maintenance, inspections, tickets, service records, vendors, warranties, and compliance documents.</p>
            <ul>
              <li><CheckCircle2 /> Build an asset-level history</li>
              <li><CheckCircle2 /> Keep teams and evidence connected</li>
            </ul>
          </article>

          <div className="reserve-loop-bridge" aria-hidden="true">
            <RefreshCw />
            <span>Operational evidence becomes reserve intelligence</span>
          </div>

          <article className="reserve-loop-reserve">
            <span className="reserve-loop-icon"><BarChart3 /></span>
            <small>Capital planning</small>
            <h3>The costs coming tomorrow</h3>
            <p>Condition, risk, remaining useful life, replacement timing, project cost, funding scenarios, and board-ready narratives.</p>
            <ul>
              <li><CheckCircle2 /> See the effect at system and facility level</li>
              <li><CheckCircle2 /> Review changes before they become official</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function ReserveLevels() {
  return (
    <section className="reserve-section reserve-levels" id="reserve-intelligence">
      <div className="reserve-container">
        <div className="reserve-section-heading reserve-section-heading-center reserve-on-dark">
          <span className="reserve-kicker">Reserve intelligence at both levels</span>
          <h2>Start with each system. See the whole facility.</h2>
          <p>
            Predictaf does not treat a Reserve Study as one static facility report. It maintains the story of every reserve component—and then rolls those individual stories into the facility-wide capital plan.
          </p>
        </div>

        <div className="reserve-level-diagram">
          <div className="reserve-level-card reserve-level-card-system">
            <div className="reserve-level-title">
              <span><Wrench /></span>
              <div><small>Zoom in</small><h3>System-level Reserve Study</h3></div>
            </div>
            <p>Give every roof, HVAC unit, elevator, pump, fire system, and major component its own evidence-backed outlook.</p>
            <ul>
              <li><CheckCircle2 /> Condition, health, and risk</li>
              <li><CheckCircle2 /> Remaining useful life</li>
              <li><CheckCircle2 /> Replacement year and projected cost</li>
              <li><CheckCircle2 /> Maintenance and service evidence</li>
            </ul>
            <div className="reserve-level-example">
              <div><span>Boiler #2</span><strong>System Reserve Study</strong></div>
              <div className="reserve-health-ring"><span>82</span><small>health</small></div>
            </div>
          </div>

          <div className="reserve-rollup" aria-label="System studies roll up into the facility study">
            <span><Layers3 /></span>
            <strong>Roll up</strong>
            <small>Every included system contributes to the facility outlook</small>
            <ArrowRight />
          </div>

          <div className="reserve-level-card reserve-level-card-facility">
            <div className="reserve-level-title">
              <span><Building2 /></span>
              <div><small>Zoom out</small><h3>Facility-level Reserve Study</h3></div>
            </div>
            <p>See the combined capital exposure across the property and turn component forecasts into a reviewable funding direction.</p>
            <ul>
              <li><CheckCircle2 /> Expected expense by year</li>
              <li><CheckCircle2 /> Cash Flow funding scenarios</li>
              <li><CheckCircle2 /> Component Based planning</li>
              <li><CheckCircle2 /> Facility snapshots and audit history</li>
            </ul>
            <div className="reserve-mini-bars" aria-hidden="true">
              {[32, 58, 44, 76, 48, 88, 63].map((height, index) => <span key={index} style={{ "--mini-height": `${height}%` }} />)}
            </div>
          </div>
        </div>

        <div className="reserve-level-note">
          <Sparkles />
          <p><strong>One change, understood in context.</strong> When new work or inspection evidence changes a system outlook, Predictaf can show the resulting impact on the facility Reserve Study—without losing the history behind the decision.</p>
        </div>
      </div>
    </section>
  );
}

function StoryImage() {
  return (
    <section className="reserve-story-image">
      <img src={STORY_IMAGE} alt="A property manager and building engineer reviewing rooftop HVAC equipment at a multifamily community" />
      <div className="reserve-story-overlay" />
      <div className="reserve-container reserve-story-content">
        <span className="reserve-kicker">A living capital plan</span>
        <h2>Field reality should shape financial readiness.</h2>
        <p>
          Your team already creates the evidence: inspections, completed work, recurring issues, quotes, and service records. Predictaf helps turn that operational history into a reserve plan that stays useful between formal study cycles.
        </p>
        <div className="reserve-story-points">
          <span><CheckCircle2 /> Maintenance can support useful-life decisions</span>
          <span><CheckCircle2 /> Emerging risks can surface earlier</span>
          <span><CheckCircle2 /> Boards can see the “why” behind the numbers</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="reserve-section reserve-how" id="how-it-works">
      <div className="reserve-container">
        <div className="reserve-section-heading reserve-section-heading-center">
          <span className="reserve-kicker">How the loop works</span>
          <h2>From completed work to capital confidence.</h2>
          <p>Predictaf keeps operations and reserves connected without turning every field event into an automatic financial change.</p>
        </div>

        <div className="reserve-steps">
          {operationalSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.number}>
                <div className="reserve-step-top">
                  <span className="reserve-step-icon"><Icon /></span>
                  <span className="reserve-step-number">{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {index < operationalSteps.length - 1 && <ChevronRight className="reserve-step-arrow" aria-hidden="true" />}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Governance() {
  const items = [
    { icon: ShieldCheck, title: "Human-governed changes", body: "Auto-apply where policy allows or stage recommendations for review before the official study changes." },
    { icon: RefreshCw, title: "Snapshots and history", body: "Preserve the before-and-after record so approved updates remain traceable and recoverable." },
    { icon: FileText, title: "Board-ready explanations", body: "Translate component evidence, financial effects, and next steps into clear, audience-appropriate narratives." },
  ];

  return (
    <section className="reserve-section reserve-governance">
      <div className="reserve-container reserve-governance-grid">
        <div className="reserve-governance-copy">
          <span className="reserve-kicker">Intelligent, not mysterious</span>
          <h2>Recommendations your team can review—and defend.</h2>
          <p>Reserve planning affects budgets, assessments, property values, and trust. Predictaf is designed to keep evidence, assumptions, review, and approvals visible.</p>
          <Link className="reserve-text-link" to="/explore-demo">Explore the reserve workflow <ArrowRight /></Link>
        </div>
        <div className="reserve-governance-items">
          {items.map((item) => {
            const Icon = item.icon;
            return <article key={item.title}><span><Icon /></span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>;
          })}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="reserve-section reserve-audiences" id="who-its-for">
      <div className="reserve-container">
        <div className="reserve-section-heading reserve-section-heading-wide">
          <div>
            <span className="reserve-kicker">Built for property decision-makers</span>
            <h2>One source of truth. Different views for every role.</h2>
          </div>
          <p>Operations teams need detail. Boards need clarity. Owners need confidence. Predictaf connects the same evidence to the question each stakeholder is trying to answer.</p>
        </div>
        <div className="reserve-audience-grid">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return <article key={audience.title}><span><Icon /></span><h3>{audience.title}</h3><p>{audience.body}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}

function MobileAppDownload() {
  const stores = [
    {
      name: "Apple App Store",
      platform: "For iPhone",
      description: "Scan to open Predictaf Mobile in the App Store.",
      url: IOS_APP_URL,
      qr: "/store/predictaf-app-store-qr.png",
      qrDownload: "predictaf-app-store-qr.png",
      badge: appStoreBadge,
      badgeAlt: "Download on the App Store",
    },
    {
      name: "Google Play",
      platform: "For Android",
      description: "Scan to open PredictAF in the Google Play Store.",
      url: ANDROID_APP_URL,
      qr: "/store/predictaf-google-play-qr.png",
      qrDownload: "predictaf-google-play-qr.png",
      badge: googlePlayBadge,
      badgeAlt: "Get it on Google Play",
    },
  ];

  return (
    <section className="reserve-mobile-app" id="mobile-app">
      <div className="reserve-container">
        <div className="reserve-section-heading reserve-section-heading-wide reserve-mobile-heading">
          <div>
            <span className="reserve-kicker">Predictaf in your pocket</span>
            <h2>Scan. Install. Stay ahead.</h2>
          </div>
          <p>Bring work orders, inspections, asset history, and system intelligence into the field. Point your phone’s camera at the code for your device.</p>
        </div>
        <div className="reserve-download-grid">
          {stores.map((store) => (
            <article className="reserve-download-card" key={store.name}>
              <a className="reserve-qr-link" href={store.url} target="_blank" rel="noreferrer" aria-label={`Open Predictaf on ${store.name}`}>
                <img src={store.qr} alt={`QR code for Predictaf on ${store.name}`} />
              </a>
              <div className="reserve-download-copy">
                <span>{store.platform}</span>
                <h3>{store.name}</h3>
                <p>{store.description}</p>
                <a className="reserve-store-link" href={store.url} target="_blank" rel="noreferrer">
                  <img src={store.badge} alt={store.badgeAlt} />
                </a>
                <a className="reserve-qr-download" href={store.qr} download={store.qrDownload}>
                  <Download aria-hidden="true" /> Download QR code
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="reserve-mobile-note">Already viewing this page on your phone? Tap the store badge instead of scanning.</p>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="reserve-testimonial">
      <div className="reserve-container reserve-testimonial-inner">
        <div className="reserve-quote-mark">“</div>
        <blockquote>
          Knowing what needs attention now and next lets me stay on top of everything and be proactive in managing our units.
        </blockquote>
        <div className="reserve-quote-person">
          <span>PS</span>
          <div><strong>Paul Salinas</strong><small>Atlas Properties</small></div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="reserve-closing">
      <div className="reserve-closing-grid" aria-hidden="true" />
      <div className="reserve-container reserve-closing-inner">
        <span className="reserve-kicker">From reactive to ready</span>
        <h2>Make every asset part of a smarter capital plan.</h2>
        <p>See how Predictaf connects CMMS, system-level Reserve Studies, and facility-level funding forecasts in one operational platform.</p>
        <div>
          <Link className="reserve-button reserve-button-light" to="/register">Start your free trial <ArrowRight /></Link>
          <a className="reserve-button reserve-button-outline-light" href={DEMO_URL} target="_blank" rel="noreferrer"><CalendarClock /> Book a walkthrough</a>
        </div>
        <small>No credit card required • Set up in minutes</small>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="reserve-footer">
      <div className="reserve-container reserve-footer-grid">
        <div className="reserve-footer-brand">
          <BrandLogo />
          <p>Facility operations and Reserve Intelligence in one connected platform.</p>
          <span>© {new Date().getFullYear()} Predictaf, Inc. All rights reserved.</span>
        </div>
        <div>
          <strong>Platform</strong>
          <a href="#platform">CMMS + Reserves</a>
          <a href="#reserve-intelligence">Reserve Intelligence</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <strong>Company</strong>
          <Link to="/careers">Careers</Link>
          <Link to="/support">Support</Link>
          <Link to="/privacy">Privacy</Link>
          <a href="https://www.youtube.com/@PredictiveAF" target="_blank" rel="noreferrer">YouTube</a>
        </div>
        <div>
          <strong>Get started</strong>
          <Link to="/register">Start a free trial</Link>
          <Link to="/explore-demo">Explore Demo</Link>
          <a href="#mobile-app">Download the mobile app</a>
          <a href={DEMO_URL} target="_blank" rel="noreferrer">Schedule a demo</a>
          <a href="/login">Log in</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="reserve-site">
      <SiteHeader />
      <main>
        <Hero />
        <PlatformStory />
        <ReserveLevels />
        <StoryImage />
        <HowItWorks />
        <Governance />
        <WhoItsFor />
        <MobileAppDownload />
        <Testimonial />
        <Pricing />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
