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
import { useDataFeeds } from "../../../stores/useDataFeeds";
import { useStablecoinsPositions } from "../../../stores/useStablecoinsPositions";

interface PositionsTableProps {}

export const PositionsTable: React.FC<PositionsTableProps> = () => {
  const stableTotalValue = useStablecoinsPositions((state) => state.totalValue);
  const lendingTotalValue = useBastion((state) => state.totalValue);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Asset value by category
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
            <Td isNumeric>${stableTotalValue}</Td>
          </Tr>
          <Tr>
            <Td>Lending positions</Td>
            <Td isNumeric>${lendingTotalValue}</Td>
          </Tr>
          <Tr>
            <Td>DEX liquidity</Td>
            <Td isNumeric>${useDataFeeds.getState().dexLiquidityTotalValue}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
