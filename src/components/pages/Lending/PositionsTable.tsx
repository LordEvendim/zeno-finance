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
import { useBastion } from "../../../stores/useBastion";

interface PositionsTableProps {}

export const PositionsTable: React.FC<PositionsTableProps> = () => {
  const positions = useBastion((state) => state.positions);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Locked liquidity in Bastion lending vaults
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Vault</Th>
            <Th color={"white"}>Current interest rate</Th>
            <Th color={"white"} isNumeric>
              position value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {positions.map((position) => (
            <Tr>
              <Td>{position.name}</Td>
              <Td>{position.apy}</Td>
              <Td isNumeric>{position.value} $</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
