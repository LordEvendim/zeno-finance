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
import { useDataFeeds } from "../../../stores/useDataFeeds";

interface PositionsTableProps {}

export const PositionsTable: React.FC<PositionsTableProps> = () => {
  const positions = useDataFeeds((state) => state.bastionPositions);

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
              <Td isNumeric>{position.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
