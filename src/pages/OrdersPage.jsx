import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../redux/orders/ordersOperations";
import { fetchCustomers } from "../redux/customers/customersOperations";
import styles from "./ordersPage.module.css";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const {
    items: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);
  const customers = useSelector((state) => state.customers.items);
  const customersLoading = useSelector((state) => state.customers.loading);
  const customersError = useSelector((state) => state.customers.error);

  const [newOrder, setNewOrder] = useState({
    customerId: "",
    address: "",
    products: "",
    orderDate: "",
    price: 0,
    status: "Pending",
  });
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    console.log("Orders:", orders);
    console.log("Loading Orders:", loading);
    console.log("Orders Error:", error);
    console.log("Customers:", customers);
  }, [orders, loading, error, customers]);

  // Добавление заказа
  const handleAddOrder = () => {
    dispatch(addOrder({ ...newOrder, products: newOrder.products.split(",") }));
    setNewOrder({
      customerId: "",
      address: "",
      products: "",
      orderDate: "",
      price: 0,
      status: "Pending",
    });
  };

  // Обновление заказа
  const handleUpdateOrder = () => {
    if (editOrder) {
      dispatch(updateOrder({ id: editOrder._id, orderData: editOrder }));
      setEditOrder(null);
    }
  };

  // Удаление заказа
  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <div className={styles.ordersPage}>
      <h1>Orders</h1>

      {customersLoading && <p>Loading customers...</p>}
      {customersError && <p className={styles.error}>{customersError}</p>}

      {/* Форма добавления заказа */}
      <div className={styles.form}>
        <select
          value={newOrder.customerId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, customerId: e.target.value })
          }
        >
          <option value="">Select Customer</option>
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))
          ) : (
            <option disabled>Loading customers...</option>
          )}
        </select>

        <input
          type="text"
          placeholder="Address"
          value={newOrder.address}
          onChange={(e) =>
            setNewOrder({ ...newOrder, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Products (comma separated)"
          value={newOrder.products}
          onChange={(e) =>
            setNewOrder({ ...newOrder, products: e.target.value })
          }
        />
        <input
          type="datetime-local"
          placeholder="Order Date"
          value={newOrder.orderDate}
          onChange={(e) =>
            setNewOrder({ ...newOrder, orderDate: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newOrder.price}
          onChange={(e) =>
            setNewOrder({ ...newOrder, price: Number(e.target.value) })
          }
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button onClick={handleAddOrder}>Add Order</button>
      </div>
      {/* Форма редактирования заказа */}
      {editOrder && (
        <div className={styles.form}>
          <input
            type="text"
            value={editOrder.userInfo}
            onChange={(e) =>
              setEditOrder({ ...editOrder, userInfo: e.target.value })
            }
          />
          <input
            type="text"
            value={editOrder.address}
            onChange={(e) =>
              setEditOrder({ ...editOrder, address: e.target.value })
            }
          />
          <input
            type="text"
            value={editOrder.products}
            onChange={(e) =>
              setEditOrder({ ...editOrder, products: e.target.value })
            }
          />
          <input
            type="datetime-local"
            value={editOrder.orderDate}
            onChange={(e) =>
              setEditOrder({ ...editOrder, orderDate: e.target.value })
            }
          />
          <input
            type="number"
            value={editOrder.price}
            onChange={(e) =>
              setEditOrder({ ...editOrder, price: Number(e.target.value) })
            }
          />
          <select
            value={editOrder.status}
            onChange={(e) =>
              setEditOrder({ ...editOrder, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={handleUpdateOrder}>Update Order</button>
        </div>
      )}

      {/* Список заказов */}
      {loading && <p>Loading...</p>}
      {error && (
        <p className={styles.error}>
          {typeof error === "string"
            ? error
            : error?.message || "Произошла ошибка"}
        </p>
      )}
      <ul>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <li key={order._id}>
              {order.customer?.name || order.userInfo} - {order.address} -{" "}
              {order.products.join(", ")} -{" "}
              {new Date(order.orderDate).toLocaleString()} - ${order.price} -{" "}
              {order.status}
              <button onClick={() => setEditOrder(order)}>Edit</button>
              <button onClick={() => handleDeleteOrder(order._id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrdersPage;
