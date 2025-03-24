import React, { useEffect, useState } from 'react'; // Add React and useState, useEffect imports
import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Button,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export function CreateSalesModal({
  createModalOpened,
  closeCreateModal,
  newSale,
  setNewSale,
  handleCreateSale,
  handleUpdateSale,
  isCreating,
  isUpdating,
  isEditMode,
}) {

  const [users, setUsers] = useState([]); // Initialize state for users
  const [loadingUsers, setLoadingUsers] = useState(true); // Loading state for users
  const [error, setError] = useState(null); // Error state

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true); // Set loading state to true
        const response = await fetch("/api/v1/users"); // Fetch users from the API
        if (!response.ok) throw new Error("Failed to fetch users"); // Handle errors
        const data = await response.json(); // Parse the data
        console.log(data); // Log the fetched data for debugging
        setUsers(data); // Set users to the state
      } catch (error) {
        setError(error.message); // Set error message
        console.error("Error fetching users:", error); // Log the error
      } finally {
        setLoadingUsers(false); // Set loading state to false after fetch
      }
    };
    fetchUsers(); // Call fetchUsers on component mount
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
        setNewSale({
          id_seller: "",
          quantity: 0,
          sale_date: null,
          total_price: 0,
          client_id: "",
          name: "",
        });
      }}
      title={isEditMode ? "Edit Sale" : "Create Sale"}
    >
      <Stack>
        <TextInput
          label="Seller ID"
          value={newSale.id_seller}
          onChange={(e) =>
            setNewSale({ ...newSale, id_seller: e.target.value })
          }
          required
        />
        <NumberInput
          label="Quantity"
          value={newSale.quantity}
          onChange={(value) =>
            setNewSale({ ...newSale, quantity: value })
          }
          required
        />
        <DateInput
          label="Sale Date"
          placeholder="Select date"
          value={newSale.sale_date ? new Date(newSale.sale_date) : null}
          onChange={(value) =>
            setNewSale({ ...newSale, sale_date: value })
          }
        />
        <NumberInput
          label="Total Price"
          value={newSale.total_price}
          onChange={(value) =>
            setNewSale({ ...newSale, total_price: value })
          }
          required
        />
        <TextInput
          label="Client ID"
          value={newSale.client_id}
          onChange={(e) =>
            setNewSale({ ...newSale, client_id: e.target.value })
          }
          required
        />
        <Select
          label="Seller Name"
          placeholder="Select Seller"
          value={newSale.id_seller}
          onChange={(value) =>
            setNewSale({ ...newSale, id_seller: value })
          }
          data={users.map((user) => ({
            value: user.id.toString(), // Use user.id for value
            label: user.name, // Display user.name for the label
          }))}
          searchable
          nothingFoundMessage="No sellers found"
          disabled={loadingUsers || error} // Disable the Select if users are loading or there's an error
          description={error ? "Error loading sellers" : undefined} // Show error description
          error={error} // Show error message if any
          required
        />
        <Button
          onClick={isEditMode ? handleUpdateSale : handleCreateSale}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </Stack>
    </Modal>
  );
}

CreateSalesModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newSale: PropTypes.object.isRequired,
  setNewSale: PropTypes.func.isRequired,
  handleCreateSale: PropTypes.func.isRequired,
  handleUpdateSale: PropTypes.func,
  isCreating: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool,
  isEditMode: PropTypes.bool,
};
