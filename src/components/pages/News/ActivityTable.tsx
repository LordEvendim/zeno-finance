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

interface ActivityTableProps {}

export const ActivityTable: React.FC<ActivityTableProps> = () => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          Recent acitvity of tracked addreses
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th color={"white"}>Address</Th>
            <Th color={"white"}>Transaction value</Th>
            <Th color={"white"}>Action</Th>
          </Tr>
        </Thead>
        <Tbody></Tbody>
      </Table>
    </TableContainer>
  );
};
