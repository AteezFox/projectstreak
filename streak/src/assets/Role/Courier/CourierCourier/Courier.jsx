import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography } from '@mui/material';
import styles from "./courier.module.css";
import { useNavigate } from 'react-router-dom';
import CreateCourier from '../CreateCourier/CreateCourier.jsx';
import DeleteCourier from '../DeleteCourier/DeleteCourier.jsx';
import UpdateCourier from '../UpdateCourier/UpdateCourier.jsx';

export default function getCourier() {
  const [filterUsers, setFilterUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null); // State to store selected courier
  const edit = useNavigate();

  useEffect(() => {
    getCourierData();
  }, []);

  const getCourierData = () => {
    axios
      .get('http://localhost:8080/streak/api/users/get/couriers')
      .then((response) => {
        setFilterUsers(response.data);
        setOpen(false); // modal bezárása
        console.log("Sikeres lekérés");
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  const handleOpen = (courier) => {
    setSelectedCourier(courier); // Set the selected courier
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CreateCourier refreshCourierList={getCourierData} />
      {filterUsers.map(user => (
        <div className={styles.userRow} key={user.id}>
          <div className={styles.userInfo}>
            <p className={styles.userText}>ID: #{user.id}</p>
            <p className={styles.userText}>Név: {user.firstName}, {user.lastName}</p>
          </div>
          <button className={styles.moreInfoButton} onClick={() => handleOpen(user)}>
            További információk
          </button>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <Typography variant="h5" className={styles.modalTitle}>
              Courier részletei
            </Typography>
            {selectedCourier && (
              <Typography component={"div"} className={styles.courierDetails}>
                <Typography component={"p"}>ID: #{selectedCourier.id}</Typography>
                <Typography component={"p"}>Név: {selectedCourier.firstName} {selectedCourier.lastName}</Typography>
                <Typography component={"p"}>Email: {selectedCourier.email}</Typography>
                <Typography component={"p"}>Állandó lakcím: {selectedCourier.address}</Typography>
                <Typography component={"p"}>Telefon: {selectedCourier.phone}</Typography>
              </Typography>
            )}
            <div className={styles.modalButtons}>
              <UpdateCourier courier={selectedCourier} refreshCourierList={getCourierData}/>
              <DeleteCourier courier={selectedCourier} refreshCourierList={getCourierData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}