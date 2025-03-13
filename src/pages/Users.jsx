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
import { useUsers } from "../hooks/useUsers";
import { useState } from "react";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
import { IconUserPlus, IconMoodEmpty, IconAlertCircle, IconEye } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { CreateUserModal } from "../components/Modals/CreateModals/CreateUserModal";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const {
    data,
    isFetching,
    isErrorFetch,
    deleteUsers,
    isDeleting,
    createUser,
    isCreating,
    updateUser,
    isUpdating,
  } = useUsers();

  const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();

  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id_document: "",
    name: "",
    phone_number: "",
  });

  const handleCreateUser = () => {
    createUser(newUser, {
      onSuccess: () => {
        closeCreateModal();
        setNewUser({
          id_document: "",
          name: "",
          phone_number: "",
        });
      },
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      id_document: user.id_document,
      name: user.name,
      phone_number: user.phone_number,
    });
    setIsEditMode(true);
    openCreateModal();
  };

  const handleUpdateUser = () => {
    updateUser(
      { id: selectedUser.id, ...newUser },
      {
        onSuccess: () => {
          closeCreateModal();
          setNewUser({
            id_document: "",
            name: "",
            phone_number: "",
          });
          setIsEditMode(false);
        },
      }
    );
  };

  if (isErrorFetch) {
    notifications.show({
      title: "Error",
      message: "Failed to fetch users. Please try again later.",
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
        <Title order={1}>Users</Title>
        <Button leftSection={<IconUserPlus size={18} />} onClick={openCreateModal}>
          Create User
        </Button>
      </Group>

      {!isFetching && (!data || data.length === 0) ? (
        <Center style={{ height: "60vh" }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="center" align="center">
              <IconMoodEmpty size={48} color="gray" />
              <Text size="xl">No users found. Start by adding a new user!</Text>
            </Group>
          </Card>
        </Center>
      ) : (
        <>
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
            <ScrollArea w="100%">
              <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                  <Table.Th>ID</Table.Th>
                    <Table.Th>Document ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Phone Number</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedData?.map((user, index) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                      <Table.Td>{user.id_document}</Table.Td>
                      <Table.Td>{user.name}</Table.Td>
                      <Table.Td>{user.phone_number}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Button
                            variant="outline"
                            size="xs"
                            leftSection={<IconEye size={14} />}
                            onClick={() => handleEditUser(user)}
                          >
                            View
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(user.id)}
                            loading={deletingId === user.id && isDeleting}
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
          <Box>
            <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} />
          </Box>
        </>
      )}
      <ConfirmationModal
        opened={opened}
        onClose={close}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        onConfirm={() => confirmDelete(deleteUsers)}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="red"
        cancelColor="gray"
        size="sm"
    />

        {/* Create User Modal */}
      <CreateUserModal
        createModalOpened={createModalOpened}
        closeCreateModal={() => {
          closeCreateModal();
          setIsEditMode(false); // Reset edit mode like in Client Modal
        }}
        newUser={newUser}
        setNewUser={setNewUser}
        handleCreateUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
        isCreating={isCreating}
        isUpdating={isUpdating}
        isEditMode={isEditMode}
        
      />
    </Stack>
  );
}
