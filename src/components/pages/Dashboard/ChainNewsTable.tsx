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

interface ChainNewsTableProps {}

export const ChainNewsTable: React.FC<ChainNewsTableProps> = () => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Most recent activity of tracked addreses
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Category</Th>
            <Th color={"white"}>Transaction value</Th>
            <Th color={"white"}>position value</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>0x49f2kdfd . . .</Td>
            <Td>$1003.23</Td>
            <Td>SWAP</Td>
          </Tr>
          <Tr>
            <Td>0x49f2kdfd . . .</Td>
            <Td>$1003.23</Td>
            <Td>MINT</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
