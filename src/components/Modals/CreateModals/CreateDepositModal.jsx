import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  Button,
} from "@mantine/core";

export function CreateDepositModal({
  createModalOpened,
  closeCreateModal,
  newDeposit,
  setNewDeposit,
  handleCreateDeposit,
  handleUpdateDeposit,
  isCreating,
  isUpdating,
  isEditMode,
}) {
  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
        setNewDeposit({
          description: "",
          location: "",
        });
      }}
      title={isEditMode ? "Edit Deposit" : "Create Deposit"}
    >
      <Stack>
        <TextInput
          label="Description"
          value={newDeposit.description}
          onChange={(e) =>
            setNewDeposit({ ...newDeposit, description: e.target.value })
          }
          required
        />
        <TextInput
          label="Location"
          value={newDeposit.location}
          onChange={(e) =>
            setNewDeposit({ ...newDeposit, location: e.target.value })
          }
          required
        />
        <Button
          onClick={isEditMode ? handleUpdateDeposit : handleCreateDeposit}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Stack>
    </Modal>
  );
}

CreateDepositModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newDeposit: PropTypes.object.isRequired,
  setNewDeposit: PropTypes.func.isRequired,
  handleCreateDeposit: PropTypes.func.isRequired,
  handleUpdateDeposit: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool,
  isEditMode: PropTypes.bool,
};
