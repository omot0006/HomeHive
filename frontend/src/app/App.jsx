import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chores from "../features/chores/pages/ChoresPage";
import ForgotPassword from "../features/auth/pages/ForgotPasswordPage";
import Login from "../features/auth/pages/LoginPage";
import Register from "../features/auth/pages/RegisterPage";
import Onboarding from "../features/onboarding/pages/OnboardingPage";
import Dashboard from "../features/dashboard/pages/DashboardPage";
import CreateHive from "../features/households/pages/CreateHivePage";
import Landing from "../features/marketing/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/onboarding" element={<Onboarding />} />

        {/* Create Hive */}

        <Route path="/create-hive" element={<CreateHive />} />

        {/* Dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Chores */}
        <Route path="/chores" element={<Chores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
