import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../redux/orders/ordersOperations";
import { fetchCustomers } from "../redux/customers/customersOperations";
import OrdersTable from "../components/orders/OrdersTable";
import styles from "./ordersPage.module.css";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { items: orders } = useSelector((state) => state.orders);
  const {
    items: customers,
    loading: customersLoading,
    error: customersError,
  } = useSelector((state) => state.customers);

  const [filterName, setFilterName] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderForm, setOrderForm] = useState({
    customerId: "",
    address: "",
    products: "",
    orderDate: "",
    price: 0,
    status: "Pending",
  });
  const [editOrderId, setEditOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders and customers on component mount
  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Обработчик кнопки фильтрации
  const handleFilterOrders = () => {
    setFilteredOrders(
      orders.filter((order) =>
        order.customer?.name
          ? order.customer.name.toLowerCase().includes(filterName.toLowerCase())
          : false
      )
    );
  };

  const handleAddOrder = () => {
    dispatch(
      addOrder({ ...orderForm, products: orderForm.products.split(",") })
    );
    resetOrderForm();
    setIsModalOpen(false);
  };

  const handleUpdateOrder = () => {
    if (editOrderId) {
      dispatch(updateOrder({ id: editOrderId, orderData: orderForm }));
      resetOrderForm();
      setIsModalOpen(false);
    }
  };

  const handleEditOrder = (order) => {
    setOrderForm({
      customerId: order.customerId,
      address: order.address,
      products: order.products.join(","),
      orderDate: order.orderDate,
      price: order.price,
      status: order.status,
    });
    setEditOrderId(order._id);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  const resetOrderForm = () => {
    setOrderForm({
      customerId: "",
      address: "",
      products: "",
      orderDate: "",
      price: 0,
      status: "Pending",
    });
    setEditOrderId(null);
  };

  return (
    <div className={styles.ordersPage}>
      {customersLoading && <p>Loading customers...</p>}
      {customersError && <p className={styles.error}>{customersError}</p>}

      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="User Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className={styles.filterInput}
        />
        <button
          className={styles.filterButton}
          onClick={handleFilterOrders} // Фильтруем по нажатию
        >
          Filter
        </button>
        <button
          className={styles.openModalButton}
          onClick={() => setIsModalOpen(true)}
        >
          {editOrderId ? "Edit Order" : "Add Order"}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => {
                resetOrderForm();
                setIsModalOpen(false);
              }}
            >
              ✖
            </button>
            <h2>{editOrderId ? "Edit Order" : "Add Order"}</h2>
            <div className={styles.form}>
              <select
                value={orderForm.customerId}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, customerId: e.target.value })
                }
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Address"
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Products (comma separated)"
                value={orderForm.products}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, products: e.target.value })
                }
              />

              <input
                type="datetime-local"
                value={
                  orderForm.orderDate
                    ? new Date(orderForm.orderDate).toISOString().slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setOrderForm({ ...orderForm, orderDate: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={orderForm.price}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, price: Number(e.target.value) })
                }
              />
              <select
                value={orderForm.status}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Delivered">Confirmed</option>
                <option value="Delivered">Cancelled</option>
              </select>
              <button
                onClick={editOrderId ? handleUpdateOrder : handleAddOrder}
                className={styles.addButton}
              >
                {editOrderId ? "Update Order" : "Add Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      <OrdersTable
        orders={filteredOrders}
        handleEditOrder={handleEditOrder}
        handleDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default OrdersPage;
