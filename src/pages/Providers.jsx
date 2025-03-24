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
import { useProviders } from "../hooks/useProviders";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { CreateProviderModal } from "../components/Modals/CreateModals/CreateProviderModal";
import { IconUserPlus, IconMoodEmpty, IconAlertCircle, IconEye } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Providers() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteProviders,
    isDeleting,
    createProvider,
    isCreating,
    updateProvider,
    isUpdating,
  } = useProviders();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  // Modal for creating a provider
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [newProvider, setNewProvider] = useState({
    id_document: "",
    name: "",
    phone_number: "",
    email: "",
  });

  // Handle form submission for creating a provider
  const handleCreateProvider = () => {
    createProvider(newProvider, {
      onSuccess: () => {
        closeCreateModal();
        setNewProvider({
          id_document: "",
          name: "",
          phone_number: "",
          email: "",
        });
      },
    });
  };

  const handleEditProvider = (provider) => {
    setSelectedProvider(provider);
    setNewProvider({
      id_document: provider.id_document,
      name: provider.name,
      phone_number: provider.phone_number,
      email: provider.email,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateProvider = () => {
    updateProvider(
      { id: selectedProvider.id, ...newProvider },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewProvider({
            id_document: "",
            name: "",
            phone_number: "",
            email: "",
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
      message: "Failed to fetch providers. Please try again later.",
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
        <Title order={1}>Providers</Title>
        <Button leftSection={<IconUserPlus size={18} />} onClick={openCreateModal}>
          Create Provider
        </Button>
      </Group>

      {/* Handle empty data */}
      {!isFetching && (!data || data.length === 0) ? (
        <Center style={{ height: "60vh" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center" align="center">
              <IconMoodEmpty size={48} color="gray" />
              <Text size="xl">No providers found. Start by adding a new provider!</Text>
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
                  {[...Array(5)].map((_, index) => (
                    <Table.Th key={index}>
                      <Skeleton height={20} width="100%" />
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {[...Array(5)].map((_, rowIndex) => (
                  <Table.Tr key={rowIndex}>
                    {[...Array(5)].map((_, colIndex) => (
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
                    <Table.Th>Document ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Phone Number</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData?.map((provider, index) => (
                    <Table.Tr key={provider.id}>
                      <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                      <Table.Td>{provider.id_document}</Table.Td>
                      <Table.Td>{provider.name}</Table.Td>
                      <Table.Td>{provider.phone_number}</Table.Td>
                      <Table.Td>{provider.email}</Table.Td>
                      <Table.Td style={{ display: "flex", justifyContent: "center" }}>
                        <Group gap="xs">
                          <Button
                            variant="outline"
                            size="xs"
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleEditProvider(provider)}
                          >
                            View
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(provider.id)}
                            loading={deletingId === provider.id && isDeleting}
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
        message="Are you sure you want to delete this provider?"
        onConfirm={() => confirmDelete(deleteProviders)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />

      {/* Create Provider Modal */}
      <CreateProviderModal
        createModalOpened={createModalOpened}
        closeCreateModal={() => {
          closeCreateModal();
          setIsEditMode(false); // Reset the edit mode
        }}
        newProvider={newProvider}
        setNewProvider={setNewProvider}
        handleCreateProvider={handleCreateProvider}
        handleUpdateProvider={handleUpdateProvider}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
      />
    </Stack>
  );
}
