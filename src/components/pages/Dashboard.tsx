import { Box, Flex, Grid, GridItem, Heading, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { createBastionDataFeed } from "../../modules/bastion/bastionDataFeed";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  useEffect(() => {
    createBastionDataFeed();
  }, []);

  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Dashboard</Heading>
        <HStack spacing={"20px"}></HStack>
      </Flex>
      <Box h={"20px"} />
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
        <GridItem
          colSpan={2}
          w="100%"
          minH="100"
          rounded={"3xl"}
          p={"20px"}
          alignSelf={"flex-start"}
          boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          bg={"rgba(255,255,255,0)"}
          h={"300px"}
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
        <GridItem
          colSpan={1}
          w="100%"
          minH="100"
          rounded={"3xl"}
          p={"20px"}
          alignSelf={"flex-start"}
          boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          bg={"rgba(255,255,255,0)"}
          h={"300px"}
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
