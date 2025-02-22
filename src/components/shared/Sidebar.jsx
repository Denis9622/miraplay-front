import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      <List>
        <ListItem button component={NavLink} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={NavLink} to="/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={NavLink} to="/products">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={NavLink} to="/customers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button component={NavLink} to="/suppliers">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
      </List>
    </nav>
  );
};

export default Sidebar;
