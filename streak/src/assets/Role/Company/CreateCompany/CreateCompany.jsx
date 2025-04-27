import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Modal, Box, TextField, Container, Typography } from '@mui/material';
import { AppContext } from '../../../Context/AppContext';
import styles from "./createcompany.module.css";

export default function CreateCompany({ refreshCompanyList }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [emptyError, setEmptyError] = useState(false);
  const [hasCompany, setHasCompany] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AppContext);

  useEffect(() => {
    checkExistingCompany();
  }, [user]);

  const checkExistingCompany = () => {
    // Reset states when checking
    setError(null);
    setLoading(true);
    
    // Only proceed if user is logged in and is a CEO
    if (!user || !user.userId) {
      setLoading(false);
      return;
    }
    
    if (user.userType !== 'CEO') {
      setError("Csak CEO típusú felhasználók hozhatnak létre céget.");
      setLoading(false);
      return;
    }

    // Check if this CEO already has a company
    axios.get(`http://localhost:8080/streak/api/companies/get/ceo/${user.userId}`)
      .then((response) => {
        if (response.data && (Array.isArray(response.data) ? response.data.length > 0 : true)) {
          setHasCompany(true);
        } else {
          setHasCompany(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        // If it's a 404, it means no company exists yet
        if (error.response && error.response.status === 404) {
          setHasCompany(false);
        } else {
          console.error("Hiba a cég ellenőrzésekor:", error);
          setError("Nem sikerült ellenőrizni a meglévő cégeket.");
        }
        setLoading(false);
      });
  };

  const createCompany = () => {
    // Reset validation states
    setError(null);
    setEmptyError(false);

    // Validate user permissions again
    if (user.userType !== 'CEO') {
      setError("Csak CEO típusú felhasználók hozhatnak létre céget.");
      return;
    }

    // Check if CEO already has a company
    if (hasCompany) {
      setError("Már van egy cég hozzárendelve ehhez a CEO-hoz.");
      return;
    }

    // Validate form
    if (!name.trim()) {
      setEmptyError(true);
      return;
    }

    // Create company with the CEO's userId
    axios.post('http://localhost:8080/streak/api/companies/add', {
      name: name.trim(),
      userId: user.userId,
    })
      .then(() => {
        setName('');
        handleClose();
        refreshCompanyList();
        setHasCompany(true); // Update state to reflect the CEO now has a company
        console.log("Cég létrehozva");
      })
      .catch((error) => {
        console.error("Hiba a cég létrehozásakor:", error);
        setError("Hiba a cég létrehozásakor: " + (error.response?.data?.message || error.message));
      });
  };

  const handleOpen = () => {
    // Check for existing company again when opening modal
    checkExistingCompany();
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  return (
    <>
      {user && user.userType === 'CEO' && (
        <Button 
          onClick={handleOpen}
          variant="contained"
          disabled={hasCompany}
          className={styles.addButton}
        >
          {hasCompany ? "Már van létrehozott cége" : "Cég létrehozása"}
        </Button>
      )}
      
      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <Typography variant="h5" className={styles.modalTitle}>
              Új cég létrehozása
            </Typography>
            
            {loading ? (
              <Typography>Betöltés...</Typography>
            ) : hasCompany ? (
              <Typography className={styles.error}>
                Önhöz már tartozik egy cég. Egy CEO csak egy céget kezelhet.
              </Typography>
            ) : (
              <>
                <TextField
                  label="Cég neve"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={emptyError}
                  helperText={emptyError ? "Kötelező mező" : ""}
                  fullWidth
                  margin="normal"
                  required
                />
                {error && <p className={styles.error}>{error}</p>}
                <Button 
                  variant="contained" 
                  onClick={createCompany}
                  fullWidth
                  className={styles.submitButton}
                >
                  Cég létrehozása
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Modal>
    </>
  );
}