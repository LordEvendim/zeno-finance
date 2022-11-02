import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <>
      <Box
        w={"400px"}
        h={"calc(100vh - 80px)"}
        bg={"rgba(255,255,255, 0.02)"}
        backdropBlur="20px"
        borderTopRightRadius={"30px"}
        p="20px"
        color={"gray.200"}
      >
        <VStack
          fontSize={"lg"}
          fontWeight={"bold"}
          justifyContent={"flex-start"}
          alignItems={"start"}
        >
          <Link to={"dashboard"}>
            <HStack>
              <RiDashboardFill />
              <Text>Dashboard</Text>
            </HStack>
          </Link>
          <Link to={"about"}>
            <HStack>
              <AiFillInfoCircle />
              <Text>About</Text>
            </HStack>
          </Link>
          <Link to={"dashboard"}>Dashboard 3</Link>
          <Link to={"dashboard"}>Dashboard 4</Link>
          <Link to={"dashboard"}>Dashboard 5</Link>
        </VStack>
      </Box>
    </>
  );
};
