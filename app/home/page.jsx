"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { Alert, Box, Chip, Snackbar, Typography } from '@mui/material';
import CustomDataGrid from '../components/CustomDataGrid/CustomDataGrid';
import { api } from '@/utils/apiFile';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { handleClientRequest } from '@/utils/routeProtection';

const page = () => {

    const [data, setData] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    handleClientRequest();


    const columns = ["Title", "Difficulty", "Tags"];

    const createData = ({ problem_statement_id, title, difficulty, tags }) => {
        let color = "success";
        if (difficulty === "Easy")
            color = "success";
        else if (difficulty === "Medium")
            color = "warning";
        else if (difficulty === "Hard")
            color = "error"

        return {
            title: (
                <Link href={`/home/code/${problem_statement_id}`} style={{ color: "maroon", textDecoration: "none" }} ><Typography sx={{ color: "primary.main" }}>{title}</Typography></Link >
            ),
            difficulty: (
                <Chip label={difficulty} color={color} />
            ),
            tags: tags,
        }
    }

    useEffect(() => {
        api.get("/get-problem-list/").then((res) => {
            let temp = [];
            res?.data?.map((r, i) => {
                let x = {
                    problem_statement_id: r?.problem_statement_uuid,
                    title: r?.problem_statement_title,
                    difficulty: r?.problem_statement_difficulty,
                    tags: r?.problem_statement_tags
                }
                temp.push(createData(x));
            })
            setData(temp);
        })
            .catch((err) => {
                setAlertOpen(true);
                setSeverity("error");
                setMessage(err?.response?.data?.message);
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
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Box className={styles.main_container} sx={{ backgroundColor: "background", color: "textColor" }}>
                <CustomDataGrid columns={columns} data={data} />
            </Box>
        </>
    )
}

export default page