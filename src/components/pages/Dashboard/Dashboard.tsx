import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { ChainNewsTable } from "./ChainNewsTable";
import { PositionsTable } from "./PositionsTable";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Dashboard</Heading>
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
              <StatLabel>Total value</StatLabel>
              <StatNumber fontSize={"5xl"}>$120.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Biggest position</StatLabel>
              <StatNumber fontSize={"2xl"}>$52.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Averaged APY</StatLabel>
              <StatNumber fontSize={"2xl"}>$52.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Averaged APY</StatLabel>
              <StatNumber fontSize={"2xl"}>$52.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Averaged APY</StatLabel>
              <StatNumber fontSize={"2xl"}>$52.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
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
            <Heading size={"md"}>Positions</Heading>
          </HStack>
          <PositionsTable />
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
            <Heading size={"md"}>On-chain news</Heading>
          </HStack>
          <ChainNewsTable />
        </GridItem>
      </Grid>
    </Box>
  );
};
