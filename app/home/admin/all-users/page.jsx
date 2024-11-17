"use client";
import { Alert, Box, Button, Pagination, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./page.module.css";
import { api } from '@/utils/apiFile';
import CustomDataGrid from '@/app/components/CustomDataGrid/CustomDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

const page = () => {

    const router = useRouter();

    const [data, setData] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);

    const columns = ["Username", "Full name", "Phone no.", "Email", "Admin User", "No. of times logged in", "Problems Solved", "Actions"];


    const createData = ({ user_alias, full_name, phone_no, email, is_admin, user_login_count, problem_solved_count }, user_id) => {
        return {
            user_alias,
            full_name,
            phone_no,
            email,
            is_admin,
            user_login_count,
            problem_solved_count,
            actions: (
                <>
                    <Box className={styles.actions_container}>
                        <EditIcon sx={{ color: "primary.main", "&:hover": { cursor: "pointer" } }} onClick={() => router.push(`/home/admin/edit-user/${user_id}`)} />
                        <DeleteIcon sx={{ color: "error.main", "&:hover": { cursor: "pointer" } }} />
                    </Box>
                </>
            )
        };
    }

    useEffect(() => {
        api.get("/user-details-list/").then((res) => {
            let temp = [];
            res?.data?.map((r, i) => {
                temp.push(createData(r?.user_metadata, r?.user_id))
            })
            setData(temp);
        })
            .catch((err) => {
                setAlertOpen(true);
            })
    }, [])

    return (
        <>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Something went wrong!
                </Alert>
            </Snackbar>

            <Box className={styles.main_container} bgcolor="background" color="textColor">
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>All users</Typography>
                <CustomDataGrid data={data} columns={columns} />
            </Box >
        </>
    )
}

export default page