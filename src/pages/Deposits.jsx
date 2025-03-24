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
import { useDeposits } from "../hooks/useDeposits";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { CreateDepositModal } from "../components/Modals/CreateModals/CreateDepositModal";
import { IconBuildingBank, IconMoodEmpty, IconAlertCircle, IconEye } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Deposits() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteDeposits,
    isDeleting,
    createDeposit,
    isCreating,
    updateDeposit,
    isUpdating,
  } = useDeposits();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  // Modal for creating a deposit
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [newDeposit, setNewDeposit] = useState({
    description: "",
    location: "",
  });

  // Handle form submission for creating a deposit
  const handleCreateDeposit = () => {
    createDeposit(newDeposit, {
      onSuccess: () => {
        closeCreateModal();
        setNewDeposit({ description: "", location: "" });
      },
    });
  };

  const handleEditDeposit = (deposit) => {
    setSelectedDeposit(deposit);
    setNewDeposit({
      description: deposit.description,
      location: deposit.location,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateDeposit = () => {
    updateDeposit(
      { id: selectedDeposit.id, ...newDeposit },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewDeposit({ description: "", location: "" });
          setIsEditMode(false);
        },
      }
    );
  };

  // Show error notification if there's an error
  if (isErrorFetch) {
    notifications.show({
      title: "Error",
      message: "Failed to fetch deposits. Please try again later.",
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
        <Title order={1}>Deposits</Title>
        <Button leftSection={<IconBuildingBank size={18} />} onClick={openCreateModal}>
          Create Deposit
        </Button>
      </Group>

      {/* Handle empty data */}
      {!isFetching && (!data || data.length === 0) ? (
        <Center style={{ height: "60vh" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center" align="center">
              <IconMoodEmpty size={48} color="gray" />
              <Text size="xl">No deposits found. Start by adding a new deposit!</Text>
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
                  {[...Array(3)].map((_, index) => (
                    <Table.Th key={index}>
                      <Skeleton height={20} width="100%" />
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    {[...Array(3)].map((_, colIndex) => (
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
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Location</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData?.map((deposit, index) => (
                    <Table.Tr key={deposit.id}>
                      <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                      <Table.Td>{deposit.description}</Table.Td>
                      <Table.Td>{deposit.location}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Button
                            variant="outline"
                            size="xs"
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleEditDeposit(deposit)}
                          >
                            View
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(deposit.id)}
                            loading={deletingId === deposit.id && isDeleting}
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
        message="Are you sure you want to delete this deposit?"
        onConfirm={() => confirmDelete(deleteDeposits)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />

      {/* Create Deposit Modal */}
      <CreateDepositModal
        createModalOpened={createModalOpened}
        closeCreateModal={closeCreateModal}
        newDeposit={newDeposit}
        setNewDeposit={setNewDeposit}
        handleCreateDeposit={handleCreateDeposit}
        handleUpdateDeposit={handleUpdateDeposit}
        isCreating={isCreating ?? false}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
      />
    </Stack>
  );
}
