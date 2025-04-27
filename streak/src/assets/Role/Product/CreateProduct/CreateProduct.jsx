import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import styles from './createproduct.module.css';
import { useAppContext } from '../../../Context/AppContext.jsx';

export default function CreateProduct({ refreshProductList }) {
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const { user } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    category: '',
    price: ''
  });

  const categories = ['PIZZA', 'BURGER', 'HOTDOG', 'JUICE', 'SHAKE', 'SODA', 'MENU']; // Add all your categories

  useEffect(() => {
    // Fetch the company ID of the logged-in CEO
    if (user && user.id) {
      axios.get(`http://localhost:8080/streak/api/users/ceos/${user.id}`)
        .then(response => {
          setCompanyId(response.data.id);
        })
        .catch(error => {
          console.error('Error fetching company data:', error);
        });
    }
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset form data when closing
    setFormData({
      name: '',
      image: '',
      description: '',
      category: '',
      price: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      companyId: companyId,
      name: formData.name,
      image: formData.image,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price)
    };

    axios.post('http://localhost:8080/streak/api/products/add', productData)
      .then(response => {
        console.log('Product created successfully:', response.data);
        handleClose();
        if (refreshProductList) {
          refreshProductList();
        }
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className={styles.createButton}
      >
        Új termék létrehozása
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.modalContainer}>
          <Box className={styles.modalContent}>
            <Typography variant="h5" className={styles.modalTitle}>
              Új termék létrehozása
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Termék neve"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Kép URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Leírás"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                required
              />

              <FormControl fullWidth margin="normal" required>
                <InputLabel>Kategória</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Kategória"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Ár"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  inputProps: { min: 0, step: "0.01" }
                }}
                required
              />

              <div className={styles.formActions}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
                >
                  Mégse
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Létrehozás
                </Button>
              </div>
            </form>
          </Box>
        </Container>
      </Modal>
    </>
  );
}