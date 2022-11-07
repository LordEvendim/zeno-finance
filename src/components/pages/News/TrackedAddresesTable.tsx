import {
  Box,
  Button,
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
import { useNews } from "../../../stores/useNews";
import { FaTrashAlt } from "react-icons/fa";

interface TrackedAddresesTableProps {}

export const TrackedAddresesTable: React.FC<TrackedAddresesTableProps> = () => {
  const trackedAddreses = useNews((state) => state.trackedAddreses);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme={"whiteAlpha"}>
        <TableCaption color={"white"} opacity={"0.5"}>
          List of tracked addresses
        </TableCaption>
        <Thead opacity={"0.5"}>
          <Tr>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {trackedAddreses.map((address) => (
            <Tr>
              <Th color={"white"}>{address.address}</Th>
              <Th color={"white"} isNumeric>
                <Button
                  bg={"transparent"}
                  h={"30px"}
                  onClick={() =>
                    useNews.getState().removeTrackedAddress(address.address)
                  }
                >
                  <FaTrashAlt />
                </Button>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
