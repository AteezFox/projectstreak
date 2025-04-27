import React, { useEffect, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import styles from './usershop.module.css';
import axios from 'axios';
import { AppContext } from '../../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CompanyCards() {
  const [companys, setCompanys] = useState([]);
  const { filteredCompanys } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filteredCompanys) {
      fetchCompanys();
    } else {
      setCompanys(filteredCompanys);
    }
  }, [filteredCompanys]);

  const fetchCompanys = () => {
    axios
      .get('http://localhost:8080/streak/api/companies/get')
      .then((response) => {
        setCompanys(response.data);
      })
      .catch((error) => {
        console.error('Hiba történt a termékek betöltésekor:', error);
      });
  };

  const handleCardClick = (company) => {
    navigate(`/USER/${company.name}/${company.id}/products`);
  };

  return (
    <div className={styles.cardContainer}>
      {companys.map((company) => (
        <Card
          key={company.id}
          className={styles.card}
          onClick={() => handleCardClick(company)}
          sx={{ cursor: 'pointer' }}
        >
          <CardContent className={styles.cardContent}>
            <Typography variant="h6" className={styles.cardTitle}>
              {company.name}
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}