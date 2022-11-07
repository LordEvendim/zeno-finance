import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNews } from "../../../stores/useNews";
import { ActivityTable } from "./ActivityTable";
import { TrackedAddresesTable } from "./TrackedAddresesTable";

interface NewsProps {}

export const News: React.FC<NewsProps> = () => {
  const [address, setAddress] = useState<string>("");

  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>News</Heading>
        <HStack spacing={"20px"}></HStack>
      </Flex>
      <Box h={"20px"} />
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem
          colSpan={4}
          w="100%"
          minH="100"
          rounded={"3xl"}
          p={"20px"}
          alignSelf={"flex-start"}
          boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          bg={"rgba(255,255,255,0)"}
          backdropFilter={"blur(10px)"}
          borderColor={"rgba(255,255,255,0.2)"}
          borderWidth={"1px"}
          color={"gray.200"}
        >
          <StatGroup>
            <Stat>
              <StatLabel>Tracked activity</StatLabel>
              <StatNumber fontSize={"5xl"}>
                {useNews.getState().trackedActivity}
              </StatNumber>
              <StatHelpText>Number of transactions in last 24h</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Transaction value</StatLabel>
              <StatNumber fontSize={"5xl"}>
                ${useNews.getState().transactionValue}
              </StatNumber>
              <StatHelpText>Transaction value in the last 24h</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Largest balance change</StatLabel>
              <StatNumber fontSize={"5xl"}>
                {useNews.getState().largestChange}%
              </StatNumber>
              <StatHelpText>
                Largest balance change from tracked addreses
              </StatHelpText>
            </Stat>
          </StatGroup>
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
          backdropFilter={"blur(10px)"}
          borderColor={"rgba(255,255,255,0.2)"}
          borderWidth={"1px"}
          color={"gray.200"}
        >
          <HStack alignItems={"center"} mb={"20px"}>
            <Heading size={"md"}>Activity</Heading>
          </HStack>
          <ActivityTable />
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
          backdropFilter={"blur(10px)"}
          borderColor={"rgba(255,255,255,0.2)"}
          borderWidth={"1px"}
          color={"gray.200"}
        >
          <HStack alignItems={"center"} mb={"20px"}>
            <Heading size={"md"}>Settings</Heading>
          </HStack>
          <Flex>
            <Button
              variant={"outline"}
              mr={"20px"}
              borderColor={"rgba(255,255,255,0.5)"}
              borderWidth={"1px"}
              color={"gray.200"}
              onClick={() => useNews.getState().addAddress(address)}
            >
              Add
            </Button>
            <Input
              borderColor={"rgba(255,255,255,0.5)"}
              borderWidth={"1px"}
              color={"gray.200"}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Flex>
          <TrackedAddresesTable />
        </GridItem>
      </Grid>
    </Box>
  );
};
