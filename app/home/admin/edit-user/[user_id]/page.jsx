"use client";
import { Alert, Box, Button, Snackbar, Switch, TextField, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { api } from '@/utils/apiFile';
import { Delete, Save } from '@mui/icons-material';

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
            setFullName(res?.data?.full_name);
            setPhoneNo(res?.data?.phone_no);
            setEmail(res?.data?.email);
            setIsAdmin(res?.data?.is_admin.toLowerCase() === 'true');
        })
            .catch((err) => {
                setAlertOpen(true);
                setMessage(err?.response?.data?.message);
                setSeverity("error");
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

    const handleDelete = () => {
        api.delete("/delete-user", {
            data: {
                user_to_be_deleted: user_id
            }
        })
            .then((res) => {
                setAlertOpen(true);
                setMessage(res?.data?.message);
                setSeverity("success");
                if (res?.data?.self_delete === "true") {
                    Cookies.remove("isLoggedIn");
                    setTimeout(() => router.push("/"), 3000)
                }
                else {
                    setTimeout(() => router.back(), 3000);
                }
            })
            .catch((err) => {
                setAlertOpen(true);
                setSeverity("error");
                setMessage(err?.response?.data?.message);
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
                    <Button variant="contained" sx={{ backgroundColor: "primary.main", display: "flex", gap: "10px", width: "120px" }} onClick={handleEdit}>
                        <Typography>Save</Typography>
                        <Save />
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "error.main", display: "flex", gap: "10px", width: "120px" }} onClick={handleDelete}>
                        <Typography>Delete</Typography>
                        <Delete />
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default page