import { useState } from "react";
import styles from "./styles/addProductModal.module.css";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Medicine");
  const [stock, setStock] = useState(0);
  const [suppliers, setSuppliers] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: productName,
      category,
      stock: Number(stock),
      suppliers: suppliers.split(",").map((s) => s.trim()),
      price: `$${price}`,
    };
    onAddProduct(newProduct);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Medicine">Medicine</option>
            <option value="First Aid">First Aid</option>
            <option value="Supplements">Supplements</option>
          </select>
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Suppliers (comma-separated)"
            value={suppliers}
            onChange={(e) => setSuppliers(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
