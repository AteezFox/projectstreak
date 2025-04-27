import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Container, Typography, Button } from '@mui/material';
import styles from "./companybyceo.module.css";
import CreateCompany from '../CreateCompany/CreateCompany.jsx';
import DeleteCompany from '../DeleteCompany/DeleteCompany.jsx';
import UpdateCompany from '../UpdateCompany/UpdateCompany.jsx';
import { useAppContext } from '../../../Context/AppContext';

export default function CompanyByCeo() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAppContext();

  const getCompanyData = () => {
    if (!user || !user.userId) {
      setError("Nincs bejelentkezett felhasználó");
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:8080/streak/api/companies/get/ceo/${user.userId}`)
      .then((response) => {
        if (response.data) {
          // Handle both single object and array responses
          const companyData = Array.isArray(response.data) ? response.data : [response.data];
          setCompanies(companyData.filter(item => item && item.id)); // Filter out null or invalid entries
          setLoading(false);
        } else {
          setCompanies([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Hiba a cég adatok lekérésekor:", error);
        setError("Nem sikerült betölteni a cég adatokat");
        setCompanies([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompanyData();
  }, [user?.userId]); // Re-fetch when userId changes

  const handleOpen = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <CreateCompany refreshCompanyList={getCompanyData} />

      {loading && <Typography className={styles.loadingMessage}>Betöltés...</Typography>}

      {error && <Typography className={styles.errorMessage}>{error}</Typography>}

      {!loading && !error && companies.length === 0 && (
        <Typography className={styles.noCompany}>
          Nincs még céged. Hozz létre egyet a fenti gombbal.
        </Typography>
      )}

      {!loading && companies.map(company => (
        <div className={styles.userRow} key={company.id}>
          <div className={styles.userInfo}>
            <p className={styles.userText}>ID: #{company.id}</p>
            <p className={styles.userText}>Név: {company.name}</p>
          </div>
          <button className={styles.moreInfoButton} onClick={() => handleOpen(company)}>
            További információk
          </button>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Container className={styles.container}>
          <Box className={styles.body}>
            <Typography variant="h5" className={styles.modalTitle}>
              Cég részletei
            </Typography>
            {selectedCompany && (
              <div className={styles.CompanyDetails}>
                <p>ID: #{selectedCompany.id}</p>
                <p>Név: {selectedCompany.name}</p>
                <p>Tulaj: #{selectedCompany.userId} felhasználó</p>
              </div>
            )}
            <div className={styles.modalButtons}>
              <UpdateCompany company={selectedCompany} refreshCompanyList={getCompanyData} />
              <DeleteCompany company={selectedCompany} refreshCompanyList={getCompanyData} />
            </div>
          </Box>
        </Container>
      </Modal>
    </>
  );
}