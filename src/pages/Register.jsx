import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { pbAppClient } from "../api/pocketbase";
import { useEffect, useState } from "react";
import useEmail from "../utils/email";

export const metadata = {
  title: "Register",
};

const states = [
  {
    label: "Alabama",
    value: "AL",
  },
  {
    label: "Alaska",
    value: "AK",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Arizona",
    value: "AZ",
  },
  {
    label: "Arkansas",
    value: "AR",
  },
  {
    label: "California",
    value: "CA",
  },
  {
    label: "Colorado",
    value: "CO",
  },
  {
    label: "Connecticut",
    value: "CT",
  },
  {
    label: "Delaware",
    value: "DE",
  },
  {
    label: "District Of Columbia",
    value: "DC",
  },
  {
    label: "Federated States Of Micronesia",
    value: "FM",
  },
  {
    label: "Florida",
    value: "FL",
  },
  {
    label: "Georgia",
    value: "GA",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Hawaii",
    value: "HI",
  },
  {
    label: "Idaho",
    value: "ID",
  },
  {
    label: "Illinois",
    value: "IL",
  },
  {
    label: "Indiana",
    value: "IN",
  },
  {
    label: "Iowa",
    value: "IA",
  },
  {
    label: "Kansas",
    value: "KS",
  },
  {
    label: "Kentucky",
    value: "KY",
  },
  {
    label: "Louisiana",
    value: "LA",
  },
  {
    label: "Maine",
    value: "ME",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Maryland",
    value: "MD",
  },
  {
    label: "Massachusetts",
    value: "MA",
  },
  {
    label: "Michigan",
    value: "MI",
  },
  {
    label: "Minnesota",
    value: "MN",
  },
  {
    label: "Mississippi",
    value: "MS",
  },
  {
    label: "Missouri",
    value: "MO",
  },
  {
    label: "Montana",
    value: "MT",
  },
  {
    label: "Nebraska",
    value: "NE",
  },
  {
    label: "Nevada",
    value: "NV",
  },
  {
    label: "New Hampshire",
    value: "NH",
  },
  {
    label: "New Jersey",
    value: "NJ",
  },
  {
    label: "New Mexico",
    value: "NM",
  },
  {
    label: "New York",
    value: "NY",
  },
  {
    label: "North Carolina",
    value: "NC",
  },
  {
    label: "North Dakota",
    value: "ND",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Ohio",
    value: "OH",
  },
  {
    label: "Oklahoma",
    value: "OK",
  },
  {
    label: "Oregon",
    value: "OR",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Pennsylvania",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Rhode Island",
    value: "RI",
  },
  {
    label: "South Carolina",
    value: "SC",
  },
  {
    label: "South Dakota",
    value: "SD",
  },
  {
    label: "Tennessee",
    value: "TN",
  },
  {
    label: "Texas",
    value: "TX",
  },
  {
    label: "Utah",
    value: "UT",
  },
  {
    label: "Vermont",
    value: "VT",
  },
  {
    label: "Virgin Islands",
    value: "VI",
  },
  {
    label: "Virginia",
    value: "VA",
  },
  {
    label: "Washington",
    value: "WA",
  },
  {
    label: "West Virginia",
    value: "WV",
  },
  {
    label: "Wisconsin",
    value: "WI",
  },
  {
    label: "Wyoming",
    value: "WY",
  },
];

const termsMsg = "You must agree the Term & Conditions";

export default function Register() {
  console.log("Createing Register");
  const [error, setError] = useState();
  const [isChecked, setChecked] = useState(true);
  const [termsRead, setTermsRead] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = useEmail();

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

      //Create the client
      const client = await pbAppClient.collection("client").create({
        name: registration.compName.value,
      });

      // Create a default division
      const division = await pbAppClient.collection("divisions").create({
        name: registration.division.value,
        state: registration.division.value,
        client_id: client.id,
        city: registration.city.value,
      });

      //Create the user
      const newUser = await pbAppClient.collection("users").create({
        email: registration.email.value,
        password: registration.password.value,
        passwordConfirm: registration.password.value,
        name: registration.name.value,
        phone: registration.phone.value,
        emailVisibility: true,
        onboard_date: new Date().toISOString().slice(0, 19).replace("T", " "),
      });

      //Update the client table with the user info
      const newClient = await pbAppClient
        .collection("client")
        .update(client.id, {
          manager: newUser.id,
        });

      //Create a personel record with role of super user for the company
      const record = await pbAppClient.collection("personel").create({
        user_id: newUser.id,
        full_name: newUser.name,
        role: "cr",
        user: newUser.id,
        client: client.id,
      });

      // const authData = await pb
      //   .collection("users")
      //   .authWithPassword(userInfo.email, userInfo.password);
      // setUser(authData.record);

      const plan = await pb
        .collection("plans")
        .getFirstListItem('name="Starter"', {
          expand: "clients",
        });

      const data = {
        clients: [...plan.clients, client.id],
      };

      const updatedPlan = await pb.collection("plans").update(plan.id, data);

      email.sendWelcomeEmail(
        newClient.name,
        newUser.email,
        "Welcome to PAF!",
        newUser.name
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

  useEffect(() => {}, []);
  return (
    <AuthLayout title="Register a new account">
      <form onSubmit={submit}>
        {error && (
          <div className="text-lg text-red-500 text-center mb-5">{error}</div>
        )}
        <div className="space-y-6">
          <TextField label="Client Name" name="compName" type="text" required />
          <TextField label="City" name="city" type="text" required />
          <TextField label="State" name="state" required />
          <TextField label="Zip Code" name="zip" type="text" required />
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
