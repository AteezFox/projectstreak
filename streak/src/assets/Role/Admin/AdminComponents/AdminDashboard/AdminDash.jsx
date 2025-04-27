import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Box } from '@mui/material';
import AdminNav from '../AdminNavbar/AdminNav.jsx';
import styles from './admindash.module.css';
import User from "../../../User/UserUser/User.jsx";
import Courier from "../../../Courier/CourierCourier/Courier.jsx";
import Admin from '../../Admin/Admin.jsx';
import Ceo from '../../../Ceo/CeoCeo/Ceo.jsx'
import Company from '../../../Company/Company/Company.jsx'
import Product from '../../../Product/Product/Product.jsx';

export default function AdminDash() {


    return (
        <>
            <AdminNav />
            <Container className={styles.container}>
                <Box className={styles.body}>
                    <h1>Admin Dashboard</h1>
                    
                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Admins</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <Admin />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    
                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>CEOs</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <Ceo />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Companies</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <Company />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Products</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <Product />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Couriers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <Courier />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className={styles.list}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Customers</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={"div"}>
                                <User />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </Box>
            </Container>
        </>
    );
}