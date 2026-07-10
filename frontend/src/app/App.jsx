import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chores from "../features/chores/pages/ChoresPage";
import Dashboard from "../features/dashboard/pages/DashboardPage";
import CreateHive from "../features/households/pages/CreateHivePage";
import Landing from "../features/marketing/pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}

        <Route path="/" element={<Landing />} />

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
