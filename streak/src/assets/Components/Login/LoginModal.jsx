import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField } from "@mui/material";
import styles from './loginModal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';

export default function LoginModal({ isOpen, onClose }) {
    const [openClass, setOpenClass] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    const { updateUser } = useAppContext();
    
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setOpenClass(styles['modal-enter']), 10);
        } else {
            setOpenClass('');
        }
    }, [isOpen]);

    const loginUser = async () => {
        try {
            setEmailError(false);
            setPasswordError(false);
            setError(null);

            if (!email.trim() || !password) {
                setError("Minden mező kitöltése kötelező!");
                setEmailError(!email.trim());
                setPasswordError(!password);
                return;
            }

            const loginData = {
                email: email.trim().toLowerCase(),
                password: password
            };

            console.log('Bejelentkezési adatok:', loginData);

            const loginResponse = await axios.post("http://localhost:8080/streak/api/auth/login", loginData);

            if (!loginResponse.data || !loginResponse.data.userId) {
                setError("Sikertelen bejelentkezés: hiányzó felhasználói azonosító");
                return;
            }

            const { userId } = loginResponse.data;
            
            try {
                const userResponse = await axios.get(`http://localhost:8080/streak/api/users/get/${userId}`);
                
                if (!userResponse.data || !userResponse.data.userType) {
                    setError("Sikertelen bejelentkezés: hiányzó felhasználói típus");
                    return;
                }

                const { userType } = userResponse.data;
                
                // Update the global user context
                updateUser(userId, userType);
                
                if (userType === 'USER') {
                    navigate(`/${userType}/${userId}/home`);
                }
                else if (userType === 'ADMIN') {
                    navigate(`/${userType}/${userId}/admindashboard`);
                } else if (userType === 'CEO') {
                    navigate(`/${userType}/${userId}/ceodashboard`);
                } else if (userType === 'COURIER') {
                    navigate(`/${userType}/${userId}/courierdashboard`);
                } else {
                    setError("Ismeretlen felhasználói típus");
                    return;
                }
                
                console.log("Sikeres bejelentkezés");
                onClose();
            } catch (error) {
                console.error("Felhasználói adatok lekérése sikertelen", error);
                if (error.response && error.response.status === 401) {
                    setError("A munkamenet lejárt. Kérjük, jelentkezzen be újra.");
                } else {
                    setError("Hiba történt a felhasználói adatok lekérése során");
                }
            }
        } catch (error) {
            console.error("Bejelentkezési hiba:", error);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        setError("Hibás email vagy jelszó!");
                        setEmailError(true);
                        setPasswordError(true);
                        break;
                    case 404:
                        setError("Felhasználó nem található");
                        setEmailError(true);
                        break;
                    default:
                        setError("Hiba történt a bejelentkezés során. Kérjük próbálja újra később.");
                }
            } else if (error.request) {
                setError("Nem sikerült kapcsolódni a szerverhez. Kérjük ellenőrizze az internetkapcsolatot.");
            } else {
                setError("Váratlan hiba történt. Kérjük próbálja újra később.");
            }
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
        >
            <Box className={`${styles.modal} ${openClass}`}>
                <h1>Bejelentkezés</h1>
                <TextField
                    value={email}
                    id="outlined-basic"
                    variant={"outlined"}
                    placeholder="Email"
                    className={styles.input}
                    type="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                />
                <TextField
                    value={password}
                    id="outlined-basic"
                    variant={"outlined"}
                    placeholder={"Jelszó"}
                    className={styles.input}
                    type="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.buttons}>
                    <Button className={styles.button} onClick={loginUser}>Bejelentkezés</Button>
                    <Button className={styles.button} onClick={onClose}>Bezár</Button>
                </div>
            </Box>
        </Modal>
    );
}