import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getSales } from "../api/sales";
import { Title, Text, Stack, Table, Pagination, Box } from "@mantine/core";

export default function Sales() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
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

  // Ensure data exists before slicing
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Stack align="center">
        <Title order={1}>Sales</Title>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>ID Client</Table.Th>
              <Table.Th>ID Seller</Table.Th>
              <Table.Th>ID Product</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total Price</Table.Th>
              <Table.Th>Sale Date</Table.Th>
            </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {paginatedData?.map((sales, index) => (
                <Table.Tr key={sales.id}>
                  <Table.Td>{index+1}</Table.Td>
                  <Table.Td>{sales.id_client}</Table.Td>
                  <Table.Td>{sales.id_seller}</Table.Td>
                  <Table.Td>{sales.id_product}</Table.Td>
                  <Table.Td>{sales.quantity}</Table.Td>
                  <Table.Td>{sales.total_price}</Table.Td>
                  <Table.Td>{sales.sale_date}</Table.Td>
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
