import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
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
    <Container w={"full"} centerContent>
      <Box h={"10"} />
      <Box w={"container.xl"}>
        <Flex>
          <Heading mb={"4"}>Futures</Heading>
          <Spacer />
          <HStack spacing={"20px"}>
            <Button
              onClick={() => handleRefresh()}
              color={"white"}
              bgGradient="linear(to-l, #68D391, #68D3CC)"
              isLoading={isRefreshing}
            >
              <MdRefresh color="white" size={"20px"} />
            </Button>
            <Button
              onClick={() => navigate("/create")}
              color={"white"}
              bgGradient="linear(to-l, #68D391, #68D3CC)"
            >
              + write contract
            </Button>
            <Button
              onClick={() => navigate("/portfolio")}
              color={"white"}
              bgGradient="linear(to-l, #68D391, #68D3CC)"
            >
              portfolio
            </Button>
          </HStack>
        </Flex>
        <Box h={"2"} />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem
            w="100%"
            minH="100"
            bg="white"
            rounded={"3xl"}
            p={"20px"}
            alignSelf={"flex-start"}
            boxShadow="0px 0px 15px rgba(0,0,0,0.1)"
          >
            <Box>
              <Heading size={"sm"} color={"gray.600"} mb={"8"}>
                Epoch options
              </Heading>
            </Box>
          </GridItem>
          <GridItem colSpan={2}></GridItem>
        </Grid>
      </Box>
    </Container>
  );
};
