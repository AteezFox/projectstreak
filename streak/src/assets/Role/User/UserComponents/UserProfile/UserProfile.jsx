import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./userprofie.module.css";
import UserNav from "../UserNavbar/UserNav.jsx";
import User from "../../UserUser/User.jsx";
import UpdateUser from "../UpdateUser/UpdateUser.jsx";
import { useAppContext } from '../../../../Context/AppContext';

export default function UserProfile() {
    const { userId } = useAppContext();

    return (
        <>
            <UserNav />
            <Container className={styles.container}>
                <div className={styles.body}>
                    <UpdateUser userId={userId} />
                </div>
            </Container>
        </>
    );
}