import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { checkUserLoggedIn } from "../../utils";
import { Logout } from "@mui/icons-material";

const drawerWidth = 240;

const Header = ({ appName, ...props }) => {
  const loggedIn = checkUserLoggedIn();
  const navigate = useNavigate();
  const navItems = !loggedIn
    ? [
        // { name: "Login", route: "/auth/login" },
        // { name: "Register", route: "/auth/register" },
      ]
    : [
        { name: "Home", route: "/skill/list" },
        { name: "Choose", route: "/skill/choose" },
        { name: "Logout", route: "/auth/login" },
      ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} style={{ fontWeight: "bold" }}>
        {appName}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item?.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={
                  <NavLink
                    className={(navData) =>
                      navData.isActive
                        ? "activeLinkDrawer"
                        : "inActiveLinkDrawer"
                    }
                    to={item?.route}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    {item?.name}
                  </NavLink>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
            style={{ fontWeight: "bold" }}
          >
            {appName}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => {
              if (item?.name === "Logout") {
                return (
                  <Button
                    key={item?.name}
                    sx={{ color: "#fff" }}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/auth/login");
                    }}
                  >
                    <Logout />
                  </Button>
                );
              } else {
                return (
                  <Button key={item?.name} sx={{ color: "#fff" }}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? "activeLink" : "inActiveLink"
                      }
                      to={item?.route}
                      style={{ textDecoration: "none" }}
                    >
                      {item?.name}
                    </NavLink>
                  </Button>
                );
              }
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  appName: PropTypes.string,
};

export default Header;
