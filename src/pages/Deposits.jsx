import { useDeposits } from "../hooks/useDeposits";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { Title, Text, Stack, Table, Pagination, Box, Button, Group } from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react"; // Ensure this import is correct

export default function Deposits() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data = [], // Initialize data as an empty array
    isFetching,
    isErrorFetch,
    fetchError,
    deleteDeposits,
    isDeleting,
  } = useDeposits();

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
        <Title order={1}>Deposits</Title> 
        <IconBuildingStore size="32px"/>
      </Group>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData.map((deposit, index) => (
            <Table.Tr key={deposit.id}>
              <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
              <Table.Td>{deposit.description}</Table.Td>
              <Table.Td>{deposit.location}</Table.Td>
              <Table.Td> 
                <Button
                  color="red"
                  onClick={() => handleDelete(deposit.id)}
                  loading={deletingId === deposit.id && isDeleting}
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
        message="Are you sure you want to delete this deposit?"
        onConfirm={() => confirmDelete(() => deleteDeposits(deletingId))}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="md"
      />
    </Stack>
  );
}
