"use client";
import { Box, Button, MenuItem, Select, Switch, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from "./page.module.css"
import { Add, Info } from '@mui/icons-material';

const page = () => {

    const [problemStatementTitle, setProblemStatementTitle] = useState("");
    const [problemStatementBody, setProblemStatementBody] = useState("");
    const [problemStatementDuration, setProblemStatementDuration] = useState(0);
    const [problemStatementTags, setProblemStatementTags] = useState("");
    const [problemStatementDifficulty, setProblemStatementDifficulty] = useState("");
    const [problemStatementTestCases, setProblemStatementTestCases] = useState([{ "input": "", "expectedOutput": "", "testCaseWeightage": 1, "isHidden": false }]);



    const handleChangeTestCase = (value, fieldName, index) => {
        let temp = [...problemStatementTestCases];
        temp[index][fieldName] = value;
        console.log(temp);
        setProblemStatementTestCases(temp);
    }

    return (
        <Box className={styles.main_container} sx={{ backgroundColor: "background", color: "textColor" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>Add Problem Statement</Typography>

            <Box className={styles.details_container} sx={{ backgroundColor: "secondaryBackground" }}>
                <Box>
                    <Typography sx={{ fontWeight: "bold" }}>Title</Typography>
                    <TextField sx={{ width: "100%" }} size='small' value={problemStatementTitle} onChange={(e) => setProblemStatementTitle(e.target.value)} />
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: "bold" }}>Body</Typography>
                    <TextField sx={{ width: "100%" }} size='small' multiline value={problemStatementBody} onChange={(e) => setProblemStatementBody(e.target.value)} />
                </Box>

                <Box sx={{ display: "flex", gap: "10px" }}>
                    <Box sx={{ width: "50%" }}>
                        <Typography sx={{ fontWeight: "bold" }}>Difficulty</Typography>
                        <Select sx={{ width: "100%" }} size='small' value={problemStatementDifficulty} onChange={(e) => setProblemStatementDifficulty(e.target.value)} inputProps={{
                            MenuProps: {
                                MenuListProps: {
                                    sx: {
                                        backgroundColor: 'background'
                                    }
                                }
                            }
                        }}>
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ width: "50%" }}>
                        <Typography sx={{ fontWeight: "bold" }}>Duration</Typography>
                        <TextField sx={{ width: "100%" }} size='small' type="number" value={problemStatementDuration} onChange={(e) => setProblemStatementDuration(e.target.value)} />
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        <Typography sx={{ fontWeight: "bold" }}>Tags</Typography>
                        <Tooltip title="Type tags separated by commas without any spaces. For eg. Arrays,Queue,Recursion" placement='right' arrow>
                            <Info />
                        </Tooltip>
                    </Box>
                    <TextField sx={{ width: "100%" }} size="small" value={problemStatementTags} onChange={(e) => setProblemStatementTags(e.target.value)} />
                </Box>

                {problemStatementTestCases?.map((r, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Typography sx={{ fontWeight: "bold" }} variant="h6">Test Case 1</Typography>

                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Input</Typography>
                                <TextField sx={{ width: "100%" }} multiline size="small" value={r?.input} onChange={(e) => handleChangeTestCase(e.target.value, "input", i)} />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Expected Output</Typography>
                                <TextField sx={{ width: "100%" }} size="small" multiline value={r?.expectedOutput} onChange={(e) => handleChangeTestCase(e.target.value, "expectedOutput", i)} />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Weightage</Typography>
                                <TextField sx={{ width: "100%" }} size="small" type="number" value={r?.testCaseWeightage} onChange={(e) => handleChangeTestCase(e.target.value, "testCaseWeightage", i)} />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Hide Test Case?</Typography>
                                <Switch checked={r?.isHidden} onChange={() => handleChangeTestCase(!r?.isHidden, "isHidden", i)} />
                            </Box>
                        </React.Fragment>
                    )
                })}

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button sx={{ fontWeight: "bold" }} variant="contained"><Add /> Add Test Case</Button>
                </Box>
            </Box>


        </Box>
    )
}

export default page