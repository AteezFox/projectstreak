import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Button, Modal, Box, TextField, Container } from '@mui/material';
import styles from "./createceo.module.css";

export default function CreateCeo({ refreshCeoList }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [error, setError] = useState(null);
  const [emptyError, setEmptyError] = useState(false);

  const [open, setOpen] = useState(false);

  const createCeo = () => {
    setEmailError(false);
    setTelError(false),
    setError(null);
    setEmptyError(false);

    axios
      .post('http://localhost:8080/streak/api/users/add', {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        userType: 'CEO',
      })
      .then((response) => {
        console.log('Sikeres hozzáadás');
        setOpen(false); // modal bezárása
        refreshCeoList(); // Refresh the Ceo list
      })
      .catch((error) => {
        console.log('Nem sikerült hozzáadni', error);
        setError("Hibás email vagy jelszó! (vagy a mező üres)")
        setEmailError(true);
        setTelError(true);
        setEmptyError(true);
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>CEO hozzáadása</Button>
      
      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
        <Box className={styles.body}>
          <div className={styles.name}>
            <TextField
              label="Vezetéknév"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={emptyError}
              helperText={emptyError ? "Kötelező mező" : ""}
              required
              className={styles.input}
            />
            <TextField
              fullWidth
              label="Keresztnév"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={emptyError}
              helperText={emptyError ? "Kötelező mező" : ""}
              className={styles.input}
            />
          </div>

          <TextField
            label="Email"
            value={email}
            type='email'
            error={emailError}
            helperText={emailError ? "Hibás email" : ""}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <TextField
            label="Jelszó"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={emptyError}
            helperText={emptyError ? "Kötelező mező" : ""}
            required
            className={styles.input}
          />
          <TextField
            label="Telefon"
            value={phone}
            type='tel'
            error={telError}
            helperText={telError ? "Hibás telefonszám" : ""}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={styles.input}
          />
          <TextField
            label="Állandó lakcím"
            value={address}
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            error={emptyError}
            helperText={emptyError ? "Kötelező mező" : ""}
            required
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button variant="contained" onClick={createCeo}>
            Hozzáadás
          </Button>
        </Box>
        </Container>
      </Modal>
    </>
  );
}
