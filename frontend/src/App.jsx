import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import CreateHive from "./pages/CreateHive/CreateHive";


function App() {

  return (

    <BrowserRouter>


      <Routes>


        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />



        {/* Create Hive */}
        <Route
          path="/create-hive"
          element={<CreateHive />}
        />



      </Routes>


    </BrowserRouter>

  );

}


export default App;