import { useProviders } from "../hooks/useProviders"; 
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { Title, Text, Stack, Table, Pagination, Box, Button, Group } from "@mantine/core";
import { IconCheckupList } from "@tabler/icons-react"; // Ensure this import is correct


export default function Providers() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

    const {
      data = [], // Initialize data as an empty array
      isFetching,
      isErrorFetch,
      fetchError,
      deleteProviders,
      isDeleting,
    } = useProviders();

    const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal(); // Invoke the hook

    if (isFetching) {
      return <Text>Loading...</Text>;
    }
  
    if (isErrorFetch) {
      console.error(fetchError); // Log the error for debugging
      return <Text>{fetchError.message}</Text>;
    }

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Stack align="center" overflow="hidden" pos="relative">
      <Group justify="center" align="center">
        <Title order={1}>Providers</Title> 
        <IconCheckupList size="32px"/>
      </Group>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>ID Document</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData?.map((providers, index) => (
              <Table.Tr key={providers.id}>
                <Table.Td>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </Table.Td>
                <Table.Td>{providers.id_document}</Table.Td>
                <Table.Td>{providers.name}</Table.Td>
                <Table.Td>{providers.phone_number}</Table.Td>
                <Table.Td>{providers.email}</Table.Td>
                <Table.Td> 
                <Button
                  color="red"
                  onClick={() => handleDelete(providers.id)}
                  loading={deletingId === providers.id && isDeleting}
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
        message="Are you sure you want to delete this provider?"
        onConfirm={() => confirmDelete(() => deleteProviders(deletingId))}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="md"
      />
    </Stack>
  );
}
