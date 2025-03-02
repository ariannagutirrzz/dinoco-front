import { useSales } from "../hooks/useSales";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { Title, Text, Stack, Table, Pagination, Box, Button, Group } from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react"; // Ensure this import is correct

export default function Sales() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data = [], // Initialize data as an empty array
    isFetching,
    isErrorFetch,
    fetchError,
    deleteSales,
    isDeleting,
  } = useSales();

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
        <Title order={1}>Sales</Title> 
        <IconBuildingStore size="32px"/>
      </Group>
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
