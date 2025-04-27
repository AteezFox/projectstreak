import PropTypes from 'prop-types';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import styles from "./deleteproduct.module.css";

export default function DeleteProduct({ product, refreshProductList }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const handleDelete = () => {
    if (product && product.id) {
      axios
        .delete(`http://localhost:8080/streak/api/products/delete/${product.id}`)
        .then(() => {
          console.log("Product törlése sikeres");
          toggleDialog(); // Close dialog after successful deletion
          if (refreshProductList) {
            refreshProductList(); // Refresh the Product list
          }
        })
        .catch((error) => {
          console.error("Hiba az Product törlése során:", error);
        });
    } else {
      console.error("Nincs kiválasztott Product az ID-val");
    }
  };

  return(
    <>
      <Button onClick={toggleDialog} className={styles.deleteButton}>Törlés</Button>
      <Dialog open={isDialogOpen} onClose={toggleDialog} classes={{ paper: styles.dialog }}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <DialogTitle variant="h3">Szeretnéd Törölni ezt a terméket?</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Biztos vagy benne, hogy törölni szeretnéd ezt a terméket?</Typography>
              <Typography variant="body1">Ez a művelet visszafordíthatatlan!</Typography>
              <Typography variant="body1">Minden adat törlődni fog és nem hozható vissza</Typography>
            </DialogContent>
            <DialogActions className={styles.buttons}>
              <Button onClick={toggleDialog} className={styles.buttonNo}>Nem</Button>
              <Button onClick={handleDelete} className={styles.buttonOk}>Igen</Button>
            </DialogActions>
          </Box>
        </Container>
      </Dialog>
    </>
  );
}

DeleteProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  refreshProductList: PropTypes.func
};