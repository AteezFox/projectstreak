import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, TextField, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './updateorder.module.css';

export default function UpdateOrder({ order, refreshOrders }) {
  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (order) {
      setRecipientName(order.recipientName || '');
      setAddress(order.address || '');
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!recipientName.trim() || !address.trim()) {
      setError('Minden mezőt ki kell tölteni!');
      setLoading(false);
      return;
    }

    try {
      await axios.patch(`http://localhost:8080/streak/api/orders/update/${order.id}`, {
        recipientName,
        address,
      });

      refreshOrders();
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError('Hiba a rendelés frissítésekor!');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Rendelés szerkesztése
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box component="form" onSubmit={handleSubmit} className={styles.form}>
            <Typography variant="h5">Rendelés frissítése</Typography>

            <TextField
              label="Címzett neve"
              fullWidth
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Cím"
              fullWidth
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              margin="normal"
            />

            {error && <Typography className={styles.error}>{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={styles.button}
            >
              {loading ? 'Mentés...' : 'Frissítés'}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              className={styles.button}
            >
              Mégse
            </Button>
          </Box>
        </Container>
      </Modal>
    </>
  );
}

UpdateOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    recipientName: PropTypes.string,
    address: PropTypes.string,
  }),
  refreshOrders: PropTypes.func.isRequired,
};
