import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Container } from "@mui/material";

function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Sync Todo" },
    { path: "/a", label: "Async Todo" },
  ];

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #f5f5f5ff, #c8cec8ff)",
          mb: 3,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: location.pathname === item.path ? "#328312ff" : "rgba(201, 183, 183, 0.7)",
                borderBottom: location.pathname === item.path ? "2px solid #fff" : "none",
                "&:hover": {
                  color: "#0fd150ff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
