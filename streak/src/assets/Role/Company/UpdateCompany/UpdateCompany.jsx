import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal, Box, TextField, Container } from '@mui/material';
import styles from "./updatecompany.module.css";

export default function UpdateCompany({ company, refreshCompanyList }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [emptyError, setEmptyError] = useState(false);

  const [open, setOpen] = useState(false);

  // Load company data when component receives a new company prop
  useEffect(() => {
    if (company) {
      setName(company.name || '');
    }
  }, [company]);

  const updateCompany = () => {
    setError(null);
    setEmptyError(false);

    const updatedData = {
      name,
      userId: company.userId,
    };

    // Add withCredentials to handle CORS issues
    axios
      .patch(`http://localhost:8080/streak/api/companies/update/${company.id}`, updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(() => {
        console.log('Sikeres frissítés');
        setOpen(false); // close modal
        refreshCompanyList(); // Refresh the Company list
      })
      .catch((error) => {
        console.log('Nem sikerült frissíteni', error);
        setError("Hibás adatok!");
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
            <h1>Company szerkesztése</h1>
            <TextField
              label="Cég neve"
              value={name}
              type='text'
              onChange={(e) => setName(e.target.value)}
              error={emptyError && !name}
              helperText={emptyError && !name ? "Kötelező mező" : ""}
              required
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={updateCompany}>
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

UpdateCompany.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  }).isRequired,
  refreshCompanyList: PropTypes.func.isRequired
};