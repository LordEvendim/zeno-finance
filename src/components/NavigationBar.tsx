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
    <Box w="100%">
      <Flex mx={"auto"} w={"container.xl"} py={6} alignItems="center">
        <Box>
          <Heading>
            <NavLink to={"/"}>
              <Text
                display={"inline"}
                fontSize={"2xl"}
                color={isHomeScreen ? "white" : "gray.600"}
                textShadow={
                  isHomeScreen
                    ? "0px 0px 10px rgba(0,0,0,0.5)"
                    : "0px 0px 10px rgba(0,0,0,0.2)"
                }
              >
                Zeno
              </Text>
              <Text
                display={"inline"}
                m={"0px"}
                fontSize={"2xl"}
                color={isHomeScreen ? "red.500" : "#68D3B6"}
                textShadow={
                  isHomeScreen
                    ? "0px 0px 10px rgba(0,0,0,0.5)"
                    : "0px 0px 10px rgba(0,0,0,0.2)"
                }
              >
                .finance
              </Text>
            </NavLink>
          </Heading>
        </Box>
        <Spacer />
        <HStack spacing="64px">
          <Button variant="link" textColor="gray.600">
            <NavLink to={"/about"}>About</NavLink>
          </Button>
          <Button variant="link" textColor="gray.600">
            <NavLink to={"/contracts"}>Contracts</NavLink>
          </Button>
          <Button variant="link" textColor="gray.600">
            <NavLink to={"/trade"}>
              <Text color={isHomeScreen ? "red.500" : "red.500"}>
                Dashboard
              </Text>
            </NavLink>
          </Button>

          {useUserData.getState().isLogged ? (
            <Box
              padding={"8px"}
              px={"15px"}
              borderRadius={"8px"}
              borderWidth={"1px"}
              borderColor={isHomeScreen ? "white" : "gray.600"}
            >
              <HStack>
                <NavLink to={"/profile"}>
                  <Text textColor={isHomeScreen ? "white" : "gray.600"}>
                    {truncateAddress(userAddress, 15)}
                  </Text>
                </NavLink>
                <CloseButton
                  onClick={disconnectWallet}
                  size="sm"
                  color={isHomeScreen ? "white" : "gray.600"}
                />
              </HStack>
            </Box>
          ) : (
            <Button
              w={150}
              h={12}
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
