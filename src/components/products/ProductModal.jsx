import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../redux/products/productsOperations.js";
import styles from "./productModal.module.css";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    category: product ? product.category : "Medicine", // Устанавливаем значение по умолчанию
    stock: product ? product.stock : 0,
    suppliers: product ? product.suppliers.join(", ") : "",
    price: product ? product.price : 0,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Загрузка категорий (пример)
    setCategories(["Medicine", "Heart", "Head", "Hand", "Leg"]);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...formData,
      suppliers: formData.suppliers.split(",").map((s) => s.trim()),
    };
    try {
      if (product) {
        await dispatch(
          updateProduct({ ...updatedProduct, _id: product._id })
        ).unwrap();
      } else {
        await dispatch(addProduct(updatedProduct)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Ошибка обновления продукта:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Info"
            value={formData.name}
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="suppliers"
            placeholder="Suppliers (comma-separated)"
            value={formData.suppliers}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <button type="submit">{product ? "Save" : "Add"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
