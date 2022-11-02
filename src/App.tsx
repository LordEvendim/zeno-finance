import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import { NavigationBar } from "./components/NavigationBar";
import { Dashboard } from "./components/pages/Dashboard";
import { Mainpage } from "./components/pages/Mainpage";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <>
      <NavigationBar />
      <Flex flexDir={"row"}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
