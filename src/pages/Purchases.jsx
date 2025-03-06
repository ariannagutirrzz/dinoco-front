import { usePurchases } from "../hooks/usePurchases"; // Changed to usePurchases
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { Title, Text, Stack, Table, Pagination, Box, Button, Group } from "@mantine/core";
import { IconCreditCardPay } from "@tabler/icons-react"; // Ensure this import is correct

export default function Purchases() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data = [], // Initialize data as an empty array
    isFetching,
    isErrorFetch,
    fetchError,
    deletePurchases, // Changed to deletePurchases
    isDeleting,
  } = usePurchases(); // Changed to usePurchases hook

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
        <Title order={1}>Purchases</Title> 
        <IconCreditCardPay size="32px"/>
      </Group>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>ID Deposit</Table.Th>
            <Table.Th>ID Provider</Table.Th>
            <Table.Th>Purchase Date</Table.Th>
            <Table.Th>Total Price</Table.Th>
            <Table.Th>Created By</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData.map((purchase, index) => (
            <Table.Tr key={purchase.id}>
              <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
              <Table.Td>{purchase.id_deposit}</Table.Td>
              <Table.Td>{purchase.id_provider}</Table.Td>
              <Table.Td>{purchase.purchase_date}</Table.Td>
              <Table.Td>{purchase.total}</Table.Td>
              <Table.Td>{purchase.created_by}</Table.Td>
              <Table.Td> 
                <Button
                  color="red"
                  onClick={() => handleDelete(purchase.id)}
                  loading={deletingId === purchase.id && isDeleting}
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
        message="Are you sure you want to delete this purchase?"
        onConfirm={() => confirmDelete(() => deletePurchases(deletingId))}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="md"
      />
    </Stack>
  );
}
