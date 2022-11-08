import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";
import { truncateAddress } from "../../../helpers/truncateAddress";
import { useNews } from "../../../stores/useNews";

interface ActivityTableProps {}

export const ActivityTable: React.FC<ActivityTableProps> = () => {
  const txs = useNews((state) => state.activity);

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
        <Tbody>
          {txs.map((tx) => (
            <Tr>
              <Th color={"white"}>{truncateAddress(tx.from, 20)}</Th>
              <Th color={"white"}>{ethers.utils.formatEther(tx.value)} ETH</Th>
              <Th color={"white"}>{tx.functionName ?? tx.methodId}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
