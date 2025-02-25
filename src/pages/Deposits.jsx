import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getDeposits } from "../api/deposits";
import { Title, Text, Stack, Table, Pagination } from "@mantine/core";

export default function Deposits() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["deposits"],
    queryFn: getDeposits,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  //   console.log(data);
  //   console.log(JSON.stringify(data, null, 2));

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  // Ensure data exists before slicing
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Stack align="center">
        <Title order={1}>Deposits</Title>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Location</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData?.map((deposit, index) => (
              <Table.Tr key={deposit.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{deposit.description}</Table.Td>
                <Table.Td>{deposit.location}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {totalPages > 1 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              bottom: "10px", // Moves pagination up slightly
            }}
          >
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </div>
        )}
      </Stack>
    </>
  );
}
