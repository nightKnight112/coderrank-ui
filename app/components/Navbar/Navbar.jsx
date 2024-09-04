"use client";
import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import styles from "./Navbar.module.css"
import { ModeContext } from '@/app/CustomThemeProvider'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar = () => {

    const { mode, setMode } = useContext(ModeContext);

    const toggleTheme = () => {
        setMode(mode === "light" ? "dark" : "light");
    }

    return (
        <Box className={styles.navbar} sx={{ bgcolor: "primary.main" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>CoderRank</Typography>
            <Box onClick={toggleTheme}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </Box>
        </Box>
    )
}

export default Navbar