import { Box, VStack, Text, HStack, Button, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { HiOutlineNewspaper } from "react-icons/hi";
import { RiCoinsFill } from "react-icons/ri";
import { FaSwimmingPool, FaHandshake } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Countdown, { CountdownApi } from "react-countdown";
import { useRefresh } from "../stores/useRefresh";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  let navigate = useNavigate();
  const nextRefresh = useRefresh((state) => state.nextRefreshTime);
  const isReady = useRefresh((state) => state.isReady);
  const [isReadyToRefresh, setReadyToRefresh] = useState(true);

  const refresh = useRefresh((state) => state.refresh);
  const [countdownApi, setCountdownApi] = useState<CountdownApi>();

  useEffect(() => {
    if (countdownApi) countdownApi.start();
  }, [nextRefresh, countdownApi]);

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      console.log(countdown.getApi());
      setCountdownApi(countdown.getApi());
    }
  };

  const updateButtonStatus = () => {
    console.log(isReady());

    setReadyToRefresh(isReady());
  };

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
        </VStack>
      </Box>
      <Center mt={"30px"} fontSize={"2xl"} color={"gray.200"}>
        <Button
          variant={"outline"}
          mr={"20px"}
          disabled={!isReadyToRefresh}
          onClick={() => refresh()}
        >
          <MdRefresh />
        </Button>
        {
          <Countdown
            date={nextRefresh}
            onStart={() => updateButtonStatus()}
            onComplete={() => updateButtonStatus()}
            ref={setRef}
            daysInHours
          />
        }
      </Center>
    </Box>
  );
};
