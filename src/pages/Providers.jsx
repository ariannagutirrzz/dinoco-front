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
import { useProviders } from "../hooks/useProviders"; 
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconCheckupList, IconMoodEmpty, IconAlertCircle } from "@tabler/icons-react"; // Ensure this import is correct
import { notifications } from "@mantine/notifications";

export default function Providers() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

    const {
      data = [], // Initialize data as an empty array
      isFetching,
      isErrorFetch,
      // errorMessage,
      deleteProviders,
      isDeleting,
    } = useProviders();

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
        <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Document ID</Table.Th>
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
