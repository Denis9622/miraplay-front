import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../redux/products/productsOperations.js";
import { refreshToken } from "../redux/auth/authOperations.js";
import AddProductModal from "../components/products/AddProductModal.jsx";
import EditProductModal from "../components/products/EditProductModal.jsx";
import styles from "./productsPage.module.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .catch((error) => {
        if (error === "Refresh token required") {
          dispatch(refreshToken()).then(() => dispatch(fetchProducts()));
        }
      });
  }, [dispatch]);

  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.productsPage}>
      <h1>Products</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className={styles.addButton}
      >
        + Add Product
      </button>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.productList}>
        {filteredProducts.map((product) => (
          <li key={product._id} className={styles.productItem}>
            <span>
              {product.name} - ${product.price}
            </span>
            <div>
              <button
                onClick={() => {
                  setCurrentProduct(product);
                  setEditModalOpen(true);
                }}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteProduct(product._id))}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальные окна */}
      {isAddModalOpen && (
        <AddProductModal onClose={() => setAddModalOpen(false)} />
      )}
      {isEditModalOpen && currentProduct && (
        <EditProductModal
          product={currentProduct}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
