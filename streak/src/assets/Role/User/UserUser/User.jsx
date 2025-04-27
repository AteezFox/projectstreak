import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography } from '@mui/material';
import styles from "./user.module.css";
import { useNavigate } from 'react-router-dom';
import DeleteUser from '../DeleteUser/DeleteUser.jsx';
import UpdateUser from '../UpdateUser/UpdateUser.jsx';

export default function getUser() {
  const [filterUsers, setFilterUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  const edit = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get('http://localhost:8080/streak/api/users/get/users')
      .then((response) => {
        setFilterUsers(response.data);
        setOpen(false);
        console.log("Sikeres lekérés");
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  const handleOpen = (user) => {
    setSelectedUser(user); // Set the selected user
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.userContainer}>
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
              Felhasználó részletei
            </Typography>
            {selectedUser && (
              <Typography component={"div"} className={styles.userDetails}>
                <Typography component={"p"}>ID: #{selectedUser.id}</Typography>
                <Typography component={"p"}>Név: {selectedUser.firstName} {selectedUser.lastName}</Typography>
                <Typography component={"p"}>Email: {selectedUser.email}</Typography>
                <Typography component={"p"}>Telefonszám: {selectedUser.phoneNumber}</Typography>
                <Typography component={"p"}>Cím(ek): {selectedUser.address}</Typography>
              </Typography>
            )}
            <div className={styles.modalButtons}>
              <UpdateUser user={selectedUser} refreshUserList={getUserData} />
              <DeleteUser user={selectedUser} refreshUserList={getUserData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}