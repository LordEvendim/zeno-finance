import { Box, VStack, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineAreaChart } from "react-icons/ai";
import { HiOutlineNewspaper } from "react-icons/hi";
import { RiCoinsFill } from "react-icons/ri";
import { FaSwimmingPool, FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  let navigate = useNavigate();

  return (
    <Box>
      <Box h={"70px"} />
      <Box
        w={"240px"}
        mx={"30px"}
        borderRadius={"30px"}
        py={"20px"}
        px={"15px"}
        flexShrink={"0"}
        backdropFilter={"blur(10px)"}
        borderColor={"rgba(255,255,255,0.2)"}
        bg={"rgba(255,255,255,0.05)"}
        borderWidth={"2px"}
        color={"gray.200"}
      >
        <VStack fontSize={"lg"} alignItems={"flex-start"} gap={"15px"}>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/dashboard")}
          >
            <HStack>
              <RiDashboardFill />
              <Text>Dashboard</Text>
            </HStack>
          </Button>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/news")}
          >
            <HStack>
              <HiOutlineNewspaper />
              <Text>On-chain news</Text>
            </HStack>
          </Button>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/stablecoins")}
          >
            <HStack>
              <RiCoinsFill />
              <Text>Stablecoins</Text>
            </HStack>
          </Button>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/dex-liquidity")}
          >
            <HStack>
              <FaSwimmingPool />
              <Text>DEX liquidity</Text>
            </HStack>
          </Button>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/lending")}
          >
            <HStack>
              <FaHandshake />
              <Text>Lending positions</Text>
            </HStack>
          </Button>
          <Button
            variant={"ghost"}
            fontWeight={"bold"}
            fontSize={"lg"}
            onClick={() => navigate("/derivatives")}
          >
            <HStack>
              <AiOutlineAreaChart />
              <Text>Derivatives</Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
