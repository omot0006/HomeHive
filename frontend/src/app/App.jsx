import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadingState } from "../components/ui";
import Logo from "../components/common/Logo";
import NotFoundPage from "./NotFoundPage";
import AppShell from "../components/layout/AppShell";
import AuthProvider from "../features/auth/context/AuthContext";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import HiveRequiredRoute from "../features/auth/components/HiveRequiredRoute";
import HiveSetupRoute from "../features/auth/components/HiveSetupRoute";
import HiveProvider from "../features/households/context/HiveProvider";
import Login from "../features/auth/pages/LoginPage";
import Register from "../features/auth/pages/RegisterPage";

const Landing = lazy(() => import("../features/marketing/pages/LandingPage"));
const ForgotPassword = lazy(() => import("../features/auth/pages/ForgotPasswordPage"));
const Onboarding = lazy(() => import("../features/onboarding/pages/OnboardingPage"));
const CreateHive = lazy(() => import("../features/households/pages/CreateHivePage"));
const JoinHive = lazy(() => import("../features/households/pages/JoinHivePage"));
const Dashboard = lazy(() => import("../features/dashboard/pages/DashboardPage"));
const Chores = lazy(() => import("../features/chores/pages/ChoresPage"));
const SharedCalendar = lazy(() => import("../features/calendar/pages/CalendarPage"));
const Members = lazy(() => import("../features/members/pages/MembersPage"));
const HouseholdChat = lazy(() => import("../features/chat/pages/ChatPage"));
const Groceries = lazy(() => import("../features/groceries/pages/GroceriesPage"));
const Bills = lazy(() => import("../features/bills/pages/BillsPage"));
const Notifications = lazy(() => import("../features/notifications/pages/NotificationsPage"));
const Settings = lazy(() => import("../features/settings/pages/SettingsPage"));

function RouteFallback() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-hive-canvas px-5"><Logo size="large" textClassName="text-hive-ink" /><LoadingState label="Opening HomeHive…" /></main>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<HiveSetupRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/create-hive" element={<CreateHive />} />
              <Route path="/join-hive" element={<JoinHive />} />
            </Route>
            <Route element={<HiveRequiredRoute />}>
              <Route element={<HiveProvider><AppShell /></HiveProvider>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chores" element={<Chores />} />
                <Route path="/calendar" element={<SharedCalendar />} />
                <Route path="/members" element={<Members />} />
                <Route path="/chat" element={<HouseholdChat />} />
                <Route path="/groceries" element={<Groceries />} />
                <Route path="/expenses" element={<Bills />} />
                <Route path="/bills" element={<Bills />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Settings />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
