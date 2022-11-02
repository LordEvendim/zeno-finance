import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { truncateAddress } from "../helpers/truncateAddress";
import { useWallet } from "../hooks/useWallet";
import { useUserData } from "../stores/useUserData";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isConnecting, connectWallet, disconnectWallet] = useWallet();
  const userAddress = useUserData((state) => state.address);

  const location = useLocation();
  const [isHomeScreen, setIsHomescreen] = useState<Boolean>(true);

  useEffect(() => {
    setIsHomescreen(location.pathname === "/" ? true : false);
  }, [location]);

  return (
    <Box w="100%" h={"80px"} display={"flex"} alignItems={"center"}>
      <Flex mx={"auto"} w={"container.xl"} alignItems="center">
        <Box>
          <Heading>
            <NavLink to={"/"}>
              <Text
                display={"inline"}
                fontSize={"3xl"}
                color={"white"}
                textShadow={"0px 0px 10px rgba(255,255,255,0.2)"}
              >
                Zeno
              </Text>
              <Text
                display={"inline"}
                m={"0px"}
                fontSize={"3xl"}
                color={"red.500"}
                textShadow={"0px 0px 10px rgba(255,0,0,0.2)"}
              >
                .finance
              </Text>
            </NavLink>
          </Heading>
        </Box>
        <Spacer />
        <HStack spacing="64px">
          <Button variant="link" textColor="gray.200">
            <NavLink to={"/about"}>About</NavLink>
          </Button>
          <Button variant="link" textColor="gray.200">
            <NavLink to={"/contracts"}>Contracts</NavLink>
          </Button>
          <Button variant="link">
            <NavLink to={"/dashboard"}>
              <Text color={"gray.200"}>Dashboard</Text>
            </NavLink>
          </Button>

          {useUserData.getState().isLogged ? (
            <Box
              padding={"8px"}
              px={"15px"}
              borderRadius={"8px"}
              borderWidth={"1px"}
              borderColor={"gray.200"}
            >
              <HStack>
                <NavLink to={"/profile"}>
                  <Text textColor={"white"}>
                    {truncateAddress(userAddress, 15)}
                  </Text>
                </NavLink>
                <CloseButton
                  onClick={disconnectWallet}
                  size="sm"
                  color={"white"}
                />
              </HStack>
            </Box>
          ) : (
            <Button
              w={120}
              h={10}
              fontSize={"md"}
              isLoading={isConnecting}
              onClick={connectWallet}
            >
              Connect
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
