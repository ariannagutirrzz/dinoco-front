import PropTypes from "prop-types";
import { Modal, Text, Button } from "@mantine/core";

export const ConfirmationModal = ({
  opened,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = "",
  cancelLabel = "",
  confirmColor = "",
  cancelColor = "gray",
  size = "xl",
}) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} size={size} >
      <Text>{message}</Text>
      <Button color={confirmColor} onClick={onConfirm} mt="xl">
        {confirmLabel}
      </Button>
      <Button
        color={cancelColor}
        onClick={onClose}
        mt="xl"
        ml="sm"
      >
        {cancelLabel}
      </Button>
    </Modal>
  );
};

// Prop validation
ConfirmationModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmColor: PropTypes.string,
  cancelColor: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "xl", "lg", "xl"]),
};

// Default props
ConfirmationModal.defaultProps = {
  confirmLabel: "Delete",
  cancelLabel: "Cancel",
  confirmColor: "red",
  cancelColor: "gray",
  size: "xl",
};