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
  ScrollArea,
} from "@mantine/core";
import { useProducts } from "../hooks/useProducts";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { useState } from "react";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { CreateProductModal } from "../components/Modals/CreateModals/CreateProductModal";
import { IconMoodEmpty, IconAlertCircle, IconEye, IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteProduct,
    isDeleting,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
  } = useProducts();


  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();


  // Modal for creating a product
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    deposit: "",
    sales_unit: "",
    category: "",
  });

  // Handle form submission for creating a product
  const handleCreateProduct = () => {
    createProduct(newProduct, {
      onSuccess: () => {
        closeCreateModal();
        setNewProduct({
          name: "",
          price: 0,
          quantity: 0,
          deposit: "",
          sales_unit: "",
          category: "",
          expire_date: "",
        });
      },
    });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      deposit: product.deposit,
      sales_unit: product.sales_unit,
      category: product.category,
      expire_date: product.expire_date ? new Date(product.expire_date) : null,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateProduct = () => {
    updateProduct(
      { id: selectedProduct.id, ...newProduct },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewProduct({
            name: "",
            price: 0,
            quantity: 0,
            deposit: "",
            sales_unit: "",
            category: "",
            expire_date: null,
          });
          setIsEditMode(false);
        },
      }
    );
  };
  // Show error notification if there's an error
  if (isErrorFetch) {
    notifications.show({
      title: "Error",
      message: "Failed to fetch products. Please try again later.",
      color: "red",
      icon: <IconAlertCircle size={18} />,
    });
  }

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

      {/* Handle empty data */}
      {!isFetching && (!data || data.length === 0) ? (
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
      ) : (
        // Table and Pagination
        <>
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
            <ScrollArea w="100%">
            <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th style={{ minWidth: "250px", textAlign: "center" }}>Name</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th style={{ minWidth: "140px", textAlign: "center" }}>Deposit</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Sale Unit</Table.Th>
                  <Table.Th>Expire Date</Table.Th>
                  <Table.Th style={{ minWidth: "300px", maxWidth: "100px", textAlign: "center" }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {paginatedData?.map((product, index) => (
                  <Table.Tr key={product.id}>
                    <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                    <Table.Td>{product.name}</Table.Td>
                    <Table.Td>${product.price}</Table.Td>
                    <Table.Td>{product.quantity}</Table.Td>
                    <Table.Td>{product.deposit}</Table.Td>
                    <Table.Td>{product.category}</Table.Td>
                    <Table.Td>{product.sales_unit}</Table.Td>
                    <Table.Td>{product.expire_date || "N/A"}</Table.Td>
                    <Table.Td style={{ display: "flex", justifyContent: "center" }}>
                      <Group gap="xs">
                        <Button
                          variant="outline"
                          size="xs"
                          leftSection={<IconEye size={14} />}
                          onClick={() => handleEditProduct(product)}
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
          </ScrollArea>
          )}

          {/* Pagination */}
          <Box>
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
            />
          </Box>
        </>
      )}

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
      <CreateProductModal
        createModalOpened={createModalOpened}
        closeCreateModal={() => {
          closeCreateModal();
          setIsEditMode(false); // This was necessary to reset the edit mode
        }}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleCreateProduct={handleCreateProduct}
        handleUpdateProduct={handleUpdateProduct}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
      />
    </Stack>
  );
}