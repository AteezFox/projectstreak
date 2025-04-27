import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import UserNav from "../../../User/UserComponents/UserNavbar/UserNav";
import styles from "./summary.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Summary() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [successDialog, setSuccessDialog] = useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Load cart items
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);

        // Calculate total price
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalPrice(total);

        // Get user address
        getUserAddress();
    }, []);

    const getUserAddress = async () => {
        try {
            setLoading(true);
            // Assuming the user ID is stored in localStorage or similar
            const userId = localStorage.getItem('userId') || 1; // Fallback to ID 1 if not found

            const response = await axios.get(`http://localhost:8080/streak/api/users/get/${userId}`);
            if (response.data) {
                // Construct address from user data
                const user = response.data;
                const address = `${user.address || ''}`;
                setUserAddress(address);
            }
        } catch (err) {
            console.error('Error fetching user address:', err);
            setError('Failed to load user address');
            setUserAddress('Cím betöltése sikertelen');
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('userId') || 1;

            // Prepare order data - ensuring productId is correctly extracted from each cart item
            const orderData = {
                userId: userId,
                productsIds: cartItems.map(item => ({
                    productId: item.id, // Make sure this matches how product IDs are stored in cart items
                    price: item.price
                })),
                totalPrice: totalPrice,
                status: 'AVAILABLE',
            };

            console.log('Sending order data:', orderData); // Log to verify data structure

            // Make API call to create order
            const response = await axios.post('http://localhost:8080/streak/api/orders/add', orderData,
              {

              }
              );

            if (response.status === 200 || response.status === 201) {
                // Show success dialog
                setSuccessDialog(true);
            } else {
                setError('Order creation failed');
            }
        } catch (err) {
            console.error('Error creating order:', err.response?.data || err.message);
            setError('Failed to create order');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = () => {
        createOrder();
    };

    const handleCloseDialog = () => {
        setSuccessDialog(false);
        // Clear the cart
        localStorage.removeItem('cartItems');
        // Navigate back to home
        navigate("/USER/1/home");
    };

    if (loading && !cartItems.length) {
        return (
          <>
              <UserNav />
              <Container className={styles.container}>
                  <Box className={styles.loadingContainer}>
                      <CircularProgress />
                      <Typography>Loading...</Typography>
                  </Box>
              </Container>
          </>
        );
    }

    return (
      <>
          <UserNav />
          <Container className={styles.container}>
              <Box className={styles.body}>
                  <Typography variant="h2" className={styles.title}>
                      Rendelés összegzése
                  </Typography>

                  {error && (
                    <Typography color="error" className={styles.errorMessage}>
                        {error}
                    </Typography>
                  )}

                  {cartItems.length === 0 ? (
                    <Typography className={styles.emptyCart}>
                        A kosár üres. Kérjük, adjon termékeket a kosárhoz a rendelés leadásához.
                    </Typography>
                  ) : (
                    <>
                        <List className={styles.orderList}>
                            {cartItems.map((item) => (
                              <React.Fragment key={item.id}>
                                  <ListItem>
                                      <ListItemText
                                        primary={item.name}
                                        secondary={`${item.quantity} db - ${item.price} HUF/db`}
                                      />
                                      <Typography variant="body1">
                                          {item.price * item.quantity} HUF
                                      </Typography>
                                  </ListItem>
                                  <Divider />
                              </React.Fragment>
                            ))}
                        </List>

                        <Typography variant="h6" className={styles.totalPrice}>
                            Teljes összeg: {totalPrice} HUF
                        </Typography>

                        <Typography variant="body1" className={styles.deliveryInfo}>
                            Szállítási cím: {userAddress}
                        </Typography>

                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={handlePayment}
                          className={styles.paymentButton}
                          disabled={cartItems.length === 0 || loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Fizetés"}
                        </Button>
                    </>
                  )}
              </Box>
          </Container>

          <Dialog
            open={successDialog}
            onClose={handleCloseDialog}
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
                  <Button onClick={handleCloseDialog} autoFocus>
                      OK
                  </Button>
              </DialogActions>
          </Dialog>
      </>
    );
}