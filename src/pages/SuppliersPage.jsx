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
    company: "",
    address: "",
    amount: 0,
    deliveryDate: "",
    status: "Pending",
  });
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSuppliers(suppliers);
  }, [suppliers]);

  const handleFilter = () => {
    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleAddSupplier = () => {
    if (supplierForm.amount > 0) {
      dispatch(addSupplier(supplierForm));
      resetSupplierForm();
      setIsModalOpen(false);
    } else {
      alert("Amount must be positive");
    }
  };

  const handleUpdateSupplier = () => {
    if (editSupplierId) {
      if (supplierForm.amount > 0) {
        dispatch(
          updateSupplier({ id: editSupplierId, supplierData: supplierForm })
        );
        resetSupplierForm();
        setIsModalOpen(false);
      } else {
        alert("Amount must be positive");
      }
    }
  };

  const handleEditSupplier = (supplier) => {
    setSupplierForm({
      name: supplier.name,
      company: supplier.company,
      address: supplier.address,
      amount: supplier.amount,
      deliveryDate: supplier.deliveryDate,
      status: supplier.status,
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
      company: "",
      address: "",
      amount: 0,
      deliveryDate: "",
      status: "Pending",
    });
    setEditSupplierId(null);
  };

  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.suppliersPage}>
      {loading && <p>Loading suppliers...</p>}
      {error && <p className={styles.error}>{error.message || error}</p>}

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="User Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className={styles.filterInput}
        />
        <button className={styles.filterButton} onClick={handleFilter}>
          Filter
        </button>
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
                type="text"
                placeholder="Company"
                value={supplierForm.company}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, company: e.target.value })
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
                type="number"
                placeholder="Amount"
                value={supplierForm.amount}
                onChange={(e) =>
                  setSupplierForm({
                    ...supplierForm,
                    amount: Number(e.target.value),
                  })
                }
              />
              <input
                type="datetime-local"
                value={
                  supplierForm.deliveryDate
                    ? new Date(supplierForm.deliveryDate)
                        .toISOString()
                        .slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setSupplierForm({
                    ...supplierForm,
                    deliveryDate: e.target.value,
                  })
                }
              />
              <select
                value={supplierForm.status}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
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
        suppliers={currentSuppliers}
        handleEditSupplier={handleEditSupplier}
        handleDeleteSupplier={handleDeleteSupplier}
      />
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filteredSuppliers.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={
                currentPage === index + 1
                  ? styles.activePageButton
                  : styles.pageButton
              }
            >
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SuppliersPage;
