import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";


export function CreateUserModal({
  createModalOpened,
  closeCreateModal,
  newUser,
  setNewUser,
  handleCreateUser,
  handleUpdateUser,
  isCreating,
  isUpdating,
  isEditMode,
  
}) {
  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
        setNewUser({
          name: "",
          id_document: "",
          phone_number: "",
    
        });
      }}
      title={isEditMode ? "Edit User" : "Create User"}
    >
      <Stack>
        <TextInput
          label="Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ ...newUser, name: e.target.value })
          }
          required
        />
        <TextInput
          label="ID Document"
          value={newUser.id_document}
          onChange={(e) =>
            setNewUser({ ...newUser, id_document: e.target.value })
          }
          required
        />
        <NumberInput
          label="Phone Number"
          value={newUser.phone_number}
          onChange={(value) =>
            setNewUser({ ...newUser, phone_number: value })
          }
          required
        />
        
        <Button
          onClick={isEditMode ? handleUpdateUser : handleCreateUser}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Stack>
    </Modal>
  );
}

CreateUserModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
  setNewUser: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool,
  isEditMode: PropTypes.bool,
};
