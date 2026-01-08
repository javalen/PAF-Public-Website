import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import PocketBase from "pocketbase";
import { pbAppClient, masterpd } from "../api/pocketbase";
import { useEffect, useRef, useState } from "react";
import useEmail from "../utils/email";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import InputMask from "react-input-mask";

const API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_PLACES_API;
export const metadata = { title: "Register" };

const termsMsg = "You must agree the Term & Conditions";

export default function Register() {
  const formRef = useRef(null);

  const [error, setError] = useState();
  const [isChecked, setChecked] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = useEmail();
  const [address, setAddress] = useState("Address");
  const [clients, setClients] = useState([]);
  const [regions, setRegions] = useState([]);
  const [mailHost, setMailHost] = useState();
  const [clientDb, setClientDb] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [clientHost, setClientHost] = useState();
  const [success, setSuccess] = useState(false);
  const [successObj, setSuccessObj] = useState();
  const [formValid, setFormValid] = useState(false);
  const [aiServer, setAiServer] = useState();
  const [addressTouched, setAddressTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // ✅ NEW: failure state (separate from inline error)
  const [failed, setFailed] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const mstrUser = import.meta.env.VITE_MSTR_USER;
  const mstrPass = import.meta.env.VITE_MSTR_PASS;
  const rgnUser = import.meta.env.VITE_RGN_USER;
  const rgnPass = import.meta.env.VITE_RGN_PASS;

  const onchange = (e) => {
    setAddressTouched(true);
    setAddress(e?.label || "Address");
  };

  const setBackEndUrl = async (selectedOption) => {
    if (selectedOption?.target?.value) {
      const cdb = new PocketBase(selectedOption.target.value);
      await cdb.admins.authWithPassword(rgnUser, rgnPass);
      setClientDb(cdb);

      const mh = regions.find(
        (reg) => reg.value === selectedOption.target.value
      );
      setAiServer(mh?.ai_server);
      setMailHost(mh?.mail_server);
      setSelectedRegion(mh?.label);
      setClientHost(selectedOption.target.value);
    } else {
      setClientDb(undefined);
      setAiServer(undefined);
      setMailHost(undefined);
      setSelectedRegion(undefined);
      setClientHost(undefined);
    }
  };

  function tokenize(str) {
    return str.split(",");
  }

  // ⚠️ NOTE: pb isn't defined in your snippet. Keep if you have it globally; otherwise swap it.
  const checkIfExist = async (name) => {
    try {
      const record = await clientDb
        .collection("client")
        .getFirstListItem(`name="${name}"`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkIfUserExist = async (email) => {
    try {
      await clientDb.collection("users").getFirstListItem(`email="${email}"`);
      return true;
    } catch (error) {
      return false;
    }
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
      !!clientDb &&
      !!selectedRegion &&
      !!mailHost &&
      termsRead &&
      isChecked;

    setFormValid(Boolean(htmlValid && passwordsMatch && requiredStateReady));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await masterpd.admins.authWithPassword(mstrUser, mstrPass);
        const records = await masterpd.collection("regions").getFullList();
        setRegions(records);
      } catch (error) {
        console.log("Error getting regions", error);
      }

      try {
        const names = await masterpd
          .collection("clients")
          .getFullList({ fields: "name" });
        setClients(names);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    clientDb,
    selectedRegion,
    mailHost,
    isChecked,
    termsRead,
    loading,
  ]);

  // ✅ safe delete helper
  const safeDelete = async (pbInstance, collectionName, id) => {
    if (!pbInstance || !collectionName || !id) return;
    try {
      await pbInstance.collection(collectionName).delete(id);
    } catch (e) {
      // don't throw during rollback
      console.warn(`Rollback delete failed: ${collectionName}(${id})`, e);
    }
  };

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

    const registration = e.target.elements;

    // ✅ Track created records for rollback
    const created = {
      clientId: null, // clientDb.client
      mstClientId: null, // masterpd.clients
      divisionId: null, // clientDb.divisions
      userId: null, // clientDb.users
      personelId: null, // clientDb.personel
      planUpdated: false, // if you want to optionally attempt reversal (see note below)
    };

    setLoading(true);
    try {
      if (await checkIfExist(registration.compName.value)) {
        throw new Error("Company Name already exist");
      }

      if (await checkIfUserExist(registration.email.value)) {
        throw new Error("Email already exist");
      }

      if (address === "Address") {
        throw new Error("Please provide a valid address");
      }

      if (registration.password.value !== registration.passwordc.value) {
        throw new Error("Passwords do not match");
      }

      const addressTokens = tokenize(address);

      const client = await clientDb.collection("client").create({
        name: registration.compName.value,
        city: addressTokens[1],
        state: addressTokens[2].trim().substring(0, 2),
        address: address,
        paid_modules: JSON.stringify({ modules: ["Documents", "Ticketing"] }),
      });
      created.clientId = client.id;

      const mstClient = await masterpd.collection("clients").create({
        name: registration.compName.value,
        host: clientHost,
        client_id: client.id,
        mail_server: mailHost,
        region: selectedRegion,
        ai_server: aiServer,
      });
      created.mstClientId = mstClient.id;

      const division = await clientDb.collection("divisions").create({
        name: registration.division.value,
        state: addressTokens[2].trim().substring(0, 2),
        client_id: client.id,
        city: addressTokens[1].trim(),
      });
      created.divisionId = division.id;

      const newUser = await clientDb.collection("users").create({
        email: registration.email.value,
        password: registration.password.value,
        passwordConfirm: registration.password.value,
        name: registration.name.value,
        phone: registration.phone.value,
        emailVisibility: true,
        client_id: client.id,
        onboard_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
      created.userId = newUser.id;

      // Update the client table on the primary db
      await masterpd.collection("clients").update(mstClient.id, {
        cr_name: newUser.name,
        cr_email: newUser.email,
      });

      const newClient = await clientDb.collection("client").update(client.id, {
        manager: newUser.id,
      });

      const personel = await clientDb.collection("personel").create({
        user_id: newUser.id,
        full_name: newUser.name,
        role: "cr",
        user: newUser.id,
        client: client.id,
      });
      created.personelId = personel.id;

      const plan = await masterpd
        .collection("plans")
        .getFirstListItem('name="Starter"');

      let clietArr = plan.client_json.clients;
      clietArr.push(newClient.id);

      await masterpd.collection("plans").update(plan.id, {
        client_json: JSON.stringify({ clients: clietArr }),
      });
      created.planUpdated = true;

      // send welcome email (if this fails, rollback will trigger too)
      await email.sendWelcomeEmail(
        mailHost,
        newClient.name,
        newUser.email,
        "Welcome to PAF!",
        newUser.name,
        clientHost
      );

      setSuccessObj({
        name: registration.name.value,
        email: registration.email.value,
        clientName: registration.compName.value,
      });
      setSuccess(true);
      setError(false);
    } catch (err) {
      console.error("Registration failed:", err);

      // ✅ Rollback in reverse order
      await safeDelete(clientDb, "personel", created.personelId);
      await safeDelete(clientDb, "users", created.userId);
      await safeDelete(clientDb, "divisions", created.divisionId);
      await safeDelete(masterpd, "clients", created.mstClientId);
      await safeDelete(clientDb, "client", created.clientId);

      // (Optional) Plan rollback:
      // Because you don't store the previous plan.client_json here,
      // we can't safely undo it without refetching & removing newClient.id.
      // If you want, I can add a safe plan rollback that:
      // 1) re-fetches Starter
      // 2) removes created.clientId (or newClient.id) from the array
      // 3) updates plan back.

      setFailed(true);
      setFailMessage(
        err?.message ||
          "Registration failed due to an unexpected error. No changes were saved."
      );

      // keep inline error too if you want it above the form
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => navigation.navigate("/");

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
              🎉 Thank You{successObj.name ? `, ${successObj.name}` : ""}!
            </h1>
            <p className="text-gray-700 mb-2">
              Your registration for{" "}
              <span className="font-medium">{successObj.clientName}</span> was
              successful.
            </p>
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to{" "}
              <strong>{successObj.email}</strong>.
            </p>
            <p>
              Check your spam folder if you don't see it within 30 minutes. If
              you still can't find it, contact us at support@predictiveaf.com
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
