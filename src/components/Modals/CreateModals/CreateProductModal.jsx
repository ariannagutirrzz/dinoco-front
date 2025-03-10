import PropTypes from "prop-types";
import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
  Select,
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCategories } from "../../../hooks/useCategories";
import { useDeposits } from "../../../hooks/useDeposits";

export function CreateProductModal({
  createModalOpened,
  closeCreateModal,
  newProduct,
  setNewProduct,
  handleCreateProduct,
  isCreating,
}) {

  const { data: deposits } = useDeposits();
  const { data: categories } = useCategories();

  return (
    <Modal
      opened={createModalOpened}
      onClose={() => {
        closeCreateModal();
      }}
      title="Create Product"
    >
      <Stack>
        <TextInput
          label="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <NumberInput
          label="Price"
          value={newProduct.price}
          onChange={(value) => setNewProduct({ ...newProduct, price: value })}
          required
        />
        <NumberInput
          label="Quantity"
          value={newProduct.quantity}
          onChange={(value) =>
            setNewProduct({ ...newProduct, quantity: value })
          }
          required
        />
        <Select
          label="Deposit"
          placeholder="Select a deposit"
          data={(deposits || []).map((deposit) => ({
            label: deposit.description,
            value: deposit.description,
          }))}
          value={newProduct.deposit}
          onChange={(value) => setNewProduct({ ...newProduct, deposit: value })}
          required
        />

        <TextInput
          label="Sales Unit"
          placeholder="e.g. kg, g, l, ml, etc."
          value={newProduct.sales_unit}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sales_unit: e.target.value })
          }
        />
        <Select
          label="Category"
          placeholder="Select a category"
          data={(categories || []).map((category) => ({
            label: category.name,
            value: category.name,
          }))}
          value={newProduct.category}
          onChange={(value) =>
            setNewProduct({ ...newProduct, category: value })
          }
        />
        <DateInput
            label="Expire Date"
            value={newProduct.expire_date}
            onChange={(value) =>
                setNewProduct({ ...newProduct, expire_date: value })
            }
        />
        <Button onClick={handleCreateProduct} loading={isCreating}>
          Create
        </Button>
      </Stack>
    </Modal>
  );
}

CreateProductModal.propTypes = {
  createModalOpened: PropTypes.bool.isRequired,
  closeCreateModal: PropTypes.func.isRequired,
  newProduct: PropTypes.object.isRequired,
  setNewProduct: PropTypes.func.isRequired,
  handleCreateProduct: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};
