import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Modal, Box, Container, Typography } from '@mui/material';
import styles from "./company.module.css";
import { useNavigate } from 'react-router-dom';
import DeleteCompany from '../DeleteCompany/DeleteCompany.jsx';
import UpdateCompany from '../UpdateCompany/UpdateCompany.jsx';

export default function getCompany() {
    const [filtercompanys, setFiltercompanys] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null); // State to store selected Company
    const edit = useNavigate();

    useEffect(() => {
        getCompanyData();
    }, []);

    const getCompanyData = () => {
        axios
          .get('http://localhost:8080/streak/api/companies/get')
          .then((response) => {
              setFiltercompanys(response.data);
              setOpen(false); // modal bezárása
              console.log("Sikeres lekérés");
          })
          .catch((error) => {
              console.log('Valami gikszer', error);
          });
    };

    const handleOpen = (Company) => {
        setSelectedCompany(Company); // Set the selected Company
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
      <>
          {filtercompanys.map(company => (
            <div className={styles.companyRow} key={company.id}>
                <div className={styles.companyInfo}>
                    <p className={styles.companyText}>ID: #{company.id}</p>
                    <p className={styles.companyText}>Név: {company.name}</p>
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
                          Company részletei
                      </Typography>
                      {selectedCompany && (
                        <Typography component={"div"} className={styles.CompanyDetails}>
                            <Typography component={"p"}>ID: #{selectedCompany.id}</Typography>
                            <Typography component={"p"}>Név: {selectedCompany.name}</Typography>
                            <Typography component={"p"}>Tulaj ID: #{selectedCompany.userId}</Typography>
                        </Typography>
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