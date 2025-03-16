import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/products/productsOperations.js";
import styles from "./productModal.module.css";

const AddProductModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "Medicine", // Устанавливаем значение по умолчанию
    stock: 0,
    suppliers: "",
    price: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({ ...formData, suppliers: formData.suppliers.split(",") })
    );
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Info"
            onChange={handleChange}
            required
          />
          {/* Выпадающий список для категорий */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Medicine">Medicine</option>
            <option value="Heart">Heart</option>
            <option value="Head">Head</option>
            <option value="Hand">Hand</option>
            <option value="Leg">Leg</option>
          </select>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="suppliers"
            placeholder="Suppliers (comma-separated)"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
