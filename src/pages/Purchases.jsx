import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPurchases } from "../api/purchases";
import { Title, Text, Stack, Table, Box, Pagination } from "@mantine/core";

export default function Purchases() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });
  //   console.log(data);
  //   console.log(JSON.stringify(data, null, 2));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Stack align="center">
        <Title order={1}>Purchases</Title>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>ID Deposit</Table.Th>
              <Table.Th>ID Provider</Table.Th>
              <Table.Th>Purchase Date</Table.Th>
              <Table.Th>Total Price</Table.Th>
              <Table.Th>Created By</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData?.map((purchases, index) => (
              <Table.Tr key={purchases.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{purchases.id_provider}</Table.Td>
                <Table.Td>{purchases.id_deposit}</Table.Td>
                <Table.Td>{purchases.purchase_date}</Table.Td>
                <Table.Td>{purchases.total}</Table.Td>
                <Table.Td>{purchases.created_by}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Box>
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </Box>
      </Stack>
    </>
  );
}
