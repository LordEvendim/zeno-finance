import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";
import TripolarisLogo from "../../../assets/logos/tripolaris-logo.svg";
import WannaswapLogo from "../../../assets/logos/wannaswap.png";
import { separateThousands } from "../../../helpers/numbersFormatting";
import { useDexDataFeed } from "../../../stores/useDexDataFeed";
import { DexPositionsTable } from "./DexPositionsTable";

interface DexLiquidityProps {}

export const DexLiquidity: React.FC<DexLiquidityProps> = () => {
  const totalValue = useDexDataFeed((state) => state.totalValue);
  const averageApy = useDexDataFeed((state) => state.averageApy);
  const impernamentLoss = useDexDataFeed((state) => state.impernamentLoss);
  const impernamentLossP = useDexDataFeed((state) => state.impernamentLossP);

  const tripolarisPositions = useDexDataFeed((state) => state.positions);
  const wannaswapPositions = useDexDataFeed((state) => state.positionsWanna);

  return (
    <Box w={"full"} pr={"100px"}>
      <Box h={"10px"} />
      <Flex alignItems={"center"}>
        <Heading color={"gray.200"}>Dex positions</Heading>
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
              <StatNumber fontSize={"4xl"}>
                ${separateThousands(totalValue)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Average APY</StatLabel>
              <StatNumber fontSize={"4xl"}>{averageApy}%</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Impernament loss (%)</StatLabel>
              <StatNumber fontSize={"4xl"}>{impernamentLossP}%</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Impernament loss (value)</StatLabel>
              <StatNumber fontSize={"4xl"}>
                ${separateThousands(impernamentLoss)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </GridItem>
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
          <HStack alignItems={"center"} mb={"20px"}>
            <Image src={TripolarisLogo} h={"30px"} />
            <Heading size={"md"}>Tripolaris</Heading>
          </HStack>
          <DexPositionsTable positions={tripolarisPositions} />
        </GridItem>
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
          <HStack alignItems={"center"} mb={"20px"}>
            <Image src={WannaswapLogo} h={"30px"} />
            <Heading size={"md"}>WannaSwap</Heading>
          </HStack>
          <DexPositionsTable positions={wannaswapPositions} />
        </GridItem>
      </Grid>
    </Box>
  );
};
