import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography } from '@mui/material';
import styles from "./product.module.css";
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../DeleteProduct/DeleteProduct.jsx';
import UpdateProduct from '../UpdateProduct/UpdateProduct.jsx';

export default function getProduct() {
  const [filterproducts, setFilterproducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected Product
  const edit = useNavigate();

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    axios
      .get('http://localhost:8080/streak/api/products/get')
      .then((response) => {
        setFilterproducts(response.data);
        setOpen(false); // modal bezárása
        console.log("Sikeres lekérés");
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  const handleOpen = (Product) => {
    setSelectedProduct(Product); // Set the selected Product
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {filterproducts.map(product => (
        <div className={styles.productRow} key={product.id}>
          <div className={styles.productInfo}>
            <p className={styles.productText}>ID: #{product.id}</p>
            <p className={styles.productText}>Név: {product.name}</p>
          </div>
          <button className={styles.moreInfoButton} onClick={() => handleOpen(product)}>
            További információk
          </button>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <Typography variant="h5" className={styles.modalTitle}>
              Product részletei
            </Typography>
            {selectedProduct && (
              <Typography component={"div"} className={styles.ProductDetails}>
                <Typography component={"p"}>ID: #{selectedProduct.id}</Typography>
                <Typography component={"p"}>Név: {selectedProduct.name}</Typography>
                <Typography component={"p"}>Leírás {selectedProduct.description}</Typography>
                <Typography component={"p"}>Kategória: {selectedProduct.category}</Typography>
                <Typography component={"p"}>Ár: {selectedProduct.price}</Typography>
                <Typography component={"p"}>Cég ID: #{selectedProduct.companyId}</Typography>
              </Typography>
            )}
            <div className={styles.modalButtons}>
              <UpdateProduct />
              <DeleteProduct product={selectedProduct} refreshProductList={getProductData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}