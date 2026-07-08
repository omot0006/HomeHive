import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chores from "./pages/Chores/Chores";
import Landing from "./pages/Landing/Landing";
import CreateHive from "./pages/CreateHive/CreateHive";
import Dashboard from "./pages/Dashboard/Dashboard";

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
