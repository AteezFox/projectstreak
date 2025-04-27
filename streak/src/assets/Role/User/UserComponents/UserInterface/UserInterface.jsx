import UserNav from "../UserNavbar/UserNav.jsx";
import styles from "./userinterface.module.css";
import { Container, Box } from "@mui/material";
import UserShop from "../../UserShop/UserShop.jsx";
export default function UserInterface() {
    return (
        <>
            <UserNav />
            <Container className={styles.container}>
                <Box className={styles.body}>
                    <h3>
                        Boltok a környékeden:
                    </h3>
                    <br/>
                    <p>
                        <UserShop />
                    </p>
                </Box>
            </Container>
        </>
    );
}
