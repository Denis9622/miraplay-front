export const mockStatistics = {
  products: 120,
  suppliers: 15,
  customers: 500,
};

export const mockCustomers = [
  { name: "John Doe", email: "john@example.com", amount: "$250" },
  { name: "Jane Smith", email: "jane@example.com", amount: "$180" },
  { name: "Mike Johnson", email: "mike@example.com", amount: "$300" },
];

export const mockTransactions = [
  { name: "Product Sale", email: "customer1@example.com", amount: "+$500" },
  { name: "Product Refund", email: "customer2@example.com", amount: "-$100" },
  { name: "Product Sale", email: "customer3@example.com", amount: "+$300" },
];

export const mockOrders = [
  {
    id: 1,
    customer: "John Doe",
    address: "123 Main St, NY",
    products: "Painkillers, Bandages",
    orderDate: "2024-02-20",
    price: "$120",
    status: "Shipped",
  },
  {
    id: 2,
    customer: "Jane Smith",
    address: "456 Elm St, LA",
    products: "Antibiotics",
    orderDate: "2024-02-19",
    price: "$85",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    address: "789 Oak St, TX",
    products: "Vitamins, Supplements",
    orderDate: "2024-02-18",
    price: "$200",
    status: "Delivered",
  },
];

export const mockProducts = [
  {
    id: 1,
    name: "Painkillers",
    category: "Medicine",
    stock: 50,
    suppliers: ["MediPharm"],
    price: "$20",
  },
  {
    id: 2,
    name: "Bandages",
    category: "First Aid",
    stock: 120,
    suppliers: ["QuickHeal"],
    price: "$5",
  },
  {
    id: 3,
    name: "Vitamins",
    category: "Supplements",
    stock: 75,
    suppliers: ["HealthLife"],
    price: "$15",
  },
];

