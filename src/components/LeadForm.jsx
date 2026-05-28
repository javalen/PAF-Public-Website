import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "./Container";
import PafButton from "./ui/PafButton";

const SCHEDULE_DEMO_URL =
  import.meta.env.VITE_SCHEDULE_DEMO_URL ||
  "https://calendar.app.google/p3Bi6LnTTzgfpo8M7";

// LeadForm captures name and email, then navigates to pricing wizard
export default function LeadForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Store lead data in localStorage to retrieve on pricing page
    localStorage.setItem(
      "leadFormData",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString(),
      })
    );

    // Navigate to pricing wizard with lead data
    navigate("/pricing", {
      state: {
        name: formData.name,
        email: formData.email,
      },
    });

    setIsSubmitting(false);
  };

  return (
    // <section className="bg-backgroundSecondary dark:bg-backgroundPrimary-dark py-12 sm:py-16 lg:py-20">
    // <section className="bg-colorHilight  py-12 sm:py-16 lg:py-20">
    <section className="bg-backgroundSecondary dark:bg-backgroundPrimary-dark py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Left side: Heading and subheading */}
          <div className="flex flex-col gap-1">
            <p className="font-['Funnel_Display'] text-xs font-extrabold uppercase leading-normal tracking-normal text-brandSecondary dark:text-brandSecondary">
              Get in touch
            </p>
            <h2 className="max-w-3xl font-['Funnel_Display'] text-[36px] font-light leading-[1.1] tracking-normal text-brandPrimary dark:text-brandPrimary-dark sm:text-[42px] ">
              {/* Need help deciding which plan is right for you? */}
              Ready to improve facility operations?
            </h2>

            {/* Mobile only: direct schedule CTA without form fields. */}
            <a
              href={SCHEDULE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full sm:hidden"
            >
              <PafButton
                variant="primary"
                size="large"
                iconLeft={< Calendar  className="w-5 h-5" />}
                className="w-full"
              >
                Schedule a Demo
              </PafButton>
            </a>
          </div>

          {/* Desktop/tablet only: lead form fields and submit flow. */}
          <form
            onSubmit={handleSubmit}
            className="hidden w-full flex-col gap-4 sm:flex sm:flex-row sm:gap-3 lg:gap-4"
          >
            {/* Name field */}
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <label
                htmlFor="name"
                className="text-sm font-medium font-['Roboto'] tracking-normal leading-normal text-textPrimary dark:text-textPrimary-dark"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2 text-sm font-['Roboto'] tracking-normal leading-normal text-textPrimary dark:text-textPrimary placeholder-textTertiary dark:placeholder-textTertiary focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary focus:border-transparent w-full"
              />
              {errors.name && (
                <p className="text-xs text-colorError">{errors.name}</p>
              )}
            </div>

            {/* Email field  */}
            <div className="flex flex-1 flex-col gap-2 min-w-0">
              <label
                htmlFor="email"
                className="text-sm font-medium font-['Roboto'] tracking-normal leading-normal text-textPrimary dark:text-textPrimary-dark"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2 text-sm font-['Roboto'] tracking-normal leading-normal text-textPrimary dark:text-textPrimary placeholder-textTertiary dark:placeholder-textTertiary focus:outline-none focus:ring-1 focus:ring-brandPrimary dark:focus:ring-brandPrimary focus:border-transparent w-full"
              />
              {errors.email && (
                <p className="text-xs text-colorError">{errors.email}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="flex w-full items-end pt-1 sm:w-auto">
              <PafButton
                variant="primary"
                size="large sm:medium"
                iconLeft={< Calendar className="w-5 h-5" />}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Schedule a Demo
              </PafButton>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

