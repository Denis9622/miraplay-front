import styles from "./suppliersTable.module.css";

const SuppliersTable = ({ suppliers, handleEditSupplier, handleDeleteSupplier }) => {
  return (
    <div className={styles.suppliersTable}>
      <h3>All Suppliers</h3>
      <div className={styles.recentSuppliers}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="5" className={styles.noSuppliers}>
                  No suppliers found
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <div className={styles.buttonBox}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditSupplier(supplier)} // Edit supplier
                      >
                        <svg className={styles.iconEdit}>
                          <use href="/public/sprite.svg#icon-edit"></use>
                        </svg>
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteSupplier(supplier._id)} // Delete supplier
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

export default SuppliersTable;