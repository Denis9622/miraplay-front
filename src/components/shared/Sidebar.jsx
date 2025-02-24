import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
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
        <ListItem component="div">
          <ListItemButton component={NavLink} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component={NavLink} to="/orders">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component={NavLink} to="/products">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component={NavLink} to="/customers">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
        <ListItem component="div">
          <ListItemButton component={NavLink} to="/suppliers">
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Suppliers" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
};

export default Sidebar;
