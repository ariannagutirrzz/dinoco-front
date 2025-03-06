import { useClients } from "../hooks/useClients";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { Title, Text, Stack, Table, Pagination, Box, Button, Group } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react"; // Ensure this import is correct

export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data = [], // Initialize data as an empty array
    isFetching,
    isErrorFetch,
    fetchError,
    deleteClients,
    isDeleting,
  } = useClients();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal(); // Invoke the hook

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isErrorFetch) {
    console.error(fetchError); // Log the error for debugging
    return <Text>{fetchError.message}</Text>;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Stack align="center" overflow="hidden" pos="relative">
      <Group justify="center" align="center">
        <Title order={1}>Clients</Title> 
        <IconUserPlus size="32px"/>
      </Group>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Id Document</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Birthday</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData.map((client, index) => (
            <Table.Tr key={client.id}>
              <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
              <Table.Td>{client.id_document}</Table.Td>
              <Table.Td>{client.name}</Table.Td>
              <Table.Td>{client.birthday}</Table.Td>
              <Table.Td>{client.phone_number}</Table.Td>
              <Table.Td>{client.address}</Table.Td>
              <Table.Td> 
                <Button
                  color="red"
                  onClick={() => handleDelete(client.id)}
                  loading={deletingId === client.id && isDeleting}
                >
                  Delete
                </Button>
              </Table.Td>
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
      <ConfirmationModal
        opened={opened}
        onClose={close}
        title="Confirm Deletion"
        message="Are you sure you want to delete this client?"
        onConfirm={() => confirmDelete(() => deleteClients(deletingId))}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="md"
      />
    </Stack>
  );
}
