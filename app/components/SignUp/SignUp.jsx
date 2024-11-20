import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import styles from "./SignUp.module.css";
import { api } from '@/utils/apiFile';
const SignUp = ({ setIsLogin, setIsError, setMessage, setOpen }) => {
    const formRef = useRef();

    const isValid = (formData) => {
        for (let i of formData) {
            if (i.value === "") {
                console.log(i)
                return { "status": false, "errorMessage": "Please fill up all the required fields" };
            }
        }

        const { phone_no, email, user_password, confirm_password } = formData;

        if (phone_no.value.length !== 10) {
            return { "status": false, "errorMessage": "Invalid phone number" };
        }

        if (!email.value.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            return { "status": false, "errorMessage": "Invalid email" }
        }

        if (user_password.value !== confirm_password.value)
            return { "status": false, "errorMessage": "Passwords not matching" }

        return { "status": true, "errorMessage": "" }

    }

    const onRegistrationClick = () => {
        const formData = formRef.current.elements;
        const { status, errorMessage } = isValid(formData);
        if (!status) {
            setIsError(true);
            setMessage(errorMessage);
            setOpen(true);
        }
        else {
            const reqBody = {
                "full_name": formData['full_name'].value,
                "user_alias": formData['user_alias'].value,
                "user_password": formData['user_password'].value,
                "phone_no": formData['phone_no'].value,
                "email": formData['email'].value
            }

            api.post("/register-user", reqBody).then((res) => {
                setIsError(false);
                setMessage(res?.data?.message);
                setOpen(true);
                formRef.current.reset();
                setIsLogin(true);
            })
                .catch((err) => {
                    setIsError(true);
                    setMessage(err?.response?.data?.message);
                    setOpen(true);
                })
        }
    }

    return (
        <>
            <Box className={styles.loginContainer}>
                <Typography variant="h5" className={styles.heading}>Sign Up</Typography>
                <form className={styles.form} ref={formRef} onKeyUp={(e) => {
                    if (e.key === "Enter")
                        onRegistrationClick();
                }
                }>
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
                    <TextField size="small" type="password" placeholder="Confirm Password" name="confirm_password" sx={{

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
                    <Button value="submit" variant="contained" color="success" onClick={onRegistrationClick}>Sign Up</Button>
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
        </>
    )
}

export default SignUp