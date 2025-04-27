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
import styles from "./deletecompany.module.css";

export default function DeleteCompany({ company, refreshCompanyList }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const handleDelete = () => {
    if (company && company.id) {
      axios
        .delete(`http://localhost:8080/streak/api/companies/delete/${company.id}`)
        .then(() => {
          console.log("Company törlése sikeres");
          toggleDialog(); // Close dialog after successful deletion
          if (refreshCompanyList) {
            refreshCompanyList(); // Refresh the Company list
          }
        })
        .catch((error) => {
          console.error("Hiba az Company törlése során:", error);
        });
    } else {
      console.error("Nincs kiválasztott Company az ID-val");
    }
  };

  return(
    <>
      <Button onClick={toggleDialog} className={styles.deleteButton}>Törlés</Button>
      <Dialog open={isDialogOpen} onClose={toggleDialog} classes={{ paper: styles.dialog }}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <DialogTitle variant="h3">Szeretnéd Törölni ezt a céget?</DialogTitle>
            <DialogContent>
              <Typography variant="h6">Biztos vagy benne, hogy törölni szeretnéd ezt a céget?</Typography>
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

DeleteCompany.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  refreshCompanyList: PropTypes.func
};