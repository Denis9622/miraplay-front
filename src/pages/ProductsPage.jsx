import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../redux/products/productsOperations.js";
import { refreshToken } from "../redux/auth/authOperations.js";
import AddProductModal from "../components/products/AddProductModal.jsx";
import EditProductModal from "../components/products/EditProductModal.jsx";
import ProductTable from "../components/products/ProductTable.jsx";
import styles from "./productsPage.module.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState(""); // Поле ввода для фильтрации
  const [filteredProducts, setFilteredProducts] = useState([]); // Для фильтрованных данных
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Загрузка данных продуктов
  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then((fetchedItems) => setFilteredProducts(fetchedItems)) // Синхронизируем с загруженными данными
      .catch((error) => {
        if (error === "Refresh token required") {
          dispatch(refreshToken()).then(() => dispatch(fetchProducts()));
        }
      });
  }, [dispatch]);

  // Обработчик кнопки "Filter"
  const handleFilter = () => {
    const filtered = items.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleFilter} className={styles.filterButton}>
          Filter
        </button>
        <button
          onClick={() => setAddModalOpen(true)}
          className={styles.addButton}
        >
          <img src="/public/Vector.svg" alt="Add" className={styles.iconAdd} />
        </button>
        <p className={styles.textAdd}> Add a new product</p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ProductTable
        products={filteredProducts}
        onDelete={(_id) => dispatch(deleteProduct(_id))}
        onEdit={(product) => {
          setCurrentProduct(product);
          setEditModalOpen(true);
        }}
      />
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
