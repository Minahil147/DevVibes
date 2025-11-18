import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Component Imports
import Layout from "./assets/components/layout/Layout";
import DashboardLanding from "./assets/components/Dashboard/DashboardLanding";
import Network from "./assets/components/network/Network";
import Profile from "./assets/components/profile/Profile";
import EditProfile from "./assets/components/profile/EditProfile";

// Context Imports
import ThemeContext from "./assets/context/ThemeContext";
import useAuth from "./auth/useAuth";
import { ProfileProvider } from "./assets/context/ProfileContext";

function App() {
  const { darkMode } = useContext(ThemeContext);
  const { auth } = useAuth();

  return (
    <main
      className="w-full min-h-screen"
      data-theme={darkMode ? "dim" : "nord"}
    >
      <div className="max-w-[2000px] mx-auto min-h-screen px-2 py-6 bg-base-200">
        {auth?.accessToken ? (
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardLanding />} />
              <Route
                path="/profile"
                element={<Navigate to={`/profile/${auth?.username}`} />}
              />
              <Route path="/profile/:username" element={<ProfileProvider />}>
                <Route index element={<Profile />} />
                <Route path="edit" element={<EditProfile />} />
              </Route>
              <Route path="/network" element={<Network />} />
            </Route>
          </Routes>
        ) : (
          <DashboardLanding />
        )}
      </div>
    </main>
  );
}

export default App;
