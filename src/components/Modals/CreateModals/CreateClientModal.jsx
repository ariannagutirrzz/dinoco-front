import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import '@mantine/dates/styles.css';
import { DateInput } from "@mantine/dates";

export function CreateClientModal({
  createModalOpened,
  closeCreateModal,
  newClient,
  setNewClient,
  handleCreateClient,
  handleUpdateClient,
  isCreating,
  isUpdating,
  isEditMode,
  
}) {
  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
        setNewClient({
          name: "",
          id_document: "",
          birthday: null,
          phone_number: "",
          address: "",
        });
      }}
      title={isEditMode ? "Edit Client" : "Create Client"}
    >
      <Stack>
        <TextInput
          label="Name"
          value={newClient.name}
          onChange={(e) =>
            setNewClient({ ...newClient, name: e.target.value })
          }
          required
        />
        <TextInput
          label="ID Document"
          value={newClient.id_document}
          onChange={(e) =>
            setNewClient({ ...newClient, id_document: e.target.value })
          }
          required
        />
        <DateInput
          label="Birthday"
          placeholder="Select date"
          value={newClient.birthday ? new Date(newClient.birthday) : null}
          onChange={(value) =>
            setNewClient({ ...newClient, birthday: value })
          }
        />
        <NumberInput
          label="Phone Number"
          value={newClient.phone_number}
          onChange={(value) =>
            setNewClient({ ...newClient, phone_number: value })
          }
          required
        />
        <TextInput
          label="Address"
          value={newClient.address}
          onChange={(e) =>
            setNewClient({ ...newClient, address: e.target.value })
          }
        />
        <Button
          onClick={isEditMode ? handleUpdateClient : handleCreateClient}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Stack>
    </Modal>
  );
}

CreateClientModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newClient: PropTypes.object.isRequired,
  setNewClient: PropTypes.func.isRequired,
  handleCreateClient: PropTypes.func.isRequired,
  handleUpdateClient: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool,
  isEditMode: PropTypes.bool,
};
