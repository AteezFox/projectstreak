import { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './courierdash.module.css';
import CourierNav from '../CourierNavbar/CourierNav.jsx';
import Order from '../../../Order/OrderOrder/Order.jsx';
import axios from 'axios';

export default function CourierDash() {
    const [orders, setOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/streak/api/orders/get/available');
            setOrders(response.data);
        } catch (error) {
            console.error('Hiba az elérhető rendelések lekérésekor:', error);
        }

        try {
            const responseAccepted = await axios.get('http://localhost:8080/streak/api/orders/get/accepted');
            setAcceptedOrders(responseAccepted.data);
        } catch (error) {
            console.error('Hiba az elfogadott rendelések lekérésekor:', error);
        }
    };

    return (
      <>
          <CourierNav />
          <Container className={styles.container}>
              <div className={styles.body}>
                  <h1>Courier Dashboard</h1>

                  <Accordion className={styles.list}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Elérhető rendelések</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Order orders={orders} />
                      </AccordionDetails>
                  </Accordion>

                  <Accordion className={styles.list}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>Általad elfogadott rendelések</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                          <Order orders={acceptedOrders} />
                      </AccordionDetails>
                  </Accordion>
              </div>
          </Container>
      </>
    );
}
