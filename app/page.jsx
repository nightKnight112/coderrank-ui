"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./page.module.css";
import Typewriter from 'typewriter-effect';
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const page = () => {

    const [isLogin, setIsLogin] = useState(true);

    return(
        <>
            <div className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={styles.heroText}
            >
                <h1>CoderRank</h1>
                <h1>
                    <Typewriter
                    options={{
                        strings: ['Code for a Brighter Tommorow', 'Create new and innovative solutions', 'Collaborate on different platforms'],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 10,
                    }}
                    />
                </h1>
                <p>
                Learn to code, solve real-world problems, and join a global
                community.
                </p>
            </motion.div>

            {/* Coding Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className={styles.codeAnimation}
            >
                {isLogin?
                    <>
                        <div className={styles.loginContainer}>
                            <h2 className={styles.heading}>Login</h2>
                            <form className={styles.form}>
                                <input type="email" placeholder="Email" className={styles.input} />
                                <input type="password" placeholder="Password" className={styles.input} />
                                <button className={styles.loginButton}>Login</button>
                            </form>
                            <div className={styles.socialLogin}>
                                <p>Or login with</p>
                                <div className={styles.socialButtons}>
                                    <button className={styles.googleButton}><GoogleIcon/></button>
                                    <button className={styles.facebookButton}><FacebookIcon /></button>
                                    <button className={styles.githubButton}><GitHubIcon /></button>
                                </div>
                            </div>
                            <p className={styles.signUpText}>
                                Don’t have an account? <a className={styles.signUpLink} onClick={(e)=>{setIsLogin(false)}}>Sign Up</a>
                            </p>
                        </div>
                    </>:<>
                        <div className={styles.loginContainer}>
                            <h2 className={styles.heading}>Sign Up</h2>
                            <form className={styles.form}>
                                <input placeholder="Name" className={styles.input} />
                                <input type="number" placeholder="Phone Number" className={styles.input} />
                                <input type="email" placeholder="Email" className={styles.input} />
                                <input type="password" placeholder="Password" className={styles.input} />
                                <input type="password" placeholder="Confirm Password" className={styles.input} />
                                <button className={styles.loginButton}>Sign Up</button>
                            </form>
                            <div className={styles.socialLogin}>
                                <p>Or Sign Up with</p>
                                <div className={styles.socialButtons}>
                                    <button className={styles.googleButton}><GoogleIcon/></button>
                                    <button className={styles.facebookButton}><FacebookIcon /></button>
                                    <button className={styles.githubButton}><GitHubIcon /></button>
                                </div>
                            </div>
                            <p className={styles.signUpText}>
                                Already have an account? <a href="#" className={styles.signUpLink} onClick={(e)=>{setIsLogin(true)}}>Login</a>
                            </p>
                        </div>
                    </>}
            </motion.div>
            </section>

            {/* About Us Section */}
            <section className={styles.about}>
            <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
            >
                <h2>Salient Features</h2>
                <p>For beginners to pros, we've got everything you need to grow.</p>
                <div className={styles.cardsAbout}>
                    <motion.div
                    className={styles.card}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Highly Modular</h3>
                        <p>Customize the platform according to your needs.</p>
                    </motion.div>

                    <motion.div
                    className={styles.card}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Vast Language Support</h3>
                        <p>Supports all major programming languages, with a future scope to add more</p>
                    </motion.div>

                    <motion.div
                    className={styles.card}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Open-Source</h3>
                        <p>For all the developers out there, tinker as you like</p>
                    </motion.div>
            </div>
            </motion.div>
            </section>

            {/* Courses Section */}
            <section id="courses" className={styles.courses}>
            <h2>Supported Languages</h2>
            <div className={styles.cards}>
                <motion.div
                className={styles.card}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                >
                <h3>Java</h3>
                <p>Java is a versatile, object-oriented programming language designed for cross-platform compatibility and high performance.</p>
                </motion.div>

                <motion.div
                className={styles.card}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                >
                <h3>Python</h3>
                <p>Python is a dynamic, high-level programming language known for its simplicity, readability, and versatility in various domains.</p>
                </motion.div>
            </div>
            </section>
        </div>
        </>
    )

}

export default page;