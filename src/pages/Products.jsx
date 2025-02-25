import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../api/products";
import { Title, Text, Stack, Table, Pagination, Box } from "@mantine/core";

export default function Products() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

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
    <Stack align="center" overflow="hidden" pos="relative">
      <Title order={1}>Products</Title>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Expire Date</Table.Th>
            <Table.Th>Deposit</Table.Th>
            <Table.Th>Sale Unit</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData?.map((product, index) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>${product.price}</Table.Td>
              <Table.Td>{product.quantity}</Table.Td>
              <Table.Td>{product.expire_date}</Table.Td>
              <Table.Td>{product.id_deposit}</Table.Td>
              <Table.Td>{product.sales_unit}</Table.Td>
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
  );
}
