import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import BastionLogo from "../../../assets/logos/bastion_logo.png";
import { useBastion } from "../../../stores/useBastion";
import { PositionsTable } from "./PositionsTable";

interface LendingProps {}

export const Lending: React.FC<LendingProps> = () => {
  const totalValue = useBastion((state) => state.totalValue);
  const biggetPosition = useBastion((state) => state.biggestPositionValue);
  const averageAPY = useBastion((state) => state.averageAPY);

  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Lending positions</Heading>
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
              <StatNumber fontSize={"5xl"}>${totalValue}</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Biggest position</StatLabel>
              <StatNumber fontSize={"4xl"}>${biggetPosition}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Averaged APY</StatLabel>
              <StatNumber fontSize={"4xl"}>{averageAPY}%</StatNumber>
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
            <Image src={BastionLogo} h={"30px"} />
            <Heading size={"md"}>Bastion</Heading>
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
