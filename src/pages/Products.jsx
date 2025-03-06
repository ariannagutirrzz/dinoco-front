import {
  Title,
  Text,
  Stack,
  Table,
  Pagination,
  Box,
  Button,
  Group,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconBuildingStore } from "@tabler/icons-react";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    fetchError,
    deleteProduct,
    isDeleting,
  } = useProducts();

  const { deletingId, opened, close, handleDelete, confirmDelete } =
    useDeleteModal();

  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isErrorFetch) {
    return <Text>{fetchError}</Text>;
  }

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Stack align="center" overflow="hidden" pos="relative">
      <Group justify="center" align="center">
        <Title order={1}>Products</Title> 
        <IconBuildingStore size="32px"/>
      </Group>
      <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Expire Date</Table.Th>
            <Table.Th>Deposit</Table.Th>
            <Table.Th>Sale Unit</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData?.map((product, index) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>${product.price}</Table.Td>
              <Table.Td>{product.quantity}</Table.Td>
              <Table.Td>{product.expire_date}</Table.Td>
              <Table.Td>{product.id_deposit}</Table.Td>
              <Table.Td>{product.sales_unit}</Table.Td>
              <Table.Td>
                <Button
                  color="red"
                  onClick={() => handleDelete(product.id)}
                  loading={deletingId === product.id && isDeleting}
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
        message="Are you sure you want to delete this product?"
        onConfirm={() => confirmDelete(deleteProduct)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />
    </Stack>
  );
}
