"use client";
import { Alert, Box, Button, Snackbar, Switch, TextField, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { api } from '@/utils/apiFile';

const page = () => {
    const params = useParams();
    const router = useRouter();

    const user_id = params.user_id;

    const [fullName, setFullName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        api.get(`/user-details-list/${user_id}`).then((res) => {
            setFullName(res?.data?.user_metadata?.full_name);
            setPhoneNo(res?.data?.user_metadata?.phone_no);
            setEmail(res?.data?.user_metadata?.email);
            setIsAdmin(res?.data?.user_metadata?.is_admin.toLowerCase() === 'true');
        })
    }, [])

    const handleEdit = () => {
        api.put("/edit-user", {
            user_to_be_edited: user_id,
            edit_metadata: {
                full_name: fullName,
                phone_no: phoneNo,
                is_admin: isAdmin,
                email: email
            }
        })
            .then((res) => {
                setAlertOpen(true);
                setMessage(res?.data?.message);
                setSeverity("success");
                setTimeout(() => router.back(), 3000);
            })
            .catch((err) => {
                setAlertOpen(true);
                setMessage(err?.response?.data?.message);
                setSeverity("error");
            })
    }

    return (
        <>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Box className={styles.main_container} sx={{ backgroundColor: "background", color: "textColor" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Edit User</Typography>

                <Box className={styles.details_container}>
                    <Box>
                        <Typography>Fullname</Typography>
                        <TextField size='small' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography>Phone No.</Typography>
                        <TextField size='small' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography>Email</Typography>
                        <TextField size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography>Is Admin?</Typography>
                        <Switch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                    </Box>
                </Box>

                <Box className={styles.btn_container}>
                    <Button variant="contained" sx={{ backgroundColor: "error.main" }} onClick={() => router.back()}>Cancel</Button>
                    <Button variant="contained" sx={{ backgroundColor: "primary.main" }} onClick={handleEdit}>Save</Button>
                </Box>
            </Box>
        </>
    )
}

export default page