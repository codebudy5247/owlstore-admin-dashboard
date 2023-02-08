import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useNavigate } from "react-router-dom";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GavelIcon from '@mui/icons-material/Gavel';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const NavItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/")}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Products" onClick={() => navigate("/")} />
      </ListItemButton>

      {/* <ListItemButton>
        <ListItemIcon onClick={() => navigate("/product")}>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Products" onClick={() => navigate("/product")} />
      </ListItemButton> */}

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/user")}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" onClick={() => navigate("/user")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/order")}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" onClick={() => navigate("/order")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("//billing")}>
        <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Billings" onClick={() => navigate("/billing")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/seller-withdraw")}>
        <KeyboardDoubleArrowRightIcon />
        </ListItemIcon>
        <ListItemText
          primary="Withdrawal Requests"
          onClick={() => navigate("/seller-withdraw")}
        />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/news")}>
        <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary="News" onClick={() => navigate("/news")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/rules")}>
        <GavelIcon />
        </ListItemIcon>
        <ListItemText primary="Rules" onClick={() => navigate("/rules")} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon onClick={() => navigate("/tickets")}>
        <ConfirmationNumberIcon />
        </ListItemIcon>
        <ListItemText primary="Tickets" onClick={() => navigate("/tickets")} />
      </ListItemButton>
    </React.Fragment>
  );
};

export default NavItems;
