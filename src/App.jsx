import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext from "./auth/context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import QuickStart from "./pages/QuickStart";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import Logos from "./pages/Logos";
import { PricingWizardProvider } from "./components/pricing-wizard/PricingWizardContext";
import { PricingWizardModal } from "./components/pricing-wizard/PricingWizardModal";

// NEW: Pricing Wizard routes (public)
import PublicQuotePage from "./components/pricing-wizard/PublicQuotePage";
import NewsletterViewer from "./pages/NewsletterViewer";
import SocialRedirect from "./pages/SocialRedirect";
import ExploreDemo from "./pages/ExploreDemo";

function App() {
  const [user, setUser] = useState();

  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/explore-demo", element: <ExploreDemo /> },
    { path: "/", element: <Home /> },
    { path: "/quickstart", element: <QuickStart /> },
    { path: "/support", element: <Support /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/careers", element: <Careers /> },
    { path: "/pages/logos", element: <Logos /> },
    {
      path: "/linkedin",
      element: <Navigate replace to="/social/linkedin" />,
    },
    { path: "/social", element: <SocialRedirect /> },
    { path: "/social/:source", element: <SocialRedirect /> },

    // NEW: Shareable quote page (pricing wizard is now a modal)
    { path: "/pricing/quote/:id", element: <PublicQuotePage /> },
    { path: "/news-letter", element: <NewsletterViewer /> },
    { path: "/news-letter/view/:slug", element: <NewsletterViewer /> },
  ]);

  return (
    <PricingWizardProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
        <PricingWizardModal />
      </AuthContext.Provider>
    </PricingWizardProvider>
  );
}

export default App;
