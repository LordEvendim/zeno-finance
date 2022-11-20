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
import { separateThousands } from "../../../helpers/numbersFormatting";
import { DexPositionDetails } from "../../../stores/useDexDataFeed";

interface DexPositionsTableProps {
  positions: DexPositionDetails[];
}

export const DexPositionsTable: React.FC<DexPositionsTableProps> = ({
  positions,
}) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Locked liquidity in Tripolaris pools
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Pool</Th>
            <Th color={"white"}>Deposit date</Th>
            <Th color={"white"}>initial value</Th>
            <Th color={"white"}>impernament loss</Th>
            <Th color={"white"}>impernament loss (%)</Th>
            <Th color={"white"}>profit</Th>
            <Th color={"white"}>APY</Th>
            <Th color={"white"} isNumeric>
              value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {positions.map((position) => (
            <Tr>
              <Th color={"white"}>{position.name}</Th>
              <Th color={"white"}>{position.depositDate}</Th>
              <Th color={"white"}>
                ${separateThousands(position.initialValue)}
              </Th>
              <Th color={"white"}>
                ${separateThousands(position.impernamentLoss)}
              </Th>
              <Th color={"white"}>{position.impernamentLossP}%</Th>
              <Th color={"white"}>${separateThousands(position.profit)}</Th>
              <Th color={"white"}>{position.apy}%</Th>
              <Th color={"white"} fontSize={"sm"} isNumeric>
                ${position.value}
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
