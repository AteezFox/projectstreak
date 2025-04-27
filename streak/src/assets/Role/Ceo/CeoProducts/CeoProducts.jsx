import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal, Box, Container, Typography } from '@mui/material';
import styles from "./ceoproducts.module.css";
import { useNavigate } from 'react-router-dom';
import DeleteProduct from '../../Product/DeleteProduct/DeleteProduct.jsx';
import UpdateProduct from '../../Product/UpdateProduct/UpdateProduct.jsx';
import CreateProduct from '../../Product/CreateProduct/CreateProduct.jsx';
import { useAppContext } from '../../../Context/AppContext.jsx';

export default function CeoProducts() {
  const [filterproducts, setFilterproducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAppContext(); // Get the logged-in user

  useEffect(() => {
    if (user && user.id) {
      getProductData();
    }
  }, []);


  const getProductData = () => {

    axios.get(`http://localhost:8080/streak/api/users/get/ceos/${user.id}`)
      .then((response) => {
        const userId = response.data.id;
        axios.get(`http://localhost:8080/streak/api/companies/get/ceo/${userId}`)
          .then((response) => {
            const companyId = response.data.id;
            axios.get(`http://localhost:8080/streak/api/products/get/company/${companyId}`)
              .then((response) => {
                setFilterproducts(response.data);
                setOpen(false); // Close the modal
                console.log("Sikeres lekérés");
              })
              .catch((error) => {
                console.log('Valami gikszer', error);
              });
          })
          .catch((error) => {
            console.log('Valami gikszer', error);
          })
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CreateProduct refreshProductList={getProductData} />
      {filterproducts.length > 0 ? (
        filterproducts.map(product => (
          <div className={styles.productRow} key={product.id}>
            <div className={styles.productInfo}>
              <p className={styles.productText}>ID: #{product.id}</p>
              <p className={styles.productText}>Név: {product.name}</p>
            </div>
            <button className={styles.moreInfoButton} onClick={() => handleOpen(product)}>
              További információk
            </button>
          </div>
        ))
      ) : (
        <p>Nincsenek termékek a cégnél</p>
      )}

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
                <Typography component={"p"}>Leírás: {selectedProduct.description}</Typography>
                <Typography component={"p"}>Kategória: {selectedProduct.category}</Typography>
                <Typography component={"p"}>Ár: {selectedProduct.price}</Typography>
                <Typography component={"p"}>Cég ID: #{selectedProduct.companyId}</Typography>
              </Typography>
            )}
            <div className={styles.modalButtons}>
              <UpdateProduct product={selectedProduct} refreshProductList={getProductData}/>
              <DeleteProduct product={selectedProduct} refreshProductList={getProductData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}