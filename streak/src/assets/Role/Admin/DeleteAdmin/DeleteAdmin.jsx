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
import styles from "./deleteadmin.module.css";

export default function DeleteAdmin({ admin, refreshAdminList }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const handleDelete = () => {
    if (admin && admin.id) {
      axios
        .delete(`http://localhost:8080/streak/api/users/delete/${admin.id}`)
        .then(() => {
          console.log("Admin törlése sikeres");
          toggleDialog(); // Close dialog after successful deletion
          if (refreshAdminList) {
            refreshAdminList(); // Refresh the admin list
          }
        })
        .catch((error) => {
          console.error("Hiba az admin törlése során:", error);
        });
    } else {
      console.error("Nincs kiválasztott admin az ID-val");
    }
  };

  return(
    <>
      <Button onClick={toggleDialog} className={styles.deleteButton}>Törlés</Button>
      <Dialog open={isDialogOpen} onClose={toggleDialog} classes={{ paper: styles.dialog }}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <DialogTitle variant="h3">Szeretnéd Törölni ezt a felhasználót?</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Biztos vagy benne, hogy törölni szeretnéd ezt a felhasználót?</Typography>
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

DeleteAdmin.propTypes = {
  admin: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  refreshAdminList: PropTypes.func
};