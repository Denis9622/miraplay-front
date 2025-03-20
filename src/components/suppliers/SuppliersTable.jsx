import styles from "./suppliersTable.module.css";

const SuppliersTable = ({
  suppliers,
  handleEditSupplier,
  handleDeleteSupplier,
}) => {
  return (
    <div className={styles.suppliersTable}>
      <h3>All Suppliers</h3>
      <div className={styles.recentSuppliers}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.noSuppliers}>
                  No suppliers found
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.company}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.amount}</td>
                  <td>
                    {new Date(supplier.deliveryDate).toLocaleDateString()}
                  </td>
                  <td>{supplier.status}</td>
                  <td>
                    <div className={styles.buttonBox}>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditSupplier(supplier)}
                      >
                        <svg className={styles.iconEdit}>
                          <use href="/public/sprite.svg#icon-edit"></use>
                        </svg>
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteSupplier(supplier._id)}
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
