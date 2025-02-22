import { useState, useEffect } from "react";
import styles from "./productsPage.module.css";
import { mockProducts } from "../data/mockData.js";
import AddProductModal from "../components/products/AddProductModal.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
    }, 1000);
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.productsPage}>
      <h1>Products</h1>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Filter by product name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filterInput}
        />
        <button
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Product
        </button>
      </div>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Suppliers</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.suppliers.join(", ")}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noProducts}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
