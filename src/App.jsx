import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContext from "./auth/context";
import Register from "./pages/Register";
import QuickStart from "./pages/QuickStart";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";

// NEW: Pricing Wizard routes (public)
import PricingWizard from "./components/pricing-wizard/PricingWizard";
import PublicQuotePage from "./components/pricing-wizard/PublicQuotePage";

function App() {
  const [user, setUser] = useState();

  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <Home /> },
    { path: "/quickstart", element: <QuickStart /> },
    { path: "/support", element: <Support /> },
    { path: "/privacy", element: <Privacy /> },

    // NEW: Public pricing wizard + shareable quote page
    { path: "/pricing", element: <PricingWizard /> },
    { path: "/pricing/quote/:token", element: <PublicQuotePage /> },
  ]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
