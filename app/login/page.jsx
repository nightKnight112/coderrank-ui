"use client";
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import styles from "./page.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { userLogin, userRegistration } from '@/utils/apiFile';
import { useRouter } from 'next/navigation';

const page = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const formRef = useRef();

    const router = useRouter();

    function onLoginClick() {
        const formData = formRef.current;
        let reqBody = {
            "user_alias": formData.elements["user_alias"].value,
            "password": formData.elements["password"].value
        }
        const loggedIn = userLogin(reqBody)
        if (loggedIn) {
            router.push('/home/code')
        }
    }

    const onRegistrationClick = () => {
        const formData = formRef.current
        const reqBody = {
            "full_name": formData.elements['full_name'].value,
            "user_alias": formData.elements['user_alias'].value,
            "user_password": formData.elements['user_password'].value,
            "phone_no": formData.elements['phone_no'].value,
            "email": formData.elements['email'].value
        }

        console.log(reqBody);
        const isRegistrationSuccessful = userRegistration(reqBody);
        if (isRegistrationSuccessful) {
            // alert('Successfully Registered User, Please Login')
            setDisplaySuccess(true)
        } else {
            // alert('Registration Failed, Please Try Again')
            setDisplayError(true)
        }
        formData.reset()
    }

    return (
        <>
            {/* Hero Section */}
            {displaySuccess && (
                <Snackbar
                    open={displaySuccess}
                    autoHideDuration={3000}
                    onClose={(e) => setDisplaySuccess(false)}
                >
                    <Alert variant="filled" severity="success">
                        User Registration Successful, please continue to login
                    </Alert>
                </Snackbar>
            )}

            {displayError && (
                <Snackbar
                    open={displayError}
                    autoHideDuration={3000}
                    onClose={(e) => setDisplayError(false)}
                >
                    <Alert variant="filled" severity="error">
                        User Registration Unsuccessful, please try again or contact your admin
                    </Alert>
                </Snackbar>
            )}
            <Box className={styles.codeAnimation}>
                {isLogin ?
                    <>
                        <Box className={styles.loginContainer}>
                            <Typography variant="h5" className={styles.heading}>Login</Typography>
                            <form className={styles.form} ref={formRef}>
                                <TextField size="small" placeholder="Username" name="user_alias" sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />

                                <TextField size="small" type="password" placeholder="Password" name="password" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <Button variant="contained" color="success" onClick={onLoginClick}>Login</Button>
                            </form>

                            <Typography>Or login with</Typography>
                            <Box className={styles.socialButtons}>
                                <Button className={styles.googleButton}><GoogleIcon /></Button>
                                <Button className={styles.facebookButton}><FacebookIcon /></Button>
                                <Button className={styles.githubButton}><GitHubIcon /></Button>
                            </Box>

                            <Typography className={styles.signUpText}>
                                Don’t have an account? <a className={styles.signUpLink} onClick={(e) => { setIsLogin(false) }}>Sign Up</a>
                            </Typography>
                        </Box>
                    </> : <>
                        <Box className={styles.loginContainer}>
                            <Typography variant="h5" className={styles.heading}>Sign Up</Typography>
                            <form className={styles.form} ref={formRef}>
                                <TextField size="small" placeholder="Name" name="full_name" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <TextField size="small" placeholder="Username" name="user_alias" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <TextField size="small" type="number" placeholder="Phone Number" name="phone_no" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <TextField size="small" type="email" placeholder="Email" name="email" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <TextField size="small" type="password" placeholder="Password" name="user_password" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <TextField size="small" type="password" placeholder="Confirm Password" sx={{

                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '6px',
                                        '& fieldset': {
                                            borderRadius: '6px',
                                        },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: '6px',
                                        color: "white",
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }} />
                                <Button variant="contained" color="success" onClick={onRegistrationClick}>Sign Up</Button>
                            </form>
                            <Box className={styles.socialLogin}>
                                <Typography>Or Sign Up with</Typography>
                                <Box className={styles.socialButtons}>
                                    <Button className={styles.googleButton}><GoogleIcon /></Button>
                                    <Button className={styles.facebookButton}><FacebookIcon /></Button>
                                    <Button className={styles.githubButton}><GitHubIcon /></Button>
                                </Box>
                            </Box>
                            <Typography className={styles.signUpText}>
                                Already have an account? <a className={styles.signUpLink} onClick={(e) => { setIsLogin(true) }}>Login</a>
                            </Typography>
                        </Box>
                    </>}
            </Box>
        </>
    )
}

export default page