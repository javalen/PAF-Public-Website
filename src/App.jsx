import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContext from "./auth/context";

function App() {
  const [user, setUser] = useState();
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
