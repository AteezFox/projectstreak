import { IconButton, Badge, Drawer, Container, Typography, Button, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './usercart.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UserCart(){
    const [isSideOpen, setIsSideOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [successDialog, setSuccessDialog] = useState(false);

    const navigate = useNavigate();

    // Load cart items on component mount and when cart is updated
    useEffect(() => {
        loadCartItems();

        // Add event listener for cart updates
        window.addEventListener('cartUpdated', loadCartItems);

        return () => {
            window.removeEventListener('cartUpdated', loadCartItems);
        };
    }, []);

    const loadCartItems = () => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);

        // Calculate total count of items
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);

        // Calculate total price
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const toggleSide = () => {
        setIsSideOpen(!isSideOpen);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        loadCartItems();
    };

    const handleCheckout = () => {
        navigate("/summary");
        setIsSideOpen(false);
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialog(false);
        // Clear the cart
        localStorage.removeItem('cartItems');
        loadCartItems();
        navigate("/USER/1/home"); // Adjust the path as needed
    };

    return (
      <>
          <IconButton
            color="inherit"
            onClick={toggleSide}
            edge="end"
            className={styles.cart}
          >
              <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
              </Badge>
          </IconButton>
          <Drawer variant="temporary" anchor="bottom" open={isSideOpen} onClose={toggleSide} className={styles.drawer}>
              <Container className={styles.container}>
                  <Box className={styles.body}>
                      <Typography className={styles.title} component={"h1"}>Kosár</Typography>

                      {cartItems.length === 0 ? (
                        <Typography className={styles.emptyCart}>A kosár üres</Typography>
                      ) : (
                        <>
                            <List className={styles.cartList}>
                                {cartItems.map((item) => (
                                  <React.Fragment key={item.id}>
                                      <ListItem className={styles.cartItem}>
                                          <ListItemText
                                            primary={item.name}
                                            secondary={`${item.quantity} db - ${item.price * item.quantity} HUF`}
                                          />
                                          <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)}>
                                              <DeleteIcon />
                                          </IconButton>
                                      </ListItem>
                                      <Divider />
                                  </React.Fragment>
                                ))}
                            </List>
                            <Typography className={styles.totalPrice}>
                                Összesen: {totalPrice} HUF
                            </Typography>
                        </>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                        className={styles.checkoutButton}
                      >
                          Fizetés
                      </Button>
                  </Box>
              </Container>
          </Drawer>

          <Dialog
            open={successDialog}
            onClose={handleCloseSuccessDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                  {"Sikeres rendelés"}
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      A rendelését sikeresen felvettük. Köszönjük vásárlását!
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseSuccessDialog} autoFocus>
                      OK
                  </Button>
              </DialogActions>
          </Dialog>
      </>
    )
}