"use client";
import { Avatar, Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import { ModeContext } from '@/app/CustomThemeProvider'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { api } from '@/utils/apiFile';
import Cookies from 'js-cookie';

const Navbar = () => {

    const { mode, setMode } = useContext(ModeContext);
    const [userData, setUserData] = useState({});
    const [displayAvatar, setDisplayAvatar] = useState(false);

    const toggleTheme = () => {
        setMode(mode === "light" ? "dark" : "light");
    }

    useEffect(() => {
        console.log("inside useeffect", Cookies.get("isLoggedIn"));
        if (Cookies.get("isLoggedIn")) {
            console.log("inside if block")
            setDisplayAvatar(true);
            api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-user-data`).then((res) => {
                setUserData(res?.data);
            })
        }

    }, [])

    return (
        <Box className={styles.navbar}>
            <Typography variant="h4" sx={{ fontWeight: "900", color: "white" }}>CoderRank</Typography>

            <Box className={styles.right_container}>
                <Box onClick={toggleTheme}>
                    {mode === "light" ? <DarkModeIcon sx={{
                        color: "white", "&:hover": {
                            cursor: "pointer"
                        }
                    }} /> : <LightModeIcon sx={{ color: "white" }} />}
                </Box>

                {displayAvatar ?
                    <Avatar sx={{ "&:hover": { cursor: "pointer" } }}>{userData?.user_name?.split(" ")[0][0] + userData?.user_name?.split(" ")[1][0]}</Avatar>
                    : null}
            </Box>

        </Box>
    )
}

export default Navbar