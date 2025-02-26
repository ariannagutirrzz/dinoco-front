// hooks/useDeleteModal.js
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export const useDeleteModal = () => {
  const [deletingId, setDeletingId] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = (id) => {
    setDeletingId(id);
    open();
  };

  const confirmDelete = (onConfirm) => {
    onConfirm(deletingId);
    close();
  };

  return {
    deletingId,
    opened,
    open,
    close,
    handleDelete,
    confirmDelete,
  };
};
