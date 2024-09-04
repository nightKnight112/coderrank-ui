"use client";
import React, { useContext, useState } from 'react'
import Editor from '@monaco-editor/react';
import styles from "./page.module.css"
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ModeContext } from './CustomThemeProvider';

const page = () => {
	const [code, setCode] = useState("");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");

	const handleCodeChange = (value, event) => {
		setCode(value);
	}

	const runCode = () => {
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
		})
	}

	const { mode, setMode } = useContext(ModeContext);
	return (
		<Box className={styles.main_container} sx={{ bgcolor: "background", color: "textColor" }}>
			<Box className={styles.question}>
				<Typography>
					Problem 1: Write a program to add 2 numbers and print its sum. Sample input: 5 10 Sample Output: 15
				</Typography>
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

				<Box className={styles.input_output_container}>
					<TextField
						multiline
						placeholder='Input'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						rows={5}
					></TextField>

					<TextField
						multiline
						placeholder='Output'
						value={output}
						readOnly
						rows={5}
					></TextField>

					<Box className={styles.btn_container}>
						<Button variant="contained" className={styles.run_btn} onClick={runCode}>Run</Button>
						<Button variant="contained" className={styles.submit_btn} color='success'>Submit</Button>
					</Box>
				</Box>
			</Box>

		</Box>
	)
}

export default page