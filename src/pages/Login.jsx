import { useState } from "react";
import { AuthLayout } from "../components/AuthLayout";
import { TextField } from "../components/Fields";

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

export const metadata = {
  title: "Sign In",
};

export default function Login() {
  const [draft, setDraft] = useState({ shortname: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showShortnameRecovery, setShowShortnameRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);

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
    <AuthLayout
      title="Sign in to your client portal"
      subtitle={
        <>
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-cyan-600">
            Sign up
          </a>{" "}
          for a free trial.
        </>
      }
    >
      <form onSubmit={submit}>
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <TextField
            label="Client shortname"
            name="shortname"
            type="text"
            autoComplete="organization"
            required
            value={draft.shortname}
            onChange={(event) =>
              updateDraft({ shortname: event.target.value })
            }
          />
          <div className="-mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setShowShortnameRecovery((current) => !current);
                setRecoveryError("");
                setRecoveryMessage("");
              }}
              className="text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              {showShortnameRecovery
                ? "Hide shortname recovery"
                : "Forgot shortname?"}
            </button>
          </div>

          {showShortnameRecovery && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                Recover your client shortname
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Enter the email address associated with your organization.
              </p>

              <div className="mt-4">
                <TextField
                  label="Email address"
                  name="recoveryEmail"
                  type="email"
                  autoComplete="email"
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
                  disabled={recoveryLoading}
                />
              </div>

              {recoveryError && (
                <div className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {recoveryError}
                </div>
              )}

              {recoveryMessage && (
                <div className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {recoveryMessage}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRecoverShortname}
                  disabled={recoveryLoading}
                  className="rounded-lg bg-[#334155] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                >
                  {recoveryLoading ? "Sending..." : "Email My Shortname"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowShortnameRecovery(false);
                    setRecoveryEmail("");
                    setRecoveryError("");
                    setRecoveryMessage("");
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-slate-800 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={draft.email}
            onChange={(event) => updateDraft({ email: event.target.value })}
          />
        </div>

        <button
          type="submit"
          className="mt-6 block w-full rounded-lg bg-[#334155] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          disabled={loading}
        >
          {loading ? "Finding your portal..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}
