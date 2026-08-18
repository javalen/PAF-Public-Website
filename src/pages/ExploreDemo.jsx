import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { captureDemoLead, INTERACTIVE_DEMO_URL } from "../api/demoLead";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import logoLight from "../assets/predictaf-logo.svg";
import logoDark from "../assets/predictaf-logo-dark.svg";
import "./ExploreDemo.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ExploreDemo() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name] || errors.submit) {
      setErrors((current) => ({ ...current, [name]: "", submit: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await captureDemoLead(formData);
      window.location.assign(INTERACTIVE_DEMO_URL);
    } catch (error) {
      setErrors({
        submit:
          error?.message || "We could not start the demo. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="explore-demo-page">
      <header className="explore-demo-header">
        <Link to="/" aria-label="Predictaf home">
          <img className="explore-demo-logo explore-demo-logo-light" src={logoLight} alt="Predictaf" />
          <img className="explore-demo-logo explore-demo-logo-dark" src={logoDark} alt="Predictaf" />
        </Link>
        <div className="explore-demo-header-actions">
          <DarkModeToggle />
          <Link to="/" className="explore-demo-back"><ArrowLeft /> Back to website</Link>
        </div>
      </header>

      <main className="explore-demo-main">
        <section className="explore-demo-intro">
          <span className="explore-demo-eyebrow"><PlayCircle /> Interactive product demo</span>
          <h1>Explore Predictaf with a fully populated facility portfolio.</h1>
          <p>
            Step into a working control panel with facilities, systems,
            maintenance schedules, reports, exceptions, users, and reserve data
            ready to explore.
          </p>

          <div className="explore-demo-points">
            <span><Clock3 /> Your private demo session lasts 15 minutes</span>
            <span><Check /> No credit card or account setup required</span>
            <span><Check /> Demo data is refreshed automatically</span>
          </div>
        </section>

        <section className="explore-demo-card" aria-labelledby="explore-demo-form-title">
          <div className="explore-demo-card-heading">
            <span>Ready when you are</span>
            <h2 id="explore-demo-form-title">Start your demo</h2>
            <p>Tell us who you are, and we’ll prepare your demo environment.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="explore-demo-field">
              <label htmlFor="demo-name">Full name</label>
              <input
                id="demo-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "demo-name-error" : undefined}
              />
              {errors.name && <p id="demo-name-error" className="explore-demo-error">{errors.name}</p>}
            </div>

            <div className="explore-demo-field">
              <label htmlFor="demo-email">Work email</label>
              <input
                id="demo-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "demo-email-error" : undefined}
              />
              {errors.email && <p id="demo-email-error" className="explore-demo-error">{errors.email}</p>}
            </div>

            {errors.submit && (
              <p className="explore-demo-submit-error" role="alert">{errors.submit}</p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Preparing your demo…" : "Explore Demo"}
              {!isSubmitting && <ArrowRight />}
            </button>
            <small>
              By continuing, you agree that Predictaf may contact you about the
              product. See our <Link to="/privacy">Privacy Policy</Link>.
            </small>
          </form>
        </section>
      </main>
    </div>
  );
}
