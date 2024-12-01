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

    const isValid = () => {
        if (phoneNo.length !== 10)
            return { "status": false, "errorMessage": "Invalid phone number" };

        if (!email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
            return { "status": false, "errorMessage": "Invalid email" }

        return { "status": true, "errorMessage": "" }
    }

    const handleEdit = () => {
        const { status, errorMessage } = isValid();
        if (status) {
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
        else {
            setAlertOpen(true);
            setMessage(errorMessage);
            setSeverity("error");
        }
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

                <Box className={styles.details_container} sx={{ backgroundColor: "secondaryBackground" }}>
                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Fullname</Typography>
                        <TextField sx={{ width: "100%" }} size='small' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Phone No.</Typography>
                        <TextField sx={{ width: "100%" }} size='small' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
                        <TextField sx={{ width: "100%" }} size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: "bold" }}>Is Admin?</Typography>
                        <Switch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                    </Box>
                </Box>

                <Box className={styles.btn_container}>
                    <Button variant="contained" sx={{ backgroundColor: "primary.main", fontWeight: "bold" }} onClick={handleEdit}>
                        <Save />
                        Save
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "error.main", fontWeight: "bold" }} onClick={handleDelete}>
                        <Delete />
                        Delete
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default page