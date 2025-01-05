import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "./components";
import {
  Dashboard,
  Calendar,
  Stacked,
  Forms,
  OperatorSubmit,
  Kanban,
  Line,
  Area,
  Login,
  Bar,
  Pie,
  ColorMapping,
  Start,
  TechnicianLogin,
  OperatorLogin,
  SubmitForm,
} from "./pages";

import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import TechnicianSubmit from "./pages/TechnicianSubmit";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set default to false to enable login

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <AppContent
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          activeMenu={activeMenu}
          currentColor={currentColor}
          themeSettings={themeSettings}
          setThemeSettings={setThemeSettings}
        />
      </BrowserRouter>
    </div>
  );
};

const AppContent = ({
  isLoggedIn,
  handleLogin,
  activeMenu,
  currentColor,
  themeSettings,
  setThemeSettings,
}) => {
  const location = useLocation();
  const hideComponents = ["/", "/technicianlogin", "/operatorlogin"].includes(
    location.pathname
  );

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {isLoggedIn && !hideComponents && (
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
      )}
      {activeMenu && isLoggedIn && !hideComponents ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        isLoggedIn &&
        !hideComponents && (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )
      )}
      <div
        className={
          activeMenu && isLoggedIn && !hideComponents
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        {isLoggedIn && !hideComponents && (
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
        )}
        <div>
          {themeSettings && <ThemeSettings />}
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/technicianlogin" element={<TechnicianLogin />} />
            <Route path="/operatorlogin" element={<OperatorLogin />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            {isLoggedIn && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/operatorsubmit" element={<OperatorSubmit />} />
                <Route
                  path="/techniciansubmit"
                  element={<TechnicianSubmit />}
                />
                <Route path="/submitform" element={<SubmitForm />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/stacked" element={<Stacked />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
