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
  Modal,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconMoodEmpty, IconAlertCircle, IconEye, IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteProduct,
    isDeleting,
  } = useProducts();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  // Modal for creating a product
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    id_deposit: "",
    sales_unit: "",
    category: "",
  });

  // Show error notification if there's an error
  if (isErrorFetch) {
    notifications.show({
      title: "Error",
      message: "Failed to fetch products. Please try again later.",
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
              No products found. Start by adding a new product!
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

  // Handle form submission for creating a product
  const handleCreateProduct = () => {
    // Add your logic to create the product here
    console.log("New Product:", newProduct);
    closeCreateModal();
  };

  return (
    <Stack align="center" overflow="hidden" pos="relative">
      <Group justify="space-between" align="center" style={{ width: "100%" }}>
        <Title order={1}>Products</Title>
        <Button
          leftSection={<IconPlus size={18} />}
          onClick={openCreateModal}
        >
          Create Product
        </Button>
      </Group>

      {/* Skeleton Loading State */}
      {isFetching ? (
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              {[...Array(8)].map((_, index) => (
                <Table.Th key={index}>
                  <Skeleton height={20} width="100%" />
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <Table.Tr key={rowIndex}>
                {[...Array(8)].map((_, colIndex) => (
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
        <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Deposit</Table.Th>
              <Table.Th>Sale Unit</Table.Th>
              {/* <Table.Th>Category</Table.Th> */}
              <Table.Th style={{ alignContent: "center", justifySelf:"center", 
                display: "flex", justifyContent: "center", alignItems: "center"
              }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedData?.map((product, index) => (
              <Table.Tr key={product.id}>
                <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>${product.price}</Table.Td>
                <Table.Td >{product.quantity}</Table.Td>
                <Table.Td>{product.id_deposit}</Table.Td>
                <Table.Td>{product.sales_unit}</Table.Td>
                {/* <Table.Td>{product.category}</Table.Td> */}
                <Table.Td style={{ alignContent: "center", justifySelf:"center", 
                display: "flex", justifyContent: "center", alignItems: "center"
              }}>
                  <Group gap="xs">
                    <Button
                      variant="outline"
                      size="xs"
                      leftSection={<IconEye size={14} />}
                      onClick={() => {
                        // Add logic to view details
                        console.log("View details for product:", product.id);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => handleDelete(product.id)}
                      loading={deletingId === product.id && isDeleting}
                    >
                      Delete
                    </Button>
                  </Group>
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
        message="Are you sure you want to delete this product?"
        onConfirm={() => confirmDelete(deleteProduct)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />

      {/* Create Product Modal */}
      <Modal opened={createModalOpened} onClose={closeCreateModal} title="Create Product">
        <Stack>
          <TextInput
            label="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <NumberInput
            label="Price"
            value={newProduct.price}
            onChange={(value) => setNewProduct({ ...newProduct, price: value })}
            required
          />
          <NumberInput
            label="Quantity"
            value={newProduct.quantity}
            onChange={(value) => setNewProduct({ ...newProduct, quantity: value })}
            required
          />
          <TextInput
            label="Deposit"
            value={newProduct.id_deposit}
            onChange={(e) => setNewProduct({ ...newProduct, id_deposit: e.target.value })}
          />
          <TextInput
            label="Sales Unit"
            value={newProduct.sales_unit}
            onChange={(e) => setNewProduct({ ...newProduct, sales_unit: e.target.value })}
          />
          <TextInput
            label="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <Button onClick={handleCreateProduct}>Create</Button>
        </Stack>
      </Modal>
    </Stack>
  );
}