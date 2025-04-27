import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import styles from './createorder.module.css';

export default function CreateOrder() {
  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!recipientName.trim() || !address.trim()) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/streak/api/orders/add', {
        recipientName,
        address,
      });

      setSuccessMessage('Rendelés sikeresen létrehozva!');
      setRecipientName('');
      setAddress('');
    } catch (err) {
      setError('Hiba történt a rendelés létrehozása során.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={styles.container}>
      <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        <Typography variant="h5" className={styles.title}>
          Új rendelés létrehozása
        </Typography>

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
        {successMessage && <Typography className={styles.success}>{successMessage}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Küldés...' : 'Rendelés létrehozása'}
        </Button>
      </Box>
    </Container>
  );
}
