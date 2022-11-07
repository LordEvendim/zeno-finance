import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router";
import { NavigationBar } from "./components/NavigationBar";
import { Dashboard } from "./components/pages/Dashboard/Dashboard";
import { DexLiquidity } from "./components/pages/DexLiquidity/DexLiquidity";
import { Lending } from "./components/pages/Lending/Lending";
import { Mainpage } from "./components/pages/Mainpage";
import { News } from "./components/pages/News/News";
import { Stablecoin } from "./components/pages/Stablecoin/Stablecoin";
import { Sidebar } from "./components/Sidebar";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <>
      <NavigationBar />
      <Flex flexDir={"row"} alignItems={"flex-start"}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lending" element={<Lending />} />
          <Route path="/stablecoins" element={<Stablecoin />} />
          <Route path="/news" element={<News />} />
          <Route path="/dex-liquidity" element={<DexLiquidity />} />
        </Routes>
      </Flex>
    </>
  );
};

export default App;
