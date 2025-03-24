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
import { useSales } from "../hooks/useSales"; // Update hook name to `useSales`
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { CreateSalesModal } from "../components/Modals/CreateModals/CreateSalesModal"; // Update modal name to `CreateSaleModal`
import { IconUserPlus, IconMoodEmpty, IconAlertCircle, IconEye } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Sales() { // Update component name to `Sales`
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteSale, // Update delete function to `deleteSale`
    isDeleting,
    createSale, // Update create function to `createSale`
    isCreating,
    updateSale, // Update update function to `updateSale`
    isUpdating,
  } = useSales(); // Use `useSales` hook instead of `useClients`

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  // Modal for creating a sale
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [newSale, setNewSale] = useState({
    quantity: "",
    sale_date: null,
    total_price: "",
    client_id: "", // reference to the client ID
  });

  // Handle form submission for creating a sale
  const handleCreateSale = () => {
    createSale(newSale, {
      onSuccess: () => {
        closeCreateModal();
        setNewSale({
          id_seller: "",
          quantity: "",
          sale_date: null,
          total_price: "",
          client_id: "",
        });
      },
    });
  };

  const handleEditSale = (sale) => {
    setSelectedSale(sale);
    setNewSale({
      id_seller: sale.name,
      quantity: sale.quantity,
      sale_date: sale.sale_date ? new Date(sale.sale_date) : null,
      total_price: sale.total_price,
      client_id: sale.client_id,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateSale = () => {
    updateSale(
      { id: selectedSale.id, ...newSale },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewSale({
            quantity: "",
            sale_date: null,
            total_price: "",
            client_id: "",
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
      message: "Failed to fetch sales. Please try again later.",
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
        <Title order={1}>Sales</Title> {/* Update title to `Sales` */}
        <Button leftSection={<IconUserPlus size={18} />} onClick={openCreateModal}>
          Create Sale {/* Update button text to `Create Sale` */}
        </Button>
      </Group>

      {/* Handle empty data */}
      {!isFetching && (!data || data.length === 0) ? (
        <Center style={{ height: "60vh" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center" align="center">
              <IconMoodEmpty size={48} color="gray" />
              <Text size="xl">No sales found. Start by adding a new sale!</Text>
            </Group>
          </Card>
        </Center>
      ) : (
        <>
          {/* Skeleton Loading State */}
          {isFetching ? (
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  {[...Array(6)].map((_, index) => (
                    <Table.Th key={index}>
                      <Skeleton height={20} width="100%" />
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    {[...Array(6)].map((_, colIndex) => (
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
                    <Table.Th>Seller Name</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Sale Date</Table.Th>
                    <Table.Th>Total Price</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData?.map((sale, index) => (
                    <Table.Tr key={sale.id}>
                      <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                      <Table.Td>{sale.users?.name}</Table.Td>
                      <Table.Td>{sale.quantity}</Table.Td>
                      <Table.Td>{sale.sale_date || "N/A"}</Table.Td>
                      <Table.Td>{sale.total_price}</Table.Td>
                      <Table.Td>{sale.clients?.name}</Table.Td>
                      <Table.Td style={{ display: "flex", justifyContent: "center" }}>
                        <Group gap="xs">
                          <Button
                            variant="outline"
                            size="xs"
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleEditSale(sale)}
                          >
                            View
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(sale.id)}
                            loading={deletingId === sale.id && isDeleting}
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
            <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} />
          </Box>
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        opened={opened}
        onClose={close}
        title="Confirm Deletion"
        message="Are you sure you want to delete this sale?"
        onConfirm={() => confirmDelete(deleteSale)} // Update to `deleteSale`
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />

      {/* Create Sale Modal */}
      <CreateSalesModal
        createModalOpened={createModalOpened}
        closeCreateModal={() => {
          closeCreateModal();
          setIsEditMode(false); // This was necessary to reset the edit mode
        }}
        newSale={newSale}
        setNewSale={setNewSale}
        handleCreateSale={handleCreateSale}
        handleUpdateSale={handleUpdateSale}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
      />
    </Stack>
  );
}
