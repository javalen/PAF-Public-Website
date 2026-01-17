// Register.jsx (DROP-IN)
// ✅ Uses PAF-Clients-Svr POST /register (server-side PB writes)
// ✅ Removes PocketBase + masterpd + region admin creds from browser
// ✅ Keeps region dropdown + address + terms flow
// ✅ Frontend only validates + calls server

import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputMask from "react-input-mask";

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

  const [error, setError] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("Address");
  const [regions, setRegions] = useState([]);
  const [selectedRegionLabel, setSelectedRegionLabel] = useState("");
  const [clientHost, setClientHost] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successObj, setSuccessObj] = useState();

  const [failed, setFailed] = useState(false);
  const [failMessage, setFailMessage] = useState("");

  const onchange = (e) => {
    setAddressTouched(true);
    setAddress(e?.label || "Address");
  };

  const setBackEndUrl = async (selectedOption) => {
    setError("");

    const host = selectedOption?.target?.value || "";
    if (!host) {
      setSelectedRegionLabel("");
      setClientHost("");
      validateForm();
      return;
    }

    const mh = regions.find((reg) => reg.value === host);
    setSelectedRegionLabel(mh?.label || "");
    setClientHost(host);
    validateForm();
  };

  const validateForm = () => {
    const formEl = formRef.current;
    if (!formEl) return;

    const htmlValid = formEl.checkValidity();
    const pw = formEl.elements?.password?.value || "";
    const pwc = formEl.elements?.passwordc?.value || "";
    const passwordsMatch = pw.length > 0 && pw === pwc;

    const requiredStateReady =
      address !== "Address" &&
      !!clientHost &&
      !!selectedRegionLabel &&
      termsRead &&
      isChecked;

    setFormValid(Boolean(htmlValid && passwordsMatch && requiredStateReady));
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
        if (!resp.ok || !data?.ok) {
          throw new Error(data?.error || "Failed to load regions");
        }

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
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, clientHost, selectedRegionLabel, isChecked, termsRead, loading]);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    setFailed(false);
    setFailMessage("");

    validateForm();

    if (!termsRead || !isChecked) {
      setError(termsMsg);
      return;
    }
    if (!formRef.current?.checkValidity()) {
      setError("Please complete all required fields.");
      return;
    }
    if (address === "Address") {
      setError("Please provide a valid address.");
      return;
    }
    if (!clientHost) {
      setError("Please select a region.");
      return;
    }
    if (!CLIENTS_SVR_URL || !CLIENTS_SVR_KEY) {
      setError(
        "Registration service is not configured (missing VITE_CLIENTS_SVR_URL or VITE_CLIENTS_SVR_KEY).",
      );
      return;
    }

    const registration = e.target.elements;

    const password = registration.password.value || "";
    const passwordc = registration.passwordc.value || "";
    if (password !== passwordc) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        regionHost: clientHost,
        compName: registration.compName.value,
        division: registration.division.value,
        name: registration.name.value,
        email: registration.email.value,
        phone: registration.phone.value,
        address,
        password,
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
        // prefer server-provided message; fall back to generic
        const msg =
          data?.error ||
          data?.details?.message ||
          data?.details ||
          "Registration failed.";
        throw new Error(msg);
      }

      setSuccessObj({
        name: registration.name.value,
        email: registration.email.value,
        clientName: registration.compName.value,
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
    // your app previously used navigation.navigate("/"); in a web app this is usually:
    window.location.href = "/";
  };

  const retry = () => {
    setFailed(false);
    setFailMessage("");
    setError("");
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
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
                className="w-full bg-primary hover:bg-primary/80"
              >
                Try Again
              </Button>
              <Button
                type="button"
                onClick={goHome}
                className="w-full bg-slate-200 hover:bg-slate-300"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={submit}
          onInput={validateForm}
          onChange={validateForm}
        >
          {error && (
            <div className="text-lg text-red-500 text-center mb-5">{error}</div>
          )}

          <div className="space-y-6">
            <TextField
              label="Client Name"
              name="compName"
              type="text"
              required
            />

            <div className="mt-1">
              <label className="space-y-6 font-semibold">Region</label>
              <select
                onChange={setBackEndUrl}
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
                  onChange: onchange,
                  onFocus: () => setAddressTouched(true),
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
              {(submitted || addressTouched) && address === "Address" && (
                <p className="text-red-500">Address is required</p>
              )}
            </div>

            <TextField
              label="Default Division (Ex: Downtown)"
              name="division"
              type="text"
              required
            />
            <TextField label="Full Name" name="name" required />

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
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
            <TextField
              label="Confirm Password"
              name="passwordc"
              type="password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  disabled={!termsRead}
                  checked={isChecked}
                  onChange={(e) => setChecked(e.target.checked)}
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
                      setTermsRead(true);
                      setChecked(false);
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
