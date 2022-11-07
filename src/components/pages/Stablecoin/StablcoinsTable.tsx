import {
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useStablecoinsPositions } from "../../../stores/useStablecoinsPositions";

interface StablcoinsTableProps {}

export const StablcoinsTable: React.FC<StablcoinsTableProps> = () => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Value of owned stablecoins
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Coin</Th>
            <Th color={"white"}>price</Th>
            <Th color={"white"} isNumeric>
              holdings
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {useStablecoinsPositions
            .getState()
            .stablecoinPositions.map((stablecoin) => (
              <Tr>
                <Td>
                  <HStack>
                    <Image src={stablecoin.image} />
                    {stablecoin.name}
                  </HStack>
                </Td>
                <Td>${stablecoin.price}</Td>
                <Td isNumeric>${stablecoin.value}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
