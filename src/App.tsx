import { Routes, Route } from "react-router";
import { NavigationBar } from "./components/NavigationBar";
import { Dashboard } from "./components/pages/Dashboard";
import { Mainpage } from "./components/pages/Mainpage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
