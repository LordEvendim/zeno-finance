import {
  Box,
  Center,
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
import { useDataFeeds } from "../../../stores/useDataFeeds";
import { useStablecoinsPositions } from "../../../stores/useStablecoinsPositions";
import { StablcoinsTable } from "./StablcoinsTable";

interface StablecoinProps {}

export const Stablecoin: React.FC<StablecoinProps> = () => {
  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Stablecoins</Heading>
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
              <StatNumber fontSize={"5xl"}>
                ${useStablecoinsPositions.getState().totalValue}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Depeg loss</StatLabel>
              <StatNumber fontSize={"4xl"}>
                ${useStablecoinsPositions.getState().depegLoss}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Currnet inflation rate</StatLabel>
              <StatNumber fontSize={"4xl"}>
                {useStablecoinsPositions.getState().currentInflationRate}%
              </StatNumber>
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
            <Heading size={"md"}>Holdings</Heading>
          </HStack>
          <StablcoinsTable />
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
          pos={"relative"}
        >
          <Center pos={"relative"} top={"40%"}>
            <Heading opacity={"0.2"}>Coming soon</Heading>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};
