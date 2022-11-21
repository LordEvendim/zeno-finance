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
import React from "react";
import { NavLink } from "react-router-dom";

import { truncateAddress } from "../helpers/truncateAddress";
import { useWallet } from "../hooks/useWallet";
import { useUserData } from "../stores/useUserData";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isConnecting, connectWallet, disconnectWallet] = useWallet();
  const userAddress = useUserData((state) => state.address);

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
                textShadow={
                  "0px 0px 15px rgba(255,255,255,0.5), 0px 0px 5px rgba(255,255,255,0.3)"
                }
              >
                Zeno
              </Text>
              <Text
                display={"inline"}
                m={"0px"}
                fontSize={"3xl"}
                color={"#6DCBD9"}
                textShadow={
                  "0px 0px 15px rgba(109,203,217,0.5), 0px 0px 5px rgba(109,203,217,0.3)"
                }
              >
                .finance
              </Text>
            </NavLink>
          </Heading>
        </Box>
        <Spacer />
        <HStack spacing="64px">
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
