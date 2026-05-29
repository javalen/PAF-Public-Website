import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputMask from "react-input-mask";
import useEmail from "../utils/email";
import PafButton from "../components/ui/PafButton";
import TextHighlight from "../components/ui/TextHighlight";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import LogoLight from "../assets/predictaf-logo.svg";
import LogoDark from "../assets/predictaf-logo-dark.svg";
import RegisterImage from "../assets/registerImage.jpg";
import RegisterImage2 from "../assets/registerImage2.jpg";
import { ArrowRight, ArrowLeft, CheckCircle2, SquareCheck, Calendar } from "lucide-react";

const API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_PLACES_API;

const CLIENTS_SVR_URL = (
  import.meta.env.VITE_CLIENTS_SVR_URL ||
  import.meta.env.VITE_CLIENTS_SERVER_URL ||
  ""
).replace(/\/$/, "");

const CLIENTS_SVR_KEY =
  import.meta.env.VITE_CLIENTS_SVR_KEY ||
  import.meta.env.VITE_CLIENTS_API_KEY ||
  import.meta.env.VITE_API_KEY ||
  "";

const LEAD_CAPTURE_ENDPOINTS = [
  "/register/lead",
  "/register-lead",
  "/lead-capture",
  "/leads/register",
];

// const ALLOW_DEV_STEP_ONE_SKIP = import.meta.env.DEV;

// set to true or false for testing all steps in sign up
const ALLOW_DEV_STEP_ONE_SKIP = false;


// ─── Ticker config ───────────────────────────────────────────────────────────
// To disable the animation, set TICKER_ENABLED to false.
// The first word in TICKER_WORDS will be shown as static text.
const TICKER_ENABLED = true;
// const TICKER_WORDS = ["Facility Management,", "Property Management,", "Maintenance Management,", "Tenant Management,"];
// const TICKER_WORDS = ["Facility", "Property", "Maintenance", "Tenant", "Vendor", "Compliance"];
const TICKER_WORDS = ["Facility", "Property", "Maintenance", "System", "Tenant", "Vendor", "Compliance"];
const TICKER_INTERVAL_MS = 3000; // time each word is visible
const TICKER_DURATION_S = 0.38;  // gsap animation duration

export default function Register() {
  const formRef = useRef(null);
  const email = useEmail();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [regions, setRegions] = useState([]);
  const [mailHost, setMailHost] = useState();

  const [formValid, setFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successObj, setSuccessObj] = useState();

  const [failed, setFailed] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [step, setStep] = useState(1);
  const [leadCaptureLoading, setLeadCaptureLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  // ─── Ticker refs ─────────────────────────────────────────────────────────
  const tickerWordRef = useRef(null);
  const tickerIndexRef = useRef(0);
  const tickerTimerRef = useRef(null);

  const [draft, setDraft] = useState({
    compName: "",
    division: "",
    username: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordc: "",

    addressLabel: "Address",
    addressOption: null,
    addressTouched: false,

    clientHost: "",
    selectedRegionLabel: "",
  });

  // Animate the ticker word in/out like a split-flap train board (top → bottom).
  useEffect(() => {
    if (!TICKER_ENABLED || !tickerWordRef.current) return;

    const el = tickerWordRef.current;

    const cycle = () => {
      // Animate current word out (slide down + fade)
      gsap.to(el, {
        y: 18,
        opacity: 0,
        duration: TICKER_DURATION_S,
        ease: "power2.in",
        onComplete: () => {
          tickerIndexRef.current =
            (tickerIndexRef.current + 1) % TICKER_WORDS.length;
          el.textContent = TICKER_WORDS[tickerIndexRef.current];

          // Snap to top position off-screen, then slide in
          gsap.fromTo(
            el,
            { y: -18, opacity: 0 },
            { y: 0, opacity: 1, duration: TICKER_DURATION_S, ease: "power2.out" }
          );
        },
      });
    };

    // Set initial state
    gsap.set(el, { y: 0, opacity: 1 });
    el.textContent = TICKER_WORDS[0];

    tickerTimerRef.current = setInterval(cycle, TICKER_INTERVAL_MS);
    return () => clearInterval(tickerTimerRef.current);
  }, []);

  // Keep logo and styles in sync with global theme class toggled by DarkModeToggle.
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Persist lead details right after step 1 so contact data is captured early.
  const captureLeadStepOne = async () => {
    const payload = {
      name: draft.name?.trim(),
      email: draft.email?.trim(),
      source: "website-register-step-1",
    };

    if (!payload.name || !payload.email) {
      throw new Error("Please enter your full name and email.");
    }

    let lastError = new Error("Lead capture endpoint unavailable.");

    for (const endpoint of LEAD_CAPTURE_ENDPOINTS) {
      try {
        const resp = await fetch(`${CLIENTS_SVR_URL}${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": CLIENTS_SVR_KEY,
          },
          body: JSON.stringify(payload),
        });

        const data = await resp.json().catch(() => null);
        if (resp.ok && (data?.ok ?? true)) {
          setLeadCaptured(true);
          return;
        }

        lastError = new Error(data?.error || data?.message || "Unable to save lead.");
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("Unable to save lead.");
      }
    }

    throw lastError;
  };

  const updateDraft = (patch) =>
    setDraft((d) => ({
      ...d,
      ...patch,
    }));

  const validateForm = () => {
    const pw = draft.password || "";
    const pwc = draft.passwordc || "";
    const passwordsMatch = pw.length > 0 && pw === pwc;

    const requiredStateReady =
      draft.addressLabel !== "Address" &&
      !!draft.clientHost &&
      !!draft.selectedRegionLabel;

    const requiredInputsReady =
      !!draft.compName?.trim() &&
      !!draft.division?.trim() &&
      !!draft.name?.trim() &&
      !!draft.phone?.trim() &&
      !!draft.email?.trim() &&
      !!draft.password &&
      !!draft.passwordc;

    setFormValid(
      Boolean(passwordsMatch && requiredStateReady && requiredInputsReady),
    );
  };

  const isStepOneValid =
    !!draft.name?.trim() && !!draft.email?.trim();

  const isStepTwoValid =
    !!draft.compName?.trim() &&
    !!draft.phone?.trim() &&
    !!draft.division?.trim() &&
    !!draft.clientHost &&
    draft.addressLabel !== "Address";

  const isStepThreeValid =
    !!draft.password &&
    !!draft.passwordc &&
    draft.password === draft.passwordc;

  useEffect(() => {
    const loadRegions = async () => {
      try {
        if (!CLIENTS_SVR_URL) throw new Error("Missing VITE_CLIENTS_SVR_URL");
        if (!CLIENTS_SVR_KEY) throw new Error("Missing VITE_CLIENTS_SVR_KEY");

        const resp = await fetch(`${CLIENTS_SVR_URL}/regions`, {
          headers: { "X-API-KEY": CLIENTS_SVR_KEY },
        });

        const data = await resp.json().catch(() => null);
        if (!resp.ok || !data?.ok)
          throw new Error(data?.error || "Failed to load regions");

        setRegions(Array.isArray(data.records) ? data.records : []);
      } catch (e) {
        console.error("Error getting regions:", e);
        setError(
          e?.message ||
            "Unable to load regions right now. Please try again later.",
        );
      }
    };

    loadRegions();
  }, []);

  useEffect(() => {
    if (!draft.clientHost) {
      updateDraft({ selectedRegionLabel: "" });
      setMailHost(undefined);
      return;
    }

    const mh = regions.find((reg) => reg.value === draft.clientHost);
    updateDraft({ selectedRegionLabel: mh?.label || "" });
    setMailHost(mh?.mail_server);
  }, [draft.clientHost, regions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    draft.compName,
    draft.division,
    draft.name,
    draft.phone,
    draft.email,
    draft.username,
    draft.password,
    draft.passwordc,
    draft.addressLabel,
    draft.clientHost,
    draft.selectedRegionLabel,
    loading,
  ]);

  const onchangeAddress = (option) => {
    updateDraft({
      addressTouched: true,
      addressOption: option || null,
      addressLabel: option?.label || "Address",
    });
    setError("");
  };

  const onSelectRegion = (e) => {
    setError("");
    const host = e?.target?.value || "";
    updateDraft({ clientHost: host });
  };

  // Temporary dev-only bypass to continue working on step 2 while API is unavailable.
  const skipStepOneForDev = () => {
    setError("");
    setStep(2);
  };

  // Temporary dev-only bypass to skip account details while testing step 3 UI.
  const skipStepTwoForDev = () => {
    setError("");
    setStep(3);
  };

  // Temporary dev-only bypass to skip final password step while polishing UX.
  const skipStepThreeForDev = () => {
    setError("");
    setFailed(false);
    setFailMessage("");
    setSuccessObj({
      name: draft.name,
      email: draft.email,
      clientName: draft.compName,
    });
    setSuccess(true);
  };

  // Step 1 transitions only after lead data is accepted by backend.
  const continueFromStepOne = async () => {
    setError("");

    if (!isStepOneValid) {
      setError("Please complete your full name and email.");
      return;
    }

    if (!CLIENTS_SVR_URL || !CLIENTS_SVR_KEY) {
      setError(
        "Registration service is not configured (missing VITE_CLIENTS_SVR_URL or VITE_CLIENTS_SVR_KEY).",
      );
      return;
    }

    try {
      setLeadCaptureLoading(true);
      if (!leadCaptured) await captureLeadStepOne();
      setStep(2);
    } catch (err) {
      if (ALLOW_DEV_STEP_ONE_SKIP) {
        console.warn("Lead capture failed in dev, skipping Step 1:", err);
        setError("");
        setStep(2);
        return;
      }

      setError(
        err?.message ||
          "We could not save your contact info yet. Please try again.",
      );
    } finally {
      setLeadCaptureLoading(false);
    }
  };

  const continueFromStepTwo = async () => {
    setError("");

    if (!isStepTwoValid) {
      setError("Please complete client name, address, phone, region, and division.");
      return;
    }

    setStep(3);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setFailed(false);
    setFailMessage("");

    validateForm();

    const snapshot = { ...draft };
    setDraft(snapshot);

    if (!leadCaptured) {
      try {
        await captureLeadStepOne();
      } catch (err) {
        setError(err?.message || "Unable to save your contact details.");
        return;
      }
    }

    if (snapshot.addressLabel === "Address") {
      setError("Please provide a valid address.");
      return;
    }
    if (!snapshot.clientHost) {
      setError("Please select a region.");
      return;
    }
    if (!CLIENTS_SVR_URL || !CLIENTS_SVR_KEY) {
      setError(
        "Registration service is not configured (missing VITE_CLIENTS_SVR_URL or VITE_CLIENTS_SVR_KEY).",
      );
      return;
    }
    if ((snapshot.password || "") !== (snapshot.passwordc || "")) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        regionHost: snapshot.clientHost,
        compName: snapshot.compName,
        division: snapshot.division,
        ...(snapshot.username?.trim() ? { username: snapshot.username.trim() } : {}),
        name: snapshot.name,
        email: snapshot.email,
        phone: snapshot.phone,
        address: snapshot.addressLabel,
        password: snapshot.password,
      };

      const resp = await fetch(`${CLIENTS_SVR_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": CLIENTS_SVR_KEY,
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json().catch(() => null);

      if (!resp.ok || !data?.ok) {
        const msg =
          data?.error ||
          data?.details?.message ||
          data?.details ||
          data?.message ||
          "Registration failed.";
        throw new Error(msg);
      }

      email.sendWelcomeEmail(
        mailHost,
        snapshot.compName,
        snapshot.email,
        "Welcome to Predictaf!",
        snapshot.name,
        snapshot.clientHost,
      );

      setSuccessObj({
        name: snapshot.name,
        email: snapshot.email,
        clientName: snapshot.compName,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Registration failed:", err);
      setFailed(true);
      setFailMessage(
        err?.message ||
          "Registration failed due to an unexpected error. No changes were saved.",
      );
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    window.location.href = "/";
  };

  const retry = () => {
    setFailed(false);
    setFailMessage("");
    setError("");
  };

  return (
    <div className="min-h-screen flex bg-backgroundPrimary dark:bg-backgroundPrimary-dark">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={step === 1 ? RegisterImage : RegisterImage2}
          alt="Predictaf registration"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" /> */}
        <div className="absolute inset-0" />

        {step === 1 && (
          <div className="absolute left-[60px] bottom-[320px] z-10">
            <h2 className="font-['Funnel_Display'] text-5xl font-light leading-[1.2] tracking-normal text-white">
              {/* Ticker word — swap TICKER_ENABLED to false to pin "Facility" */}
              <span
                ref={tickerWordRef}
                style={{ display: "inline-block", minWidth: "" }}
              >
                {TICKER_WORDS[0]}
              </span>
              {" "}
              <span>Management,</span>
              <br />
              Simplified.
              {/* Management Simplified */}
            </h2>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-[100px] py-10 lg:py-12 flex flex-col bg-backgroundSecondary dark:bg-backgroundSecondary-dark">
        <div className="flex items-center justify-between">
          <a href="/" className="inline-flex items-center" aria-label="Go home">
            <img
              src={isDarkMode ? LogoDark : LogoLight}
              alt="Predictaf"
              className="h-10 w-auto"
            />
          </a>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <a href="/login" aria-label="Log in">
              <PafButton type="button" variant="secondary" size="small">
                Log In
              </PafButton>
            </a>
          </div>
        </div>

        {success ? (
          <div className="my-auto mx-auto w-full max-w-xl rounded-2xl border border-borderPrimary dark:border-borderPrimary-dark bg-backgroundPrimary dark:bg-backgroundPrimary-dark p-8">
            <div className="flex flex-col items-start gap-3">
             
              <div>
                <SquareCheck className="w-10 h-10 text-brandPrimary mb-2" />
              </div>

              <div>
                <h1 className="font-['Funnel_Display'] text-3xl font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                  Sign Up Complete
                </h1>
                <p className="mt-3 font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                  Registration for {successObj?.clientName} is complete.
                  We sent a confirmation email to {successObj?.email}.
                </p>
                <p className="mt-2 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                  Check your 
                  <TextHighlight> spam folder</TextHighlight> if you do not see it within 30 minutes.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <PafButton
                type="button"
                variant="primary"
                size="large"
                onClick={goHome}
                className="w-full sm:w-72"
              >
                Return to 
              </PafButton>
            </div>
          </div>
        ) : failed ? (
          <div className="my-auto mx-auto w-full max-w-xl rounded-2xl border border-borderTagFalse dark:border-borderTagFalse-dark bg-backgroundTagFalse dark:bg-backgroundTagFalse-dark p-8">
            <h1 className="font-['Funnel_Display'] text-3xl font-normal leading-normal tracking-normal text-textTagFalse dark:text-textTagFalse-dark">
              Registration Failed
            </h1>
            <p className="mt-4 font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textTagFalse dark:text-textTagFalse-dark">
              {failMessage ||
                "We could not create your account. No changes were saved."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <PafButton
                type="button"
                variant="primary"
                size="medium"
                onClick={retry}
              >
                Try Again
              </PafButton>
              <PafButton
                type="button"
                variant="secondary"
                size="medium"
                onClick={goHome}
              >
                Return Home
              </PafButton>
            </div>
          </div>
        ) : (
          <div className="my-auto max-w-[600px] w-full">
            <div className="mb-8">
              <h1 className="font-['Funnel_Display'] text-3xl font-normal leading-[1.2] tracking-normal text-textPrimary dark:text-textPrimary-dark">
                Sign Up for Free
              </h1>
            </div>

            <form ref={formRef} onSubmit={submit}>
              {error && (
                <div className="mb-5 p-3 rounded-xl border border-borderTagFalse dark:border-borderTagFalse-dark bg-backgroundTagFalse dark:bg-backgroundTagFalse-dark">
                  <p className="font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textTagFalse dark:text-textTagFalse-dark">
                    {error}
                  </p>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                      Full Name <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={draft.name}
                      onChange={(e) => updateDraft({ name: e.target.value })}
                      className="w-full rounded-[4px] border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2.5 text-sm font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      placeholder="First and Last Name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                          Email <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={draft.email}
                      onChange={(e) => updateDraft({ email: e.target.value })}
                      className="w-full rounded-[4px] border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2.5 text-sm font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      placeholder="Email Address"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <PafButton
                      type="button"
                      variant="primary"
                      size="large"
                      onClick={continueFromStepOne}
                      disabled={!isStepOneValid || leadCaptureLoading}
                      iconRight={<ArrowRight className="w-5 h-5" />}
                     
                    >
                      {leadCaptureLoading ? "Saving..." : "Continue"}
                    </PafButton>
                  </div>

                  {ALLOW_DEV_STEP_ONE_SKIP && (
                    <div className="pt-2">
                      <PafButton
                        type="button"
                        variant="secondary"
                        size="medium"
                        onClick={skipStepOneForDev}
                      >
                        Skip this step (Dev)
                      </PafButton>
                    </div>
                  )}

                  <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                    By clicking continue, you agree to the {" "}
                    <a
                      href="https://pafadminpanel-east.onrender.com/terms"
                      className="underline"
                      target="t&c"
                      rel="noreferrer"
                    >
                      Terms
                    </a>
                  </p>

                  <div className="pt-1 space-y-2">
                    <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark pb-2">
                      Need more information first?
                    </p>
                    <a 
                    // href="/support" 
                    href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7"
                    target="_blank"
                    aria-label="Schedule a demo">
                      <PafButton
                        type="button"
                        variant="secondary"
                        size="medium"
                        iconLeft={< Calendar className="w-5 h-5" />}
                     
                      >
                        Schedule a Demo
                      </PafButton>
                    </a>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    {/* <h2 className="font-['Funnel_Display'] text-3xl font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                      Account Details
                    </h2> */}
                  </div>

                  <div>
                    <label
                      htmlFor="compName"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                          Client Name <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="compName"
                      type="text"
                      value={draft.compName}
                      onChange={(e) => updateDraft({ compName: e.target.value })}
                      className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      placeholder=""
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                          Address <span className="text-textTagFalse">*</span>
                    </label>
                    <GooglePlacesAutocomplete
                      apiKey={API_KEY}
                      selectProps={{
                        placeholder: "Address",
                        value: draft.addressOption,
                        onChange: onchangeAddress,
                        onFocus: () => updateDraft({ addressTouched: true }),
                        styles: {
                          control: (provided) => ({
                            ...provided,
                            borderRadius: "6px",
                            borderColor: "#d9d9d9",
                            minHeight: "50px",
                            boxShadow: "none",
                          }),
                        },
                      }}
                    />
                    {(submitted || draft.addressTouched) &&
                      draft.addressLabel === "Address" && (
                        <p className="mt-2 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-colorError">
                          Address is required.
                        </p>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                          Phone Number <span className="text-textTagFalse">*</span>
                    </label>
                    <InputMask
                      mask="(999) 999-9999"
                      maskChar=" "
                      alwaysShowMask={false}
                      value={draft.phone}
                      onChange={(e) => updateDraft({ phone: e.target.value })}
                    >
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          type="text"
                          id="phone"
                          required
                          className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                          placeholder="(555) 123-4567"
                        />
                      )}
                    </InputMask>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="region"
                        className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                      >
                            Region <span className="text-textTagFalse">*</span>
                      </label>
                      <select
                        id="region"
                        onChange={onSelectRegion}
                        value={draft.clientHost}
                        required
                        className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      >
                        <option value="">Select a Region</option>
                        {regions.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="division"
                        className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                      >
                        Default Division
                      </label>
                      <input
                        id="division"
                        type="text"
                        value={draft.division}
                        onChange={(e) => updateDraft({ division: e.target.value })}
                        className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                        placeholder="ie Downtown"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <PafButton
                      type="button"
                      variant="primary"
                      size="large"
                      onClick={continueFromStepTwo}
                      disabled={!isStepTwoValid}
                      iconRight={<ArrowRight className="w-5 h-5" />}
                    >
                      Continue
                    </PafButton>
                  </div>

                  <div className="pt-1">
                    <PafButton
                      type="button"
                      variant="secondary"
                      size="medium"
                      onClick={() => setStep(1)}
                      iconLeft={<ArrowLeft className="w-5 h-5" />}
                    >
                      Back
                    </PafButton>
                    {ALLOW_DEV_STEP_ONE_SKIP && (
                      <PafButton
                        type="button"
                        variant="secondary"
                        size="medium"
                        onClick={skipStepTwoForDev}
                      >
                        Skip this step (Dev)
                      </PafButton>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  {/* <h2 className="font-['Funnel_Display'] text-3xl font-normal leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark">
                    Confirm Password
                  </h2> */}

                  {/*
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                      User Name <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={draft.username}
                      onChange={(e) => updateDraft({ username: e.target.value })}
                      className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      required
                    />
                  </div>
                  */}

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                          Password <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      value={draft.password}
                      onChange={(e) => updateDraft({ password: e.target.value })}
                      className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="passwordc"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                          Confirm Password <span className="text-textTagFalse">*</span>
                    </label>
                    <input
                      id="passwordc"
                      type="password"
                      value={draft.passwordc}
                      onChange={(e) => updateDraft({ passwordc: e.target.value })}
                      className="w-full rounded-md border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-3 text-base font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-2 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      required
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <PafButton
                      type="button"
                      variant="secondary"
                      size="large"
                      onClick={() => setStep(2)}
                      iconLeft={<ArrowLeft className="w-5 h-5" />}
                    >
                      Back
                    </PafButton>
                    <PafButton
                      type="submit"
                      variant="primary"
                      size="large"
                      disabled={!formValid || !isStepThreeValid || loading}
                      iconLeft={< SquareCheck className="w-5 h-5" />}
                    >
                      {loading ? "Submitting..." : "Sign Up"}
                    </PafButton>
                    {ALLOW_DEV_STEP_ONE_SKIP && (
                      <PafButton
                        type="button"
                        variant="secondary"
                        size="medium"
                        onClick={skipStepThreeForDev}
                        disabled={loading}
                      >
                        Skip this step (Dev)
                      </PafButton>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        <div className="mt-10 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
          {/* 2026 Predictaf, Inc. All rights reserved. */}
          &copy;  {new Date().getFullYear()} Predictaf, Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
