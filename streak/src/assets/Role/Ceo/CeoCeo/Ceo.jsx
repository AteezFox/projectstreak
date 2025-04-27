import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography } from '@mui/material';
import styles from "./ceo.module.css";
import { useNavigate } from 'react-router-dom';
import CreateCeo from '../CreateCeo/CreateCeo';
import DeleteCeo from '../DeleteCeo/DeleteCeo';
import UpdateCeo from '../UpdateCeo/UpdateCeo';

export default function getCeo() {
  const [filterUsers, setFilterUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const edit = useNavigate();

  const getCeoData = () => {
    axios
      .get('http://localhost:8080/streak/api/users/get/ceos')
      .then((response) => {
        setFilterUsers(response.data);
        console.log("Sikeres lekérés");
      })
      .catch((error) => {
        console.log('Valami gikszer', error);
      });
  };

  useEffect(() => {
    // Initial data fetch
    getCeoData();

    // Set up automatic refresh every 5 seconds
    const interval = setInterval(() => {
      getCeoData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchCompanyData = (userId) => {
    setLoading(true);
    axios.get(`http://localhost:8080/streak/api/companies/get/ceo/${userId}`)
      .then((response) => {
        // Handle both array response and direct object response
        if (response.data) {
          setCompanyData(Array.isArray(response.data) ? response.data[0] : response.data);
        } else {
          setCompanyData(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Cég adatok lekérése sikertelen:', error);
        setCompanyData(null);
        setLoading(false);
      });
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setCompanyData(null); // Reset company data
    fetchCompanyData(user.id); // Fetch company data for this CEO
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CreateCeo onCeoAdded={getCeoData} />
      {filterUsers.map(user => (
        <div className={styles.userRow} key={user.id}>
          <div className={styles.userInfo}>
            <h2 className={styles.userText}>ID: #{user.id}</h2>
            <h2 className={styles.userText}>Név: {user.firstName}, {user.lastName}</h2>
          </div>
          <button className={styles.moreInfoButton} onClick={() => handleOpen(user)}>
            További információk
          </button>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            {selectedUser && (
              <>
                <Typography variant="h5" className={styles.modalTitle}>
                  CEO részletei
                </Typography>
                <Typography variant="div" className={styles.ceoDetails}>
                  <Typography variant={"p"}>Név: {selectedUser.firstName} {selectedUser.lastName}</Typography>
                  <Typography variant={"p"}>Azonosító: #{selectedUser.id}</Typography>
                  <Typography variant={"p"}>Email: {selectedUser.email}</Typography>
                  <Typography variant={"p"}>Telefonszám: {selectedUser.phone}</Typography>
                  <Typography variant={"p"}>Állandó lakcím: {selectedUser.address}</Typography>
                </Typography>

                <Typography variant="h6" className={styles.modalTitle} style={{marginTop: '20px'}}>
                  Cég adatok
                </Typography>
                {loading ? (
                  <Typography>Betöltés...</Typography>
                ) : companyData ? (
                  <Typography variant="div" className={styles.companyDetails}>
                    <Typography variant={"p"}>Cég neve: {companyData.name}</Typography>
                    <Typography variant={"p"}>Cég azonosító: #{companyData.id}</Typography>
                  </Typography>
                ) : (
                  <Typography variant={"p"}>Nincs cég hozzárendelve ehhez a CEO-hoz</Typography>
                )}

                <div className={styles.modalButtons}>
                  <UpdateCeo ceo={selectedUser} refreshAdminList={getCeoData} />
                  <DeleteCeo ceo={selectedUser} refreshCeoList={getCeoData} />
                </div>
              </>
            )}
          </Box>
        </Container>
      </Modal>
    </>
  );
}