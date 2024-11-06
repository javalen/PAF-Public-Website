import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContext from "./auth/context";
import Register from "./pages/Register";
import QuickStart from "./pages/QuickStart";

function App() {
  const [user, setUser] = useState();
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/quickstart",
      element: <QuickStart />,
    },
  ]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
