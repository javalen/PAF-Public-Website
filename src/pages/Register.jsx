import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import PocketBase from "pocketbase";
import { pbAppClient, masterpd } from "../api/pocketbase";
import { useEffect, useState } from "react";
import useEmail from "../utils/email";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_PLACES_API;
export const metadata = {
  title: "Register",
};

const termsMsg = "You must agree the Term & Conditions";

export default function Register() {
  const [error, setError] = useState();
  const [isChecked, setChecked] = useState(true);
  const [termsRead, setTermsRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = useEmail();
  const [address, setAddress] = useState(null);
  const [clients, setClients] = useState([]); // ✅ Stores client list
  const [regions, setRegions] = useState([]);
  const [mailHost, setMailHost] = useState();
  const [clientDb, setClientDb] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [clientHost, setClientHost] = useState();

  const submit = async (e) => {
    e.preventDefault(true);
    const registration = e.target.elements;
    if (!isChecked) {
      setError(termsMsg);
      return;
    }

    setLoading(true);
    try {
      //Create the client first
      if (await checkIfExist(registration.compName.value)) {
        throw new Error("Company Name already exist");
        return;
      }

      //check if the user already exist
      if (await checkIfUserExist(registration.email.value)) {
        setError("Email already exist");
        setLoading(false);
        return;
      }

      //Check the address field
      if (address === "Address") {
        setError("Please provide a valid address");
        setLoading(false);
        return;
      }

      const addressTokens = tokenize(address);

      //Create the client
      const client = await clientDb.collection("client").create({
        name: registration.compName.value,
        city: addressTokens[1],
        state: addressTokens[2].trim().substring(0, 2),
        address: address,
        paid_modules: JSON.stringify({ modules: [] }),
      });

      //Add the client to the clients mapping db
      const mstClient = await masterpd.collection("clients").create({
        name: registration.compName.value,
        host: clientHost,
        client_id: client.id,
        mail_server: mailHost,
        region: selectedRegion,
      });

      // Create a default division
      const division = await clientDb.collection("divisions").create({
        name: registration.division.value,
        state: addressTokens[2].trim().substring(0, 2),
        client_id: client.id,
        city: addressTokens[1].trim(),
      });

      //Create the user
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

      //Update the client table with the user info
      const newClient = await clientDb.collection("client").update(client.id, {
        manager: newUser.id,
      });

      //Create a personel record with role of super user for the company
      const record = await clientDb.collection("personel").create({
        user_id: newUser.id,
        full_name: newUser.name,
        role: "cr",
        user: newUser.id,
        client: client.id,
      });

      // Add the client to the starter plan
      const plan = await masterpd
        .collection("plans")
        .getFirstListItem('name="Starter"');

      let clietArr = plan.client_json.clients;
      clietArr.push(newClient.id);
      const updatedPlan = await masterpd.collection("plans").update(plan.id, {
        client_json: JSON.stringify({ clients: clietArr }),
      });

      email.sendWelcomeEmail(
        newClient.name,
        newUser.email,
        "Welcome to PAF!",
        newUser.name,
        clientHost
      );

      //navigation.navigate("Login");
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log("Error", error);
    }
    setLoading(false);
    try {
    } catch (error) {
      console.log("Error registering client", error);
    }
  };

  const checkIfUserExist = async (email) => {
    try {
      //console.log("checking");
      const record = await clientDb
        .collection("users")
        .getFirstListItem(`email="${email}"`);
      //console.log("Record", record);
      return true;
    } catch (error) {
      console.log("User doesn't already exist - IGNORE", error);
      return false;
    }
  };
  const onchange = (e) => {
    setAddress(e.label);
  };

  // ✅ Function to Set API URL When Client is Selected
  const setBackEndUrl = (selectedOption) => {
    if (selectedOption) {
      const cdb = new PocketBase(selectedOption.target.value);
      setClientDb(cdb);
      const mh = regions.find(
        (reg) => reg.value === selectedOption.target.value
      );
      setMailHost(mh.mail_server);
      setSelectedRegion(mh.label);
      setClientHost(selectedOption.target.value);
    }
  };

  function tokenize(str) {
    // Simple tokenization using whitespace as delimiter
    return str.split(",");
  }

  const checkIfExist = async (name) => {
    try {
      const record = await pb
        .collection("client")
        .getFirstListItem(`name="${name}"`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkTerms = () => {
    if (termsRead) {
      setChecked(true);
    } else {
      setError(termsMsg);
    }
  };
  const load = async () => {
    setError("");

    setTermsRead(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const records = await masterpd.collection("regions").getFullList();

        setRegions(records);
      } catch (error) {
        console.log("Error getting regions", error);
        logger.log(new Error(clazz + " Error getting regions: " + error));
      }

      try {
        const names = await masterpd.collection("clients").getFullList({
          fields: "name", // ✅ Fetch only `id` and `name`
        });
        setClients(names);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    loadData();
  }, []);
  return (
    <AuthLayout title="Register a new account">
      <form onSubmit={submit}>
        {error && (
          <div className="text-lg text-red-500 text-center mb-5">{error}</div>
        )}
        <div className="space-y-6">
          <TextField label="Client Name" name="compName" type="text" required />
          <div className="mt-1">
            <label className="space-y-6 font-semibold">Region</label>
            <select
              //value={region}
              onChange={setBackEndUrl}
              required
              className="mt-2 block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
            >
              <option value="" className="text-gray-100">
                Select a region
              </option>
              {regions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {/* <TextField label="City" name="city" type="text" required />
          <TextField label="State" name="state" required />
          <TextField label="Zip Code" name="zip" type="text" required /> */}
          <div className="mt-1 text-gray-500">
            <GooglePlacesAutocomplete
              apiKey={API_KEY}
              selectProps={{
                //defaultInputValue: "Address",
                placeholder: "Address",
                onChange: onchange,
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
            {!address && <p className="text-red-500">Address is required</p>}
          </div>
          <TextField
            label="Default Division (Ex: Downtown)"
            name="division"
            type="text"
            required
          />
          <TextField label="Full Name" name="name" required />
          <TextField label="Phone " name="phone" type="text" required />
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
            autoComplete="current-password"
            required
          />
          <TextField
            label="Copnfirm Password"
            name="passwordc"
            type="password"
            required
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                I agree to{" "}
                <a
                  href="https://pafadminpanel.onrender.com/terms"
                  className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  target="t&c"
                  onClick={load}
                >
                  Terms and Conditiions
                </a>
              </label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          color="cyan"
          className="mt-8 w-full  bg-primary hover:bg-primary/80"
        >
          Register Account
        </Button>
      </form>
    </AuthLayout>
  );
}
