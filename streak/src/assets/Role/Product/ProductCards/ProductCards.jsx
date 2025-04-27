import React, { useEffect, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CardActions, Modal, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './productcards.module.css';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';

export default function ProductCards() {
    const [products, setProducts] = useState([]);
    const { filteredProducts } = useContext(AppContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!filteredProducts) {
            fetchProducts();
        } else {
            setProducts(filteredProducts);
        }
    }, [filteredProducts]);

    const fetchProducts = () => {
        axios
          .get('http://localhost:8080/streak/api/products/get/5/1')
          .then((response) => {
              setProducts(response.data);
          })
          .catch((error) => {
              console.error('Hiba történt a termékek betöltésekor:', error);
          });
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const addToCart = (product, e) => {
        e.stopPropagation();

        // Get current cart from localStorage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if product is already in cart
        const existingProduct = cartItems.find(item => item.id === product.id);

        if (existingProduct) {
            // Increment quantity if product exists
            existingProduct.quantity += 1;
        } else {
            // Add product with quantity 1
            cartItems.push({...product, quantity: 1});
        }

        // Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Trigger a custom event to notify other components
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
      <div className={styles.cardContainer}>
          {products.map((product) => (
            <Card key={product.id} className={styles.card} onClick={() => handleCardClick(product)}>
                <div className={styles.cardImageContainer}>
                    <img
                      src={product.image || './public/images/jarvis.jpg'}
                      alt={product.name}
                      className={styles.cardImage}
                    />
                    <IconButton
                      className={styles.shopMobile}
                      onClick={(e) => addToCart(product, e)}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </div>
                <CardContent className={styles.cardContent}>
                    <Typography variant="h6" className={styles.cardTitle}>
                        {product.name}
                    </Typography>
                    <Typography className={styles.cardDescription}>
                        {product.description}
                    </Typography>
                    <Typography className={styles.cardCategory}>
                        Kategória: {product.category}
                    </Typography>
                    <Typography className={styles.cardPrice}>
                        HUF {product.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                      aria-label="add to cart"
                      className={styles.addButton}
                      onClick={(e) => addToCart(product, e)}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
          ))}

          {selectedProduct && (
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box className={styles.modalBox}>
                    <img
                      src={selectedProduct.image || './public/images/jarvis.jpg'}
                      alt={selectedProduct.name}
                      className={styles.modalImage}
                    />
                    <Typography variant="h4" className={styles.modalTitle}>
                        {selectedProduct.name}
                    </Typography>
                    <Typography className={styles.modalDescription}>
                        {selectedProduct.longDescription || selectedProduct.description}
                    </Typography>
                    <Typography className={styles.modalPrice}>
                        HUF {selectedProduct.price}
                    </Typography>
                    <IconButton
                      aria-label="add to cart"
                      className={styles.modalAddButton}
                      onClick={(e) => addToCart(selectedProduct, e)}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </Box>
            </Modal>
          )}
      </div>
    );
}