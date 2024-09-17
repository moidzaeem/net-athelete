import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppAvatar } from "../atoms/AppAvatar";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import userPng from "../../assets/images/user.png";
import useCrypto from "../../utils/hooks/encrypt";

export default function AppMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { decryptedData } = useCrypto();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/"); 
    window.location.reload();
  };

  const handleProfile = () => {
    navigate("/profile-registration"); 
  };
  return (
    <div>
      <AppAvatar
        onClick={handleClick}
        alt="Remy Sharp"
        src={
          decryptedData?.user.image || userPng
        }
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
         <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
