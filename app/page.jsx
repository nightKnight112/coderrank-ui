"use client";
import React, { useState } from 'react'
import Editor from '@monaco-editor/react';
import styles from "./page.module.css"
import axios from 'axios';

const page = () => {
	const [code, setCode] = useState("");
	const [output, setOutput] = useState("");

	const handleCodeChange = (value, event) => {
		setCode(value);
	}

	const runCode = () => {
		axios.post(`${process.env.NEXT_PUBLIC_API_URL}/execute`, code, {
			headers: {
				"Content-Type": "text/plain"
			}
		}).then((res) => {
			setOutput(res?.data);
		})
	}
	return (
		<div className={styles.main_container}>
			<div className={styles.editor}>
				<Editor defaultLanguage="java" defaultValue="// some comment" theme='vs-dark' onChange={handleCodeChange} />
			</div>

			<div className={styles.output}>
				<button onClick={runCode}>Run</button>
				<div>
					{output}
				</div>
			</div>
		</div>
	)
}

export default page