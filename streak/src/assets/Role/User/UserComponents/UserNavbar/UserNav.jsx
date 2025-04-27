import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from 'react-router-dom';
import UserCart from '../UserCart/UserCart';
import styles from './usernav.module.css';
import { useAppContext } from '../../../../Context/AppContext';

export default function UserNav() {
  const { selectedAddress, updateAddress, userId, userType, logout } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  const [hidden, setHidden] = useState(false);
  const [addressAnchorEl, setAddressAnchorEl] = useState(null);
  const navigate = useNavigate();

  const addresses = ['Otthon', 'Munkahely', 'Cigánylak'];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const onScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHidden(scrollTop > lastScrollTop);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!userId || !userType) {
      navigate('/');
    }
  }, [userId, userType, navigate]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAddressMenuOpen = (event) =>
    setAddressAnchorEl(event.currentTarget);
  const handleAddressMenuClose = () => setAddressAnchorEl(null);

  const handleAddressSelect = (address) => {
    updateAddress(address);
    handleAddressMenuClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Orders', onClick: () => navigate(`/${userType}/${userId}/orders`) },
    { label: 'Profile', onClick: () => navigate(`/${userType}/${userId}/profile`) },
    { label: 'Logout', onClick: handleLogout },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        className={`${styles.appBar} ${hidden ? styles.hidden : ''}`}
      >
        <Toolbar className={styles.toolBar}>
          <IconButton
            edge="start"
            aria-label="logo"
            className={styles.menuButton}
            onClick={() => navigate(`/${userType}/${userId}/home`)}
          >
            <img
              src="/icons/logo_icon.png"
              alt="logo"
              className={styles.menuButton}
            />
          </IconButton>
          <img src="/icons/logo_felirat.png" className={styles.title} alt="" />
          <IconButton
            className={styles.home}
            color="inherit"
            onClick={() => navigate(`/${userType}/${userId}/home`)}
          >
            <HomeIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleAddressMenuOpen}
            className={styles.addressMenu}
          >
            {selectedAddress}{' '}
            {addressAnchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
          <Menu
            anchorEl={addressAnchorEl}
            open={Boolean(addressAnchorEl)}
            onClose={handleAddressMenuClose}
          >
            {addresses.map((address, index) => (
              <MenuItem
                key={index}
                onClick={() => handleAddressSelect(address)}
              >
                {address}
              </MenuItem>
            ))}
          </Menu>

          {isMobile ? (
            <Box className={styles.profile}>
              <UserCart></UserCart>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                className={styles.profile}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {navItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={item.onClick || handleMenuClose}
                    className={item.className}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box className={styles.navLinks}>
              <UserCart></UserCart>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                className={styles.profile}
              >
                <AccountCircleIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {navItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={item.onClick || handleMenuClose}
                    className={item.className}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
