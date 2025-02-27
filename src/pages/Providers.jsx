import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProviders } from "../api/providers";
import { Title, Text, Stack, Table, Pagination, Box } from "@mantine/core";

export default function Providers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
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
        <Title order={1}>Providers</Title>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>ID Document</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>email</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData?.map((providers, index) => (
              <Table.Tr key={providers.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{providers.id_document}</Table.Td>
                <Table.Td>{providers.name}</Table.Td>
                <Table.Td>{providers.phone_number}</Table.Td>
                <Table.Td>{providers.email}</Table.Td>
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
