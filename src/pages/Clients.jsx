import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getClients } from "../api/clients";
import { Title, Text, Stack, Table, Pagination, Box } from "@mantine/core";

export default function Clients() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
    // console.log(data);
    // console.log(JSON.stringify(data, null, 2));

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
        <Title order={1}>Clients</Title>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Id Document</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Birthday</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Addres</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData?.map((clients, index) => (
              <Table.Tr key={clients.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{clients.id_document}</Table.Td>
                <Table.Td>{clients.name}</Table.Td>
                <Table.Td>{clients.birthday}</Table.Td>
                <Table.Td>{clients.phone_number}</Table.Td>
                <Table.Td>{clients.address}</Table.Td>
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
