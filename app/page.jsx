"use client";
import React, { useContext, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import styles from "./page.module.css"
import axios from 'axios';
import { Alert, Backdrop, Box, Button, CircularProgress, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { ModeContext } from './CustomThemeProvider';
import BackupIcon from '@mui/icons-material/Backup';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const page = () => {
	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [loaderOpen, setLoaderOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [languageName, setLanguageName] = useState("");
	const [languageOptions, setLanguageOptions] = useState([]);

	const handleCodeChange = (value, event) => {
		setCode(value);
	}

	const runCode = () => {
		setLoaderOpen(true);
		let data = {
			code: code,
			input: input
		}
		axios.post(`${process.env.NEXT_PUBLIC_API_URL}/execute`, data, {
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

	useEffect(() => {
		axios.get(`${process.env.NEXT_PUBLIC_API_URL}/get-language-options`)
			.then((res) => {
				setLanguageOptions(res?.data);
				setLanguageName(res?.data[0]?.language_name);
			})
	}, [])

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

			<Box className={styles.main_container} bgcolor="background" color="textColor">
				<Box className={styles.toolbar} bgcolor="toolbarBackground">
					<Box className={styles.question_navigation_container}>
						<Button sx={{ minWidth: "5px", padding: "0px" }} title='Previous'>
							<ChevronLeft />
						</Button>
						<Button sx={{ minWidth: "5px", padding: "0px" }} title='Next'>
							<ChevronRight />
						</Button>
					</Box>

					<Box className={styles.language_select_btn_container}>
						<Select
							size="small"
							value={languageName}
							onChange={(e) => setLanguageId(e.target.value)}
							sx={{ width: "100px" }}
							inputProps={{
								MenuProps: {
									MenuListProps: {
										sx: {
											backgroundColor: 'background'
										}
									}
								}
							}}
						>
							{languageOptions?.map((r, i) => {
								return (
									<MenuItem value={r?.language_name}>{r?.language_name}</MenuItem>
								)
							})}
						</Select>

						<Button variant="contained" className={styles.run_btn} onClick={runCode} title="Run">
							<PlayArrowIcon></PlayArrowIcon>
						</Button>
						<Button variant="contained" className={styles.submit_btn} color='success' title="Submit">
							<BackupIcon></BackupIcon>
						</Button>
					</Box>
				</Box>

				<Box className={styles.question_content_container}>
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
								language={languageName.toLowerCase()}
								theme={mode === "light" ? "vs-light" : "vs-dark"}
								onChange={handleCodeChange}
								options={{
									fontFamily: "monospace",
									fontLigatures: "true",
									minimap: { enabled: false },
									fontSize: "14px"
								}}
							/>
						</Box>

						<Box className={styles.input_output_container}>
							<TextField
								sx={{
									'& .MuiInputBase-input': {
										fontFamily: "Fira Code, monospace"
									},
									flex: 1
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
									},
									flex: 1
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

			</Box >
		</>
	)
}

export default page