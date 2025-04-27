import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal, Box, TextField, Container, Typography } from '@mui/material';
import styles from "./updateceo.module.css";

export default function UpdateCeo({ ceo, refreshCeoList }) {
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

  // Load ceo data when component receives a new ceo prop
  useEffect(() => {
    if (ceo) {
      setFirstName(ceo.firstName || '');
      setLastName(ceo.lastName || '');
      setEmail(ceo.email || '');
      setPassword(''); // Don't populate password for security reasons
      setPhone(ceo.phone || '');
      setAddress(ceo.address || '');
    }
  }, [ceo]);

  const updateCeo = () => {
    setEmailError(false);
    setTelError(false);
    setError(null);
    setEmptyError(false);

    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      userType: 'CEO',
    };

    // Only include password if it was changed
    if (password) {
      updatedData.password = password;
    }

    // Add withCredentials to handle CORS issues
    axios
      .patch(`http://localhost:8080/streak/api/users/update/${ceo.id}`, updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(() => {
        console.log('Sikeres frissítés');
        setOpen(false); // close modal
        refreshCeoList(); // Refresh the Ceo list
      })
      .catch((error) => {
        console.log('Nem sikerült frissíteni', error);
        setError("Hibás adatok!");
        setEmailError(true);
        setTelError(true);
        setEmptyError(true);
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" color="primary">
        Szerkesztés
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <h1>Ceo szerkesztése</h1>
            <Typography component={"div"} className={styles.name}>
              <TextField
                label="Vezetéknév"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={emptyError && !lastName}
                helperText={emptyError && !lastName ? "Kötelező mező" : ""}
                required
                className={styles.input}
              />
              <TextField
                fullWidth
                label="Keresztnév"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className={styles.input}
                error={emptyError && !firstName}
                helperText={emptyError && !firstName ? "Kötelező mező" : ""}
              />
            </Typography>
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
              helperText="Hagyd üresen, ha nem akarod megváltoztatni"
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
              error={emptyError && !address}
              helperText={emptyError && !address ? "Kötelező mező" : ""}
              required
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={updateCeo}>
                Mentés
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Mégse
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}

UpdateCeo.propTypes = {
  ceo: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string
  }).isRequired,
  refreshCeoList: PropTypes.func.isRequired
};