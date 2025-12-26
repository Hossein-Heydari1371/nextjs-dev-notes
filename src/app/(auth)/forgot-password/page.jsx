"use client"


import Link from "next/link";
import styles from "./forgot-password.module.css"
import { useState } from "react";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState('')
    

    return (
        <div className={styles.forgotPasswordContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Forgot Password</h2>

                <p>Please enter your email to reset the password</p>
                <h3>Your Email</h3>
                <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                {email ? (
                    <Link href="/forgot-password/verify-code" className={styles.activeBtn} onClick={() => {
                        localStorage.setItem('email', email);
                        console.log('ایمیل ذخیره شده:', email);
                    }
                    }>
                        Reset Password
                    </Link>
                ) : (
                    <span className={styles.disabledBtn}> Reset Password</span>
                )
                }

            </div>
        </div>
    )
}