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
import styles from "./deleteuser.module.css";

export default function DeleteUser({ user, refreshUserList }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const handleDelete = () => {
    if (user && user.id) {
      axios
        .delete(`http://localhost:8080/streak/api/users/delete/${user.id}`)
        .then(() => {
          console.log("User törlése sikeres");
          toggleDialog(); // Close dialog after successful deletion
          if (refreshUserList) {
            refreshUserList(); // Refresh the User list
          }
        })
        .catch((error) => {
          console.error("Hiba az User törlése során:", error);
        });
    } else {
      console.error("Nincs kiválasztott User az ID-val");
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

DeleteUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  refreshUserList: PropTypes.func
};