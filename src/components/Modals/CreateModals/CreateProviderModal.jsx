import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import "@mantine/dates/styles.css";

export function CreateProviderModal({
  createModalOpened,
  closeCreateModal,
  newProvider,
  setNewProvider,
  handleCreateProvider,
  handleUpdateProvider,
  isCreating,
  isUpdating,
  isEditMode,
}) {
  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
        setNewProvider({
          id_document : "",
          name: "",
          phone_number: "",
          email: "",
        });
      }}
      title={isEditMode ? "Edit Provider" : "Create Provider"}
    >
      <Stack>
        <TextInput
          label="ID Document"
          value={newProvider.id_document}
          onChange={(e) =>
            setNewProvider({ ...newProvider, id_document: e.target.value })
          }
          required
        />
        <TextInput
          label="Name"
          value={newProvider.name}
          onChange={(e) =>
            setNewProvider({ ...newProvider, name: e.target.value })
          }
          required
        />
        <NumberInput
          label="Phone Number"
          value={newProvider.phone_number}
          onChange={(value) =>
            setNewProvider({ ...newProvider, phone_number: value })
          }
          required
        />
        <TextInput
          label="Email"
          value={newProvider.email}
          onChange={(e) =>
            setNewProvider({ ...newProvider, email: e.target.value })
          }
          required
        />
        <Button
          onClick={isEditMode ? handleUpdateProvider : handleCreateProvider}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Stack>
    </Modal>
  );
}

CreateProviderModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newProvider: PropTypes.object.isRequired,
  setNewProvider: PropTypes.func.isRequired,
  handleCreateProvider: PropTypes.func.isRequired,
  handleUpdateProvider: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool,
  isEditMode: PropTypes.bool,
};
