import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal, Box, TextField, Container } from '@mui/material';
import styles from "./updateproduct.module.css";

export default function UpdateProduct({ product, refreshProductList }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [emptyError, setEmptyError] = useState(false);

  const [open, setOpen] = useState(false);

  // Load product data when component receives a new product prop
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setImage(product.image || '');
      setPrice(product.price || '');
      setDescription(product.description || '');
      setCategory(product.category || '');
    }
  }, [product]);

  const updateProduct = () => {
    setError(null);
    setEmptyError(false);

    const updatedData = {
      name,
      image,
      price,
      description,
      category,
      companyid: product.companyid
    };

    // Only include password if it was changed
    if (password) {
      updatedData.password = password;
    }

    // Add withCredentials to handle CORS issues
    axios
      .patch(`http://localhost:8080/streak/api/products/update/${product.id}`, updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(() => {
        console.log('Sikeres frissítés');
        setOpen(false); // close modal
        refreshProductList(); // Refresh the Product list
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
            <h1>Product szerkesztése</h1>
            <TextField
              label="Név"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={emptyError && !name}
              helperText={emptyError && !name ? 'Kötelező mező' : ''}
              fullWidth
              required
              className={styles.input}
            />
            <TextField
              className={styles.input}
              label="Kép URL"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              error={emptyError && !image}
              helperText={emptyError && !image ? 'Kötelező mező' : ''}
              fullWidth
              required
            />
            <TextField
              label="Ár"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={emptyError && !price}
              helperText={emptyError && !price ? 'Kötelező mező' : ''}
              fullWidth
              required
              className={styles.input}
            />
            <TextField
              label="Leírás"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={emptyError && !description}
              helperText={emptyError && !description ? 'Kötelező mező' : ''}
              fullWidth
              required
              className={styles.input}
            />
            <TextField
              label="Kategória"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              error={emptyError && !category}
              helperText={emptyError && !category ? 'Kötelező mező' : ''}
              fullWidth
              required
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={updateProduct}>
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

UpdateProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    companyid: PropTypes.number.isRequired
  }).isRequired,
  refreshProductList: PropTypes.func.isRequired
};