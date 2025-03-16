import styles from "./productTable.module.css";

const ProductTable = ({ products, onDelete, onEdit }) => {
  return (
    <div className={styles.productTable}>
      <h3 className={styles.tableTitle}>All Products</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Suppliers</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.noProducts}>
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className={styles.tableRow}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.suppliers.join(", ")}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <div className={styles.buttonBox}>
                      <button
                        className={styles.editButton}
                        onClick={() => onEdit(product)}
                      >
                        <svg className={styles.iconEdit}>
                          <use href="/public/sprite.svg#icon-edit"></use>
                        </svg>
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => onDelete(product._id)}
                      >
                        <svg className={styles.iconDelete}>
                          <use href="/public/sprite.svg#icon-delete"></use>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
