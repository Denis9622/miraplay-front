import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../redux/customers/customersSlice";
import styles from "./customersPage.module.css";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.customers);
  const [filter, setFilter] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [editCustomer, setEditCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Фильтрация клиентов
  const filteredCustomers = items.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.customersPage}>
      <h1>Customers</h1>

      {/* Фильтр */}
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Форма добавления клиента */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, email: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, phone: e.target.value })
          }
        />
        <button onClick={() => dispatch(addCustomer(newCustomer))}>
          Add Customer
        </button>
      </div>

      {/* Таблица клиентов */}
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.email} - {customer.address} -{" "}
            {customer.phone}
            <button onClick={() => setEditCustomer(customer)}>Edit</button>
            <button onClick={() => dispatch(deleteCustomer(customer._id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Форма редактирования клиента */}
      {editCustomer && (
        <div className={styles.form}>
          <input
            type="text"
            value={editCustomer.name}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, name: e.target.value })
            }
          />
          <input
            type="email"
            value={editCustomer.email}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, email: e.target.value })
            }
          />
          <input
            type="text"
            value={editCustomer.address}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, address: e.target.value })
            }
          />
          <input
            type="text"
            value={editCustomer.phone}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, phone: e.target.value })
            }
          />
          <button
            onClick={() =>
              dispatch(
                updateCustomer({ id: editCustomer._id, data: editCustomer })
              )
            }
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
