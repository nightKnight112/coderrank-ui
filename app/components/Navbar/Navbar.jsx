"use client";
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./Navbar.module.css"
import { ModeContext } from '@/app/CustomThemeProvider'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { api } from '@/utils/apiFile';
import Cookies from 'js-cookie';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Navbar = () => {

    const { mode, setMode } = useContext(ModeContext);
    const [userData, setUserData] = useState({});
    const [displayAvatar, setDisplayAvatar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const router = useRouter();

    const toggleTheme = () => {
        setMode(mode === "light" ? "dark" : "light");
    }

    useEffect(() => {
        if (Cookies.get("isLoggedIn")) {
            setDisplayAvatar(true);
            api.get(`${process.env.NEXT_PUBLIC_API_URL}/get-user-data`).then((res) => {
                setUserData(res?.data);
            })
        }

    }, [])

    const randomColor = (initials) => {
        let magicNumber = (initials?.charCodeAt(0) + initials?.charCodeAt(1)) / 2
        let hex = Math.floor(magicNumber * 0xFFFFFF);
        let color = "#" + hex.toString(16);

        return color;
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                "&:hover": { cursor: "pointer" },
                bgcolor: randomColor(`${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`),
            },
            children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
        };
    }

    const logout = () => {
        api.post("/logout").then((res) => {
            Cookies.remove("isLoggedIn");
            router.push("/");
        })
            .catch((err) => {
                Cookies.remove("isLoggedIn");
                router.push("/");
            })
    }

    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "background"
                    }
                }}
            >
                <MenuItem onClick={() => setAnchorEl(null)} sx={{ display: "flex", gap: "10px" }}>
                    <AccountCircle />
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => logout()} sx={{ display: "flex", gap: "10px" }}>
                    <Logout />
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>

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
                        <Avatar
                            {...stringAvatar(userData?.user_name)}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        />
                        : null}
                </Box>

            </Box>

        </>

    )
}

export default Navbar