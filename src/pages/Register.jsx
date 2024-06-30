import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { pbAppClient } from "../api/pocketbase";
import { useState } from "react";
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

export default function Register() {
  const [error, setError] = useState();
  const [isChecked, setChecked] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  const email = useEmail();
  const submit = async (data) => {
    try {
    } catch (error) {
      console.log("Error registering client", error);
    }
  };
  return (
    <AuthLayout
      title="Register a new account"
      //   subtitle={
      //     <>
      //       Don’t have an account?{" "}
      //       <a href="/register" className="text-cyan-600">
      //         Sign up
      //       </a>{" "}
      //       for a free trial.
      //     </>
      //   }
    >
      <form>
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
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Register account
        </Button>
      </form>
    </AuthLayout>
  );
}
