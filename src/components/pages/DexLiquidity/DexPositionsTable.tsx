import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface DexPositionsTableProps {}

export const DexPositionsTable: React.FC<DexPositionsTableProps> = () => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Locked liquidity in Tripolaris pools
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
        <Tbody></Tbody>
      </Table>
    </TableContainer>
  );
};
