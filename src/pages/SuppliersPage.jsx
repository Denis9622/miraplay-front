import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../redux/suppliers/suppliersSlice";
import SuppliersTable from "../components/suppliers/SuppliersTable";
import styles from "./suppliersPage.module.css";

const SuppliersPage = () => {
  const dispatch = useDispatch();
  const {
    items: suppliers,
    loading,
    error,
  } = useSelector((state) => state.suppliers);
  const [filterName, setFilterName] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [supplierForm, setSupplierForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(filterName.toLowerCase())
      )
    );
  }, [filterName, suppliers]);

  const handleAddSupplier = () => {
    dispatch(addSupplier(supplierForm));
    resetSupplierForm();
    setIsModalOpen(false);
  };

  const handleUpdateSupplier = () => {
    if (editSupplierId) {
      dispatch(
        updateSupplier({ id: editSupplierId, supplierData: supplierForm })
      );
      resetSupplierForm();
      setIsModalOpen(false);
    }
  };

  const handleEditSupplier = (supplier) => {
    setSupplierForm({
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
    });
    setEditSupplierId(supplier._id);
    setIsModalOpen(true);
  };

  const handleDeleteSupplier = (id) => {
    dispatch(deleteSupplier(id));
  };

  const resetSupplierForm = () => {
    setSupplierForm({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
    setEditSupplierId(null);
  };

  return (
    <div className={styles.suppliersPage}>
      {loading && <p>Loading suppliers...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className={styles.filterInput}
        />
        <button className={styles.filterButton}>Filter</button>
        <button
          className={styles.openModalButton}
          onClick={() => setIsModalOpen(true)}
        >
          {editSupplierId ? "Edit Supplier" : "Add Supplier"}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => {
                resetSupplierForm();
                setIsModalOpen(false);
              }}
            >
              ✖
            </button>
            <h2>{editSupplierId ? "Edit Supplier" : "Add Supplier"}</h2>
            <div className={styles.form}>
              <input
                type="text"
                placeholder="Name"
                value={supplierForm.name}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={supplierForm.email}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                value={supplierForm.address}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, address: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={supplierForm.phone}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, phone: e.target.value })
                }
              />
              <button
                onClick={
                  editSupplierId ? handleUpdateSupplier : handleAddSupplier
                }
                className={styles.addButton}
              >
                {editSupplierId ? "Update Supplier" : "Add Supplier"}
              </button>
            </div>
          </div>
        </div>
      )}

      <SuppliersTable
        suppliers={filteredSuppliers}
        handleEditSupplier={handleEditSupplier}
        handleDeleteSupplier={handleDeleteSupplier}
      />
    </div>
  );
};

export default SuppliersPage;
