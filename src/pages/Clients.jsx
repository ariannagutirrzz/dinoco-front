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
import { useClients } from "../hooks/useClients";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { CreateClientModal } from "../components/Modals/CreateModals/CreateClientModal";
import { IconUserPlus, IconMoodEmpty, IconAlertCircle, IconEye } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function Clients() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteClients,
    isDeleting,
    createClient,
    isCreating,
    updateClient,
    isUpdating,
  } = useClients();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  // Modal for creating a client
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: "",
    id_document: "",
    birthday: null,
    phone_number: "",
    address: "",
  });

  // Handle form submission for creating a client
  const handleCreateClient = () => {
    createClient(newClient, {
      onSuccess: () => {
        closeCreateModal();
        setNewClient({
          name: "",
          id_document: "",
          birthday: null,
          phone_number: "",
          address: "",
        });
      },
    });
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setNewClient({
      name: client.name,
      id_document: client.id_document,
      birthday: client.birthday ? new Date(client.birthday) : null,
      phone_number: client.phone_number,
      address: client.address,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateClient = () => {
    updateClient(
      { id: selectedClient.id, ...newClient },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewClient({
            name: "",
            id_document: "",
            birthday: null,
            phone_number: "",
            address: "",
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
      message: "Failed to fetch clients. Please try again later.",
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
        <Title order={1}>Clients</Title>
        <Button leftSection={<IconUserPlus size={18} />} onClick={openCreateModal}>
          Create Client
        </Button>
      </Group>

      {/* Handle empty data */}
      {!isFetching && (!data || data.length === 0) ? (
        <Center style={{ height: "60vh" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center" align="center">
              <IconMoodEmpty size={48} color="gray" />
              <Text size="xl">No clients found. Start by adding a new client!</Text>
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
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Document ID</Table.Th>
                    <Table.Th>Birthday</Table.Th>
                    <Table.Th>Phone Number</Table.Th>
                    <Table.Th>Address</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData?.map((client, index) => (
                    <Table.Tr key={client.id}>
                      <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                      <Table.Td>{client.name}</Table.Td>
                      <Table.Td>{client.id_document}</Table.Td>
                      <Table.Td>{client.birthday || "N/A"}</Table.Td>
                      <Table.Td>{client.phone_number}</Table.Td>
                      <Table.Td>{client.address}</Table.Td>
                      <Table.Td style={{ display: "flex", justifyContent: "center" }}>
                        <Group gap="xs">
                          <Button
                            variant="outline"
                            size="xs"
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleEditClient(client)}
                          >
                            View
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(client.id)}
                            loading={deletingId === client.id && isDeleting}
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
        message="Are you sure you want to delete this client?"
        onConfirm={() => confirmDelete(deleteClients)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
      />

      {/* Create Client Modal */}
      <CreateClientModal
        createModalOpened={createModalOpened}
        closeCreateModal={() => {
          closeCreateModal();
          setIsEditMode(false); // This was necessary to reset the edit mode
        }}
        newClient={newClient}
        setNewClient={setNewClient}
        handleCreateClient={handleCreateClient}
        handleUpdateClient={handleUpdateClient}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
      />
    </Stack>
  );
}
