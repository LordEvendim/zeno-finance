import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdRefresh } from "react-icons/md";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  let navigate = useNavigate();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refresh methods
    } catch (error) {}
    setIsRefreshing(false);
  };

  return (
    <Box w={"full"} px={"60px"}>
      <Box h={"10"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Dashboard</Heading>
        <HStack spacing={"20px"}>
          <Button
            ml={"30px"}
            onClick={() => handleRefresh()}
            color={"white"}
            bgGradient="linear(to-r, #DF1200, #C12E00)"
            isLoading={isRefreshing}
            p={"20px"}
          >
            <MdRefresh color="white" size={"18px"} />
          </Button>
        </HStack>
      </Flex>
      <Box h={"50px"} />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem
          w="100%"
          minH="100"
          rounded={"3xl"}
          p={"20px"}
          alignSelf={"flex-start"}
          boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          bg={"rgba(255,255,255,0)"}
          h={"400px"}
          backdropFilter={"blur(10px)"}
          borderColor={"rgba(255,255,255,0.2)"}
          borderWidth={"1px"}
          color={"gray.200"}
        >
          <Heading size={"sm"} mb={"5"}>
            Statistics
          </Heading>
          <Flex alignItems={"baseline"} pos={"relative"}>
            <Heading>$1235.00</Heading>
            <Box
              ml={"10px"}
              color={"green.200"}
              fontSize={"lg"}
              pos={"relative"}
              bottom={"3px"}
            >
              {"(+1,25%)"}
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          w="100%"
          minH="100"
          rounded={"3xl"}
          p={"20px"}
          alignSelf={"flex-start"}
          boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          bg={"rgba(255,255,255,0)"}
          h={"400px"}
          backdropFilter={"blur(10px)"}
          borderColor={"rgba(255,255,255,0.2)"}
          borderWidth={"1px"}
          color={"gray.200"}
        >
          <Heading size={"sm"} mb={"5"}>
            On-chain news
          </Heading>
          <Box></Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
