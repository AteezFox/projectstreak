import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, TextField } from "@mui/material";
import styles from './registerModal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';

export default function RegisterModal({ isOpen, onClose }) {
    const [openClass, setOpenClass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { updateUser } = useAppContext();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setOpenClass(styles['modal-enter']), 10);
        } else {
            setOpenClass('');
            // Reset form
            setFirstName('');
            setLastName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setFieldErrors({});
            setError(null);
        }
    }, [isOpen]);

    const validateForm = () => {
        const errors = {};
        
        if (!firstName.trim()) errors.firstName = "Keresztnév megadása kötelező";
        if (!lastName.trim()) errors.lastName = "Vezetéknév megadása kötelező";
        if (!phone.trim()) errors.phone = "Telefonszám megadása kötelező";
        if (!email.trim()) {
            errors.email = "Email cím megadása kötelező";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "Érvénytelen email cím";
        }
        if (!password) {
            errors.password = "Jelszó megadása kötelező";
        } else if (password.length < 6) {
            errors.password = "A jelszónak legalább 6 karakter hosszúnak kell lennie";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        
        if (!validateForm()) {
            return;
        }

        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            userType: 'USER'
        };
        
        try {
            console.log('Regisztrációs adatok:', { ...userData, password: '***' });
            
            const registerResponse = await axios.post('http://localhost:8080/streak/api/auth/register', userData);

            if (!registerResponse.data || !registerResponse.data.userId) {
                setError("Sikertelen regisztráció: hiányzó felhasználói azonosító");
                return;
            }

            // Közvetlen bejelentkezés ugyanazokkal az adatokkal
            try {
                const loginResponse = await axios.post("http://localhost:8080/streak/api/auth/login", {
                    email: userData.email,
                    password: userData.password
                });

                if (!loginResponse.data || !loginResponse.data.userId) {
                    setError("Sikeres regisztráció, de a bejelentkezés sikertelen");
                    return;
                }

                const { userId } = loginResponse.data;
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
                } else if (['ADMIN', 'CEO', 'COURIER'].includes(userType)) {
                    navigate(`/${userType}/${userId}/dashboard`);
                } else {
                    setError("Ismeretlen felhasználói típus");
                    return;
                }
                
                console.log("Sikeres regisztráció és bejelentkezés");
                onClose();
            } catch (loginError) {
                console.error("Automatikus bejelentkezési hiba:", loginError);
                setError("Sikeres regisztráció, de a bejelentkezés sikertelen. Kérjük, jelentkezzen be manuálisan.");
            }
        } catch (error) {
            console.error("Regisztrációs hiba:", error);
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data && error.response.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError("A megadott adatok érvénytelenek");
                    }
                } else if (error.response.status === 409) {
                    setError("Ez az email cím már regisztrálva van");
                } else {
                    setError("Hiba történt a regisztráció során");
                }
            } else if (error.request) {
                setError("Nem sikerült kapcsolódni a szerverhez");
            } else {
                setError("Váratlan hiba történt");
            }
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={`${styles.modal} ${openClass}`}>
                <h1>Regisztáció</h1>
                <div className={styles.inputGroup}>
                    <TextField
                        id="outlined-basic"
                        variant={"outlined"}
                        placeholder={"Keresztnév"}
                        className={styles.input}
                        required
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={!!fieldErrors.firstName}
                        helperText={fieldErrors.firstName || ""}
                    />
                    <TextField
                        id="outlined-basic"
                        placeholder={"Vezetéknév"}
                        variant="outlined"
                        className={styles.input}
                        required
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={!!fieldErrors.lastName}
                        helperText={fieldErrors.lastName || ""}
                    />
                </div>
                <TextField
                    id="outlined-basic"
                    placeholder={"Telefonszám"}
                    variant="outlined"
                    className={styles.input}
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!fieldErrors.phone}
                    helperText={fieldErrors.phone || ""}
                />
                <TextField
                    id="outlined-basic"
                    placeholder={"Email"}
                    variant="outlined"
                    className={styles.input}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email || ""}
                />
                <TextField
                    id="outlined-basic"
                    placeholder={"Jelszó"}
                    variant="outlined"
                    className={styles.input}
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password || ""}
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.buttons}>
                    <Button className={styles.button} onClick={handleSubmit}>Regisztráció</Button>
                    <Button className={styles.button} onClick={onClose}>Bezár</Button>
                </div>
            </Box>
        </Modal>
    );
}