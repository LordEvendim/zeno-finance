import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface MainpageProps {}

export const Mainpage: React.FC<MainpageProps> = () => {
  return (
    <Container w={"full"} centerContent>
      <Box h={"10"} />
      <Box w={"container.xl"}>
        <Flex>
          <Heading mb={"4"} color={"gray.200"}>
            Mainpage
          </Heading>
        </Flex>
        <Box h={"2"} />
      </Box>
    </Container>
  );
};
