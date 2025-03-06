import {
  Title,
  Text,
  Stack,
  Table,
  Pagination,
  Box,
  Button,
  Group,
  Center,
  Card,
  Skeleton,
} from "@mantine/core";

import { useClients } from "../hooks/useClients";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconUserPlus, IconMoodEmpty, IconAlertCircle } from "@tabler/icons-react"; // Ensure this import is correct
import { notifications } from "@mantine/notifications";

export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    // errorMessage,
    deleteClients,
    isDeleting,
  } = useClients();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal(); // Invoke the hook

  // Show error notification if there's an error
  if (isErrorFetch) {
    notifications.show({
      title: "Error",
      message: "Failed to fetch sales. Please try again later.",
      color: "red",
      icon: <IconAlertCircle size={18} />,
    });
  }

  // Handle empty data
  if (!isFetching && (!data || data.length === 0)) {
    return (
      <Center style={{ height: "60vh" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="center" align="center">
            <IconMoodEmpty size={48} color="gray" />
            <Text size="xl">
              No sales found. Start by adding a new sale!
            </Text>
          </Group>
        </Card>
      </Center>
    );
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

      {/* Skeleton Loading State */}
      {isFetching ? (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              {[...Array(1)].map((_, index) => (
                <Table.Th key={index}>
                  <Skeleton height={20} width="100%" />
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[...Array(16)].map((_, rowIndex) => (
              <Table.Tr key={rowIndex}>
                {[...Array(1)].map((_, colIndex) => (
                  <Table.Td key={colIndex}>
                    <Skeleton height={20} width="100%" />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" variant withColumnBorders>
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
      </Table>)}
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
