import { useEffect, useState } from "react";
import PafButton from "../components/ui/PafButton";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import LogoLight from "../assets/predictaf-logo.svg";
import LogoDark from "../assets/predictaf-logo-dark.svg";
import BackGround1 from "../assets/bg-1.jpg";
import BackGround2 from "../assets/bg-2.jpg";
import BackGround3 from "../assets/bg-3.jpg";
import BackGround4 from "../assets/bg-4.jpg";
import appStoreBadge from "../assets/appStore.svg";
import googlePlayBadge from "../assets/googlePlay.svg";
import { ArrowRight, Pause, Play, Calendar } from "lucide-react";

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

const RECOVERY_SUCCESS_MESSAGE =
  "If we found a match, we sent your organization login details.";

const BACKGROUND_IMAGES = [BackGround1, BackGround2, BackGround3, BackGround4];
const ANDROID_APP_URL =
  "https://play.google.com/store/apps/details?id=com.predictiveaf.mobile&pcampaignid=web_share";
const IOS_APP_URL = "#";
const MOBILE_APP_OPEN_URL = "#";

function normalizeShortname(s = "") {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function normalizeEmail(s = "") {
  return String(s || "")
    .trim()
    .toLowerCase();
}

export default function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const [draft, setDraft] = useState({ shortname: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showShortnameRecovery, setShowShortnameRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  // Keep logo in sync with global dark-mode class managed by DarkModeToggle.
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Fade between gallery images on desktop; supports pause/play.
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const updateDraft = (patch) => {
    setDraft((current) => ({ ...current, ...patch }));
    setError("");
  };

  const handleRecoverShortname = async () => {
    const email = normalizeEmail(recoveryEmail);

    setRecoveryError("");
    setRecoveryMessage("");

    if (!email) {
      setRecoveryError("Please enter your email address.");
      return;
    }

    if (!CLIENTS_SVR_URL) {
      setRecoveryError("Recovery service is not configured. Please contact support.");
      return;
    }

    setRecoveryLoading(true);

    try {
      const resp = await fetch(`${CLIENTS_SVR_URL}/api/auth/recover-shortname`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await resp.json().catch(() => null);

      setRecoveryMessage(data?.message || RECOVERY_SUCCESS_MESSAGE);
      setRecoveryEmail("");
    } catch (err) {
      console.error("Shortname recovery failed:", err);
      setRecoveryMessage(RECOVERY_SUCCESS_MESSAGE);
      setRecoveryEmail("");
    } finally {
      setRecoveryLoading(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    const shortname = normalizeShortname(draft.shortname);
    const email = normalizeEmail(draft.email);

    if (!shortname || !email) {
      setError("Please enter your shortname and email address.");
      return;
    }

    if (!CLIENTS_SVR_URL || !CLIENTS_SVR_KEY) {
      setError("Login service is not configured. Please contact support.");
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch(`${CLIENTS_SVR_URL}/client-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": CLIENTS_SVR_KEY,
        },
        body: JSON.stringify({ shortname, email }),
      });

      const data = await resp.json().catch(() => null);

      if (!resp.ok || !data?.ok || !data?.loginUrl) {
        throw new Error(
          data?.error ||
            "We could not find a matching client for that shortname and email.",
        );
      }

      window.location.assign(data.loginUrl);
    } catch (err) {
      console.error("Client login failed:", err);
      setError(
        err?.message ||
          "We could not find a matching client for that shortname and email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-backgroundPrimary dark:bg-backgroundPrimary-dark">
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}

        <div className="absolute bottom-6 left-6 z-10">
          <PafButton
            type="button"
            variant="primary"
            size="xs"
            iconOnly
            iconLeft={
              isCarouselPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )
            }
            onClick={() => setIsCarouselPaused((prev) => !prev)}
            aria-label={isCarouselPaused ? "Play slideshow" : "Pause slideshow"}
            className="bg-backgroundPrimary dark:bg-backgroundPrimary-dark backdrop-blur-sm hover:bg-backgroundPrimary dark:hover:bg-backgroundPrimary-dark"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-[100px] py-10 lg:py-12 flex flex-col justify-between bg-backgroundSecondary dark:bg-backgroundSecondary-dark">
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
            <a href="/register" aria-label="Sign up">
              <PafButton type="button" variant="primary" size="small">
                Sign Up
              </PafButton>
            </a>
          </div>
        </div>

        <div className="my-auto max-w-[600px] w-full">
          <div className="mb-8">
            <h1 className="font-['Funnel_Display'] text-3xl font-normal leading-[1.2] tracking-normal text-textPrimary dark:text-textPrimary-dark">
              Log In
            </h1>
          </div>

          <form ref={null} onSubmit={submit}>
            {error && (
              <div className="mb-5 p-3 rounded-xl border border-borderTagFalse dark:border-borderTagFalse-dark bg-backgroundTagFalse dark:bg-backgroundTagFalse-dark">
                <p className="font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textTagFalse dark:text-textTagFalse-dark">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="shortname"
                  className="mb-2 block text-base font-normal font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                >
                  Client Shortname <span className="text-textTagFalse">*</span>
                </label>
                <input
                  id="shortname"
                  type="text"
                  autoComplete="organization"
                  required
                  value={draft.shortname}
                  onChange={(event) => updateDraft({ shortname: event.target.value })}
                  className="w-full rounded-[4px] border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2.5 text-sm font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                  placeholder="Shortname"
                />
              </div>

              <div className="-mt-2 flex justify-end">
                <PafButton
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={() => {
                    setShowShortnameRecovery((current) => !current);
                    setRecoveryError("");
                    setRecoveryMessage("");
                  }}
                  // className="!bg-transparent !border-0 !px-0 !py-0 text-brandPrimary dark:text-brandPrimary-dark hover:underline"
                >
                  {showShortnameRecovery ? "Hide shortname recovery" : "Forgot shortname?"}
                </PafButton>
              </div>

              {showShortnameRecovery && (
                <div className="rounded-xl border border-borderSecondary dark:border-borderSecondary-dark p-4 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium font-['Roboto'] text-textPrimary dark:text-textPrimary-dark leading-normal tracking-normal">
                      Recover your client shortname
                    </div>
                    <div className="text-sm font-normal font-['Roboto'] text-textSecondary dark:text-textSecondary-dark leading-normal tracking-normal">
                      Enter the email address associated with your organization.
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="recoveryEmail"
                      className="mb-2 block text-sm font-medium font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark"
                    >
                      {/* Email Address */}
                    </label>
                    <input
                      id="recoveryEmail"
                      type="email"
                      value={recoveryEmail}
                      onChange={(event) => {
                        setRecoveryEmail(event.target.value);
                        setRecoveryError("");
                        setRecoveryMessage("");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleRecoverShortname();
                        }
                      }}
                      autoComplete="email"
                      disabled={recoveryLoading}
                      className="w-full rounded-[4px] border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2.5 text-sm font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                      placeholder="name@company.com"
                    />
                  </div>

                  {recoveryError && (
                    <p className="font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textTagFalse dark:text-textTagFalse-dark">
                      {recoveryError}
                    </p>
                  )}

                  {recoveryMessage && (
                    <div className="rounded-xl border border-borderTagTrue dark:border-borderTagTrue-dark bg-backgroundTagTrue dark:bg-backgroundTagTrue-dark p-3">
                      <p className="font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textTagTrue dark:text-textTagTrue-dark">
                        {recoveryMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    <PafButton
                      type="button"
                      variant="primary"
                      size="medium"
                      onClick={handleRecoverShortname}
                      disabled={recoveryLoading}
                    >
                      {recoveryLoading ? "Sending..." : "Recover"}
                    </PafButton>

                    <PafButton
                      type="button"
                      variant="secondary"
                      size="medium"
                      onClick={() => {
                        setShowShortnameRecovery(false);
                        setRecoveryEmail("");
                        setRecoveryError("");
                        setRecoveryMessage("");
                      }}
                    >
                      Cancel
                    </PafButton>
                  </div>
                </div>
              )}

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
                  autoComplete="email"
                  required
                  value={draft.email}
                  onChange={(event) => updateDraft({ email: event.target.value })}
                  className="w-full rounded-[4px] border border-borderSecondary dark:border-borderSecondary-dark bg-backgroundSecondary dark:bg-backgroundSecondary-dark px-3 py-2.5 text-sm font-['Roboto'] leading-normal tracking-normal text-textPrimary dark:text-textPrimary-dark placeholder:text-textTertiary dark:placeholder:text-textTertiary-dark focus:outline-none focus:ring-1 focus:ring-brandSecondary dark:focus:ring-brandSecondary-dark"
                  placeholder="Address"
                />
              </div>

              <div className="pt-2">
                <PafButton
                  type="submit"
                  variant="primary"
                  size="large"
                  iconRight={<ArrowRight className="w-5 h-5" />}
                  disabled={loading}
                >
                  {loading ? "Finding your portal..." : "Continue"}
                </PafButton>
              </div>

              <div className="sm:hidden  lg:block pt-16 space-y-3 ">
                <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-brandPrimary dark:text-brandPrimary-dark pb-2">
                  Don&apos;t have an account? 
                  {/* Sign up today for a FREE Trial. */}
                </p>
                <a href="/register" aria-label="Start a free trial">
                  <PafButton type="button" variant="secondary" size="small" >
                    Start a Free Trial
                  </PafButton>
                </a>
              </div>

              <div className="sm:hidden lg:block">
                <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark pb-2">
                  Need more information?
                </p>
                <a
                  href="https://calendar.app.google/p3Bi6LnTTzgfpo8M7"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Schedule a demo"
                >
                  <PafButton
                    type="button"
                    variant="secondary"
                    size="small"
                    // iconLeft={< Calendar className="w-5 h-5" />}
                  >
                    Schedule a Demo
                  </PafButton>
                </a>
              </div>

            {/* Turned off until mobile app fixed */}

              <div className="lg:hidden border-t border-borderPrimary dark:border-borderPrimary-dark pt-6 space-y-4">
                <p className="font-['Roboto'] text-[18px] font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                  Using the mobile app instead?
                </p>

                <a href={MOBILE_APP_OPEN_URL} aria-label="Open app" className="inline-flex">
                  <PafButton type="button" variant="secondary" size="medium">
                    Open App
                  </PafButton>
                </a>

                <p className="font-['Roboto'] text-base font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
                  Or download the app:
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={ANDROID_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get it on Google Play"
                    className="inline-flex"
                  >
                    <img
                      src={googlePlayBadge}
                      alt="Get it on Google Play"
                      className="h-10 w-auto"
                    />
                  </a>
                  <a
                    href={IOS_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download on the App Store"
                    className="inline-flex"
                  >
                    <img
                      src={appStoreBadge}
                      alt="Download on the App Store"
                      className="h-10 w-auto"
                    />
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-10 font-['Roboto'] text-sm font-normal leading-normal tracking-normal text-textSecondary dark:text-textSecondary-dark">
          &copy; {new Date().getFullYear()} Predictaf, Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
