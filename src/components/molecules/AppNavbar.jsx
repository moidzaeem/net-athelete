import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Appfont, Appheading } from "../../utils/theme";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppDiv from "../atoms/AppDiv";
import { Drawer } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import { AppAvatar } from "../atoms/AppAvatar";
import AppSearchBar from "./AppSearchBar";
import { useLocation } from "react-router-dom";
import { gamma } from "../../utils/theme/colors";
import AppMenu from "./AppMenu";

// const pages = ["home",  "resources", "event","network", "market"];
const pages = ["home",  "resources", "event","network", 'market'];

// eslint-disable-next-line react/prop-types
function AppNavbar() {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  return (
    <AppBar
      sx={{ background: "white", borderBottom: "1px solid #E2E2EA" }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters style={{ justifyContent: "space-evenly" }}>
          <AppDiv sx={{ display: { xs: "flex", lg: "none" }, mr: 1 }}>
            <img onClick={handleOpenNavMenu} src="/menu-left-alt.svg" alt="" />
          </AppDiv>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <AppAvatar
        src="/logo.svg"
        alt=""
        sx={{ display: { xs: "flex", lg: "flex" }, mr: 1 }}
      />
      <Appheading
        sx={{ color: "#44444F", display: { xs: "none", sm: "flex" } }}
      >
        Net Athlete
      </Appheading>
    </Link>
          {/* small screen */}
          <Drawer
            anchor="left"
            open={anchorElNav}
            onClose={handleCloseNavMenu}
            variant="temporary"
          >
            <Box sx={{ width: 250 }}>
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOpenNavMenu();
                  }}
                >
                  <MailIcon
                    sx={{ color: currentPage === page ? gamma : "black" }}
                  />
                  <Link to={`/${page}`} key={index}>
                    <Appfont
                      sx={{
                        my: 1,
                        color: currentPage === page ? gamma : "black",
                        display: "block",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 500,
                        ml: 2,
                      }}
                    >
                      {page}
                    </Appfont>
                  </Link>
                </MenuItem>
              ))}
            </Box>
          </Drawer>
          {/* large screen */}
          <Box
            sx={{
              flexGrow: 4,
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Link to={`/${page}`} key={index}>
                <Appfont
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: currentPage === page ? gamma : "black",
                    display: "block",
                    cursor: "pointer",
                    ml: 6,
                    fontSize: 14,
                    fontWeight: 500,
                    textTransform: "capitalize",
                    textDecoration: currentPage === page ? "underline" : "none",
                    textUnderlineOffset: 20,
                    textDecorationThickness: 3,
                  }}
                >
                  {page}
                </Appfont>
              </Link>
            ))}
          </Box>
          {/* search */}
          {/* <AppSearchBar /> */}
          <IconButton
            sx={{ ml: 1, mr: 1 }}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            {/* <Badge badgeContent={17} color="error">
              <NotificationsIcon style={{ color: "#92929D" }} />
            </Badge> */}
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <AppMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppNavbar;
