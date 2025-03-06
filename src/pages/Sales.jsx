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
import { useSales } from "../hooks/useSales";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconBuildingStore, IconMoodEmpty, IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function Sales() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    // errorMessage,
    deleteSales,
    isDeleting,
  } = useSales();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

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
        <Title order={1}>Sales</Title>
        <IconBuildingStore size="32px" />
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
        // Actual Table when Data is Loaded
        <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" variant withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>ID Client</Table.Th>
              <Table.Th>ID Seller</Table.Th>
              <Table.Th>ID Product</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Total Price</Table.Th>
              <Table.Th>Sale Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData.map((sale, index) => (
              <Table.Tr key={sale.id}>
                <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                <Table.Td>{sale.id_client}</Table.Td>
                <Table.Td>{sale.id_seller}</Table.Td>
                <Table.Td>{sale.id_product}</Table.Td>
                <Table.Td>{sale.quantity}</Table.Td>
                <Table.Td>{sale.total_price}</Table.Td>
                <Table.Td>{sale.sale_date}</Table.Td>
                <Table.Td>
                  <Button
                    color="red"
                    onClick={() => handleDelete(sale.id)}
                    loading={deletingId === sale.id && isDeleting}
                  >
                    Delete
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      {/* Pagination */}
      <Box>
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      </Box>

      {/* Confirmation Modal */}
      <ConfirmationModal
        opened={opened}
        onClose={close}
        title="Confirm Deletion"
        message="Are you sure you want to delete this sale?"
        onConfirm={() => confirmDelete(() => deleteSales(deletingId))}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="md"
      />
    </Stack>
  );
}