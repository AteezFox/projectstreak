import { useEffect, useState } from 'react';
import {AppBar, Toolbar, IconButton, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import styles from './couriernav.module.css';

export default function CourierNav() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
    const [hidden, setHidden] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 720);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let lastScrollTop = 0;
        const onScroll = () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setHidden(scrollTop > lastScrollTop);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <AppBar position="fixed" className={`${styles.appBar} ${hidden ? styles.hidden : ''}`}>
                <Toolbar className={styles.toolBar}>
                    <IconButton edge="start" aria-label="logo" className={styles.menuButton} onClick={() => navigate("/courier")}>
                        <img src="/icons/logo_icon.png" alt="logo" className={styles.menuButton}/>
                    </IconButton>
                    <img src="/icons/logo_felirat.png" className={styles.title} alt=""/>
                    <Typography component={"h6"} className={styles.home}> Courier Dashboard </Typography>
                    <Button onClick={() => setShowSearch(!showSearch)} color={"inherit"} className={styles.searchButton}>
                        <SearchIcon />
                    </Button>
                    {
                        isMobile ? (
                            <Box className={styles.profile}>
                                <IconButton edge="end" color="inherit" onClick={() => navigate("/")} className={styles.profile}>
                                    <LogoutIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box className={styles.navLinks}>
                                <IconButton edge="end" color="inherit" onClick={() => navigate("/")} className={styles.profile}>
                                    <LogoutIcon />
                                </IconButton>
                            </Box>
                        )
                    }
                </Toolbar>
                {showSearch && (
                    <Box className={styles.searchBar}>
                        <TextField variant="outlined" placeholder="Search for nearby orders..." fullWidth />
                    </Box>
                )}
            </AppBar>
        </>
    );
}