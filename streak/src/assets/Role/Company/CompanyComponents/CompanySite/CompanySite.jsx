import React from "react";
import UserNav from "../../../User/UserComponents/UserNavbar/UserNav"
import styles from "./companysite.module.css"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProductCards from "../../../Product/ProductCards/ProductCards";
import CompanySide from "../CompanySide/CompanySide";

export default function CompanySite(){
    return(
        <>
            <UserNav />
            <CompanySide />
            <Container className={styles.container}>
                <Box className={styles.body}>
                    <ProductCards />
                </Box>
            </Container>
        </>
    )
}