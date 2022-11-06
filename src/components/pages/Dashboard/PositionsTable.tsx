import {
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

interface PositionsTableProps {}

export const PositionsTable: React.FC<PositionsTableProps> = () => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Locked liquidity in Bastion lending vaults
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Category</Th>
            <Th color={"white"} isNumeric>
              position value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Stablecoins</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>Lending positions</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>DEX liquidity</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
