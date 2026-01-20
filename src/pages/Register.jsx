// Register.jsx (DROP-IN)
// ✅ Persists all inputs across failure screen + retry
// ✅ Controlled form (no more losing values)
// ✅ Uses PAF-Clients-Svr POST /register (server-side PB writes)

import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { useEffect, useMemo, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputMask from "react-input-mask";
import useEmail from "../utils/email";

const API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_PLACES_API;

// ✅ Your Clients Server
const CLIENTS_SVR_URL = (
  import.meta.env.VITE_CLIENTS_SVR_URL ||
  import.meta.env.VITE_CLIENTS_SERVER_URL ||
  ""
).replace(/\/$/, "");

// ✅ API key for requireApiKey middleware
const CLIENTS_SVR_KEY =
  import.meta.env.VITE_CLIENTS_SVR_KEY ||
  import.meta.env.VITE_CLIENTS_API_KEY ||
  import.meta.env.VITE_API_KEY ||
  "";

export const metadata = { title: "Register" };

const termsMsg = "You must agree the Term & Conditions";

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

  // ✅ Draft holds ALL form values so they survive "failed" view and retry
  const [draft, setDraft] = useState({
    compName: "",
    division: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordc: "",
    addressLabel: "Address",
    // keep the actual GooglePlaces option so we can show it again
    addressOption: null,
    addressTouched: false,

    // region
    clientHost: "",
    selectedRegionLabel: "",

    // terms
    termsRead: false,
    isChecked: false,
  });

  const updateDraft = (patch) =>
    setDraft((d) => ({
      ...d,
      ...patch,
    }));

  const selectedRegion = useMemo(() => {
    if (!draft.clientHost) return null;
    return regions.find((r) => r.value === draft.clientHost) || null;
  }, [regions, draft.clientHost]);

  const validateForm = () => {
    const pw = draft.password || "";
    const pwc = draft.passwordc || "";
    const passwordsMatch = pw.length > 0 && pw === pwc;

    const requiredStateReady =
      draft.addressLabel !== "Address" &&
      !!draft.clientHost &&
      !!draft.selectedRegionLabel &&
      draft.termsRead &&
      draft.isChecked;

    // Basic required inputs (mirrors your required attr usage)
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

  // keep mailHost and selectedRegionLabel in sync when clientHost/regions change
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
    draft.password,
    draft.passwordc,
    draft.addressLabel,
    draft.clientHost,
    draft.selectedRegionLabel,
    draft.isChecked,
    draft.termsRead,
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

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setFailed(false);
    setFailMessage("");

    validateForm();

    // ✅ snapshot current state (already in draft, but keeps intent explicit)
    const snapshot = { ...draft };
    setDraft(snapshot);

    if (!snapshot.termsRead || !snapshot.isChecked) {
      setError(termsMsg);
      return;
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
          "Registration failed.";
        throw new Error(msg);
      }

      email.sendWelcomeEmail(
        mailHost,
        snapshot.compName,
        snapshot.email,
        "Welcome to PAF!",
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

  // ✅ Retry keeps draft values; only clears error UI
  const retry = () => {
    setFailed(false);
    setFailMessage("");
    setError("");
    // keep submitted=true so required messages can still show if needed
  };

  return (
    <AuthLayout title="Register a new account">
      {success ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center bg-white shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              🎉 Thank You{successObj?.name ? `, ${successObj.name}` : ""}!
            </h1>
            <p className="text-gray-700 mb-2">
              Your registration for{" "}
              <span className="font-medium">{successObj?.clientName}</span> was
              successful.
            </p>
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to{" "}
              <strong>{successObj?.email}</strong>.
            </p>
            <p>
              Check your spam folder if you don&apos;t see it within 30 minutes.
              If you still can&apos;t find it, contact us at
              support@predictiveaf.com
            </p>
            <Button
              type="button"
              onClick={goHome}
              className="w-full bg-primary hover:bg-primary/80"
            >
              Return to Home
            </Button>
          </div>
        </div>
      ) : failed ? (
        <div className="flex flex-col items-center justify-center bg-gray-50 px-4 ">
          <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">
              😞 Registration Failed
            </h1>
            <p className="text-gray-700 mb-6">
              {failMessage ||
                "We couldn't create your account. No changes were saved."}
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={retry}
                className="w-full bg-[#4c6c99] hover:bg-[#5391e9]/80 rounded-md"
              >
                Try Again
              </Button>
              <Button
                type="button"
                onClick={goHome}
                className="w-full bg-[#4c6c99] hover:bg-[#5391e9]/80 rounded-md"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit}>
          {error && (
            <div className="text-lg text-red-500 text-center mb-5">{error}</div>
          )}

          <div className="space-y-6">
            <TextField
              label="Client Name"
              name="compName"
              type="text"
              required
              value={draft.compName}
              onChange={(e) => updateDraft({ compName: e.target.value })}
            />

            <div className="mt-1">
              <label className="space-y-6 font-semibold">Region</label>
              <select
                onChange={onSelectRegion}
                value={draft.clientHost}
                required
                className="mt-2 block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
              >
                <option value="" className="text-gray-100 font-bold">
                  Select a region
                </option>
                {regions.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-1 text-gray-500">
              <GooglePlacesAutocomplete
                apiKey={API_KEY}
                selectProps={{
                  placeholder: "Address",
                  value: draft.addressOption, // ✅ restores selected address
                  onChange: onchangeAddress,
                  onFocus: () => updateDraft({ addressTouched: true }),
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "0.375rem",
                      borderColor: "#d1d5db",
                      "&:hover": { borderColor: "#4f46e5" },
                    }),
                  },
                }}
              />
              {(submitted || draft.addressTouched) &&
                draft.addressLabel === "Address" && (
                  <p className="text-red-500">Address is required</p>
                )}
            </div>

            <TextField
              label="Default Division (Ex: Downtown)"
              name="division"
              type="text"
              required
              value={draft.division}
              onChange={(e) => updateDraft({ division: e.target.value })}
            />
            <TextField
              label="Full Name"
              name="name"
              required
              value={draft.name}
              onChange={(e) => updateDraft({ name: e.target.value })}
            />

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
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
                    name="phone"
                    id="phone"
                    required
                    className="block w-full appearance-none rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500"
                    placeholder="(123) 456-7890"
                  />
                )}
              </InputMask>
            </div>

            <TextField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={draft.email}
              onChange={(e) => updateDraft({ email: e.target.value })}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={draft.password}
              onChange={(e) => updateDraft({ password: e.target.value })}
            />
            <TextField
              label="Confirm Password"
              name="passwordc"
              type="password"
              required
              value={draft.passwordc}
              onChange={(e) => updateDraft({ passwordc: e.target.value })}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  disabled={!draft.termsRead}
                  checked={draft.isChecked}
                  onChange={(e) => updateDraft({ isChecked: e.target.checked })}
                />
                <label
                  htmlFor="terms"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  I agree to{" "}
                  <a
                    href="https://pafadminpanel-east.onrender.com/terms"
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    target="t&c"
                    rel="noreferrer"
                    onClick={() => {
                      updateDraft({ termsRead: true, isChecked: false });
                      setError("");
                    }}
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            color="cyan"
            className="mt-8 w-full bg-[#334155] hover:bg-[#334155]/80 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md"
            disabled={!formValid || loading}
          >
            {loading ? "Registering..." : "Register Account"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
