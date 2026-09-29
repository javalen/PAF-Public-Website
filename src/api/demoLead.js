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

const LEAD_CAPTURE_ENDPOINT = "/register/lead";

export const INTERACTIVE_DEMO_URL =
  import.meta.env.VITE_INTERACTIVE_DEMO_URL ||
  "https://demo.predictaf.com/auth?demo=1&autostart=1";

async function captureLead({ name, email, source }) {
  const payload = {
    name: String(name || "").trim(),
    email: String(email || "").trim(),
    source,
  };

  if (!payload.name || !payload.email) {
    throw new Error("Please enter your full name and email.");
  }

  if (!CLIENTS_SVR_URL || !CLIENTS_SVR_KEY) {
    throw new Error("The contact service is unavailable. Please try again later.");
  }

  const response = await fetch(
    `${CLIENTS_SVR_URL}${LEAD_CAPTURE_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": CLIENTS_SVR_KEY,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await response.json().catch(() => null);
  if (!response.ok || data?.ok === false) {
    throw new Error(
      data?.error || data?.message || "We could not save your details yet.",
    );
  }

  return data;
}

export function captureDemoLead({ name, email }) {
  return captureLead({ name, email, source: "Demo" });
}

export function capturePilotLead({ name, email }) {
  return captureLead({ name, email, source: "Founding Community Pilot" });
}
