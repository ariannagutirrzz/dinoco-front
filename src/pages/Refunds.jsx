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
  } from "@mantine/core";
  import { useRefunds } from "../hooks/useRefunds";
  import { useState } from "react";
  import { useDeleteModal } from "../hooks/useDeleteModal";
  import { ConfirmationModal } from "../components/Modals/ConfirmationModal";
  import { IconReceiptRefund, IconMoodEmpty, IconAlertCircle } from "@tabler/icons-react"; // Ensure this import is correct
  import { notifications } from "@mantine/notifications";
  
  export default function Refunds() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
  
    const {
      data,
      isFetching,
      isErrorFetch,
      deleteRefunds,
      isDeleting,
    } = useRefunds();
  
    const { deletingId, opened, close, handleDelete, confirmDelete } = useDeleteModal();
  
    // Show error notification if there's an error
    if (isErrorFetch) {
      notifications.show({
        title: "Error",
        message: "Failed to fetch refunds. Please try again later.",
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
              <Text size="xl">No refunds found.</Text>
            </Group>
          </Card>
        </Center>
      );
    }
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    return (
      <Stack align="center" overflow="hidden" pos="relative">
        <Group justify="center" align="center">
          <Title order={1}>Refunds</Title> 
          <IconReceiptRefund size="32px"/>
        </Group>
  
        {/* Skeleton Loading State */}
        {isFetching ? (
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                {[...Array(1)].map((_, index) => (
                  <Table.Th key={index}>
                    <Skeleton height={20} width="100%" />
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {[...Array(16)].map((_, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  {[...Array(1)].map((_, colIndex) => (
                    <Table.Td key={colIndex}>
                      <Skeleton height={20} width="100%" />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Table striped highlightOnHover withTableBorder horizontalSpacing="xl" variant withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Sale ID</Table.Th>
                <Table.Th>Refund Date</Table.Th>
                <Table.Th>Refund Reason</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
  
            <Table.Tbody>
              {paginatedData.map((refund, index) => (
                <Table.Tr key={refund.id}>
                  <Table.Td>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Td>
                  <Table.Td>{refund.sale_id}</Table.Td>
                  <Table.Td>{refund.refund_date}</Table.Td>
                  <Table.Td>{refund.refund_reason}</Table.Td>
                  <Table.Td>{refund.status}</Table.Td>
                  <Table.Td> 
                    <Button
                      color="red"
                      onClick={() => handleDelete(refund.id)}
                      loading={deletingId === refund.id && isDeleting}
                    >
                      Delete
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
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
          message="Are you sure you want to delete this refund?"
          onConfirm={() => confirmDelete(() => deleteRefunds(deletingId))}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmColor="red"
          cancelColor="gray"
          size="md"
        />
      </Stack>
    );
  }
  