import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  useScrollTrigger,
  Slide,
  Badge,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  Home,
  Info,
  ContactMail,
  ExitToApp
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

// Hide AppBar on scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ isAuthenticated, user, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  // Navigation items
  const navItems = [
    { path: '/', label: 'Início', icon: <Home sx={{ mr: 1 }} /> },
    { path: '/about', label: 'Sobre', icon: <Info sx={{ mr: 1 }} /> },
  ];

  const authItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Dashboard sx={{ mr: 1 }}/> }
  ];

  const isActivePath = (path) => location.pathname === path;

  // Desktop menu
  const renderDesktopMenu = (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          startIcon={React.cloneElement(item.icon, { sx: { mr: 0 } })}
          sx={{
            color: 'white',
            backgroundColor: isActivePath(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
      
      {isAuthenticated ? (
        <>
          {authItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={React.cloneElement(item.icon, { sx: { mr: 0 } })}
              sx={{
                color: 'white',
                backgroundColor: isActivePath(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          
          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Badge color="secondary">
              <Avatar 
                sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                src={user?.avatar}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200,
              }
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 2 }} />
              Logout ({user?.username})
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'white',
            },
            ml: 1
          }}
        >
          Login
        </Button>
      )}
    </Box>
  );

  // Mobile menu
  const renderMobileMenu = (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={handleMobileMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
          }
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleMenuClose}
            selected={isActivePath(item.path)}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
        
        {isAuthenticated ? (
          <>
            <Divider />
            {authItems.map((item) => (
              <MenuItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
                selected={isActivePath(item.path)}
              >
                {item.icon}
                {item.label}
              </MenuItem>
            ))}
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 2 }} />
              Logout ({user?.username})
            </MenuItem>
          </>
        ) : (
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleMenuClose}
            selected={isActivePath('/login')}
          >
            <AccountCircle sx={{ mr: 2 }} />
            Login
          </MenuItem>
        )}
      </Menu>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={4}
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Brand/Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 'bold',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Qualifica SP
            </Typography>

            {/* Desktop Navigation */}
            {renderDesktopMenu}

            {/* Mobile Navigation */}
            {renderMobileMenu}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;