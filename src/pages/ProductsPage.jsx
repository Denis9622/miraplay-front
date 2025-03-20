import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../redux/products/productsOperations.js";
import { refreshToken } from "../redux/auth/authOperations.js";
import ProductModal from "../components/products/ProductModal.jsx";
import ProductTable from "../components/products/ProductTable.jsx";
import styles from "./productsPage.module.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState(""); // Поле ввода для фильтрации
  const [filteredProducts, setFilteredProducts] = useState([]); // Для фильтрованных данных
  const [isModalOpen, setModalOpen] = useState(false);
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

  // Обработчик редактирования продукта
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setModalOpen(true);
  };

  // Обработчик удаления продукта
  const handleDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

  // Обработчик добавления продукта
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setModalOpen(true);
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
        <button onClick={handleAddProduct} className={styles.addButton}>
          <img src="/public/Vector.svg" alt="Add" className={styles.iconAdd} />
        </button>
        <p className={styles.textAdd}> Add a new product</p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error.message || error}</p>}
      <ProductTable
        products={filteredProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleEditProduct={handleEditProduct}
      />
      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
