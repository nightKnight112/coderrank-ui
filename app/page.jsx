"use client";
import React, { useContext, useState } from 'react'
import Editor from '@monaco-editor/react';
import styles from "./page.module.css"
import axios from 'axios';
import { Alert, Backdrop, Box, Button, CircularProgress, Divider, Snackbar, TextField, Typography } from '@mui/material';
import { ModeContext } from './CustomThemeProvider';

const page = () => {
	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [loaderOpen, setLoaderOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleCodeChange = (value, event) => {
		setCode(value);
	}

	const runCode = () => {
		setLoaderOpen(true);
		let data = {
			code: code,
			input: input
		}
		axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/execute`, data, {
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => {
			setOutput(res?.data);
			setLoaderOpen(false);
		})
			.catch((err) => {
				setLoaderOpen(false);
				setOpen(true);
			})
	}

	const { mode, setMode } = useContext(ModeContext);

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
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
			<Backdrop
				sx={(theme) => ({ color: 'primary.main', zIndex: theme.zIndex.drawer + 1 })}
				open={loaderOpen}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box className={styles.main_container} sx={{ bgcolor: "background", color: "textColor" }}>
				<Box className={styles.question}>
					<Box>
						<Typography variant="h5" sx={{ fontWeight: "bold" }}>Problem 1</Typography>
						<Typography>Write a program to print sum of 2 numbers.</Typography>
					</Box>

					<Box>
						<Typography variant="h5" sx={{ fontWeight: "bold" }}>Sample Input</Typography>
						<Typography sx={{ whiteSpace: "pre-wrap" }}>
							{`5\n10`}
						</Typography>
					</Box>

					<Box>
						<Typography variant="h5" sx={{ fontWeight: "bold" }}>Sample Output</Typography>
						<Typography>15</Typography>
					</Box>

				</Box>

				<Box className={styles.content}>
					<Box className={styles.editor}>
						<Editor
							defaultLanguage="java"
							defaultValue="// some comment"
							theme={mode === "light" ? "vs-light" : "vs-dark"}
							onChange={handleCodeChange}
							options={{
								fontFamily: "monospace",
								fontLigatures: "true",
								minimap: { enabled: false }
							}}
						/>
					</Box>

					<Box className={styles.btn_container}>
						<Button variant="contained" className={styles.run_btn} onClick={runCode}>Run</Button>
						<Button variant="contained" className={styles.submit_btn} color='success'>Submit</Button>
					</Box>

					<Box className={styles.input_output_container}>
						<TextField
							sx={{
								'& .MuiInputBase-input': {
									fontFamily: "Fira Code, monospace"
								}
							}}
							multiline
							placeholder='Input'
							value={input}
							onChange={(e) => setInput(e.target.value)}
							rows={5}
						></TextField>

						<TextField
							sx={{
								'& .MuiInputBase-input': {
									fontFamily: "Fira Code, monospace"
								}
							}}
							multiline
							placeholder='Output'
							value={output}
							readOnly
							rows={5}
						></TextField>
					</Box>
				</Box>

			</Box>
		</>
	)
}

export default page