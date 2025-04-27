import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Modal, Box, Container, Typography } from '@mui/material';
import styles from "./admin.module.css";
import CreateAdmin from '../CreateAdmin/CreateAdmin.jsx';
import DeleteAdmin from '../DeleteAdmin/DeleteAdmin.jsx';
import UpdateAdmin from '../UpdateAdmin/UpdateAdmin.jsx';

export default function getAdmin() {
  const [filterUsers, setFilterUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // State to store selected admin

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = () => {
    axios
      .get('http://localhost:8080/streak/api/users/get/admins')
      .then((response) => {
        setFilterUsers(response.data);
        setOpen(false); // modal bezárása
        console.log("Sikeres lekérés");
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  const handleOpen = (admin) => {
    setSelectedAdmin(admin); // Set the selected admin
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CreateAdmin refreshAdminList={getAdminData} />
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
              Admin részletei
            </Typography>
            {selectedAdmin && (
              <Typography component={"div"} className={styles.adminDetails}>
                <Typography component={"p"}>ID: #{selectedAdmin.id}</Typography>
                <Typography component={"p"}>Név: {selectedAdmin.firstName} {selectedAdmin.lastName}</Typography>
                <Typography component={"p"}>Email: {selectedAdmin.email}</Typography>
                <Typography component={"p"}>Állandó lakcím: {selectedAdmin.address}</Typography>
                <Typography component={"p"}>Telefon: {selectedAdmin.phone}</Typography>
              </Typography>
            )}
            <div className={styles.modalButtons}>
              <UpdateAdmin admin={selectedAdmin} refreshAdminList={getAdminData} />
              <DeleteAdmin admin={selectedAdmin} refreshAdminList={getAdminData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}