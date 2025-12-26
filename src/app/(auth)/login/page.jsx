// app/login/page.jsx
"use client"

import Link from 'next/link';
import styles from "./login.module.css"
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context'; // این خط رو اضافه کن

export default function LoginPage() {

    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth(); // این خط رو اضافه کن - گرفتن تابع login از context

    const clickHandler = (event) => {
        event.preventDefault()
        setError('')

        const form = event.target;
        const email = form.email.value.trim()
        const password = form.password.value.trim()

        //validation check

        if (!email || !password) {
            setError("Please fill in both in email and password");
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address")
            return // اینجا return فراموش شده بود
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return // اینجا return فراموش شده بود
        }

        //end validation

        setIsLoading(true)

        setTimeout(() => {
            try {
                // ایجاد userData
                const userData = {
                    email: email,
                    name: email.split('@')[0], // از ایمیل نام می‌سازیم
                    id: Date.now()
                };

                // استفاده از تابع login از context (این مهمه!)
                login(userData);

                console.log('Login successful:', email);

                // Redirect به صفحه اصلی با هارد رفرش
                window.location.href = '/';
                
                // یا اگر می‌خوای بدون رفرش بری:
                // router.push('/');
                // setTimeout(() => {
                //     router.refresh();
                // }, 100);

            } catch (err) {
                console.error('Login error:', err);
                setError('Login failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }, 1000); // ۱ ثانیه delay
    }

    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Login</h1>

                {/* ⭐ نمایش خطا */}
                {error && (
                    <div className={styles.errorMessage}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={clickHandler} className={styles.from}>
                    <input
                        type="email"
                        name="email"
                        className={styles.inputField}
                        placeholder=" 👤 Type Your Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className={styles.inputField}
                        placeholder=" 🔒 Type Your Password"
                        required
                        minLength="6"
                    />

                    <button
                        type='submit'
                        className={styles.submitBtn}
                        disabled={isLoading} // غیرفعال موقع loading
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className={styles.links}>
                    <Link href="/forgot-password" className={styles.forgotLink}>
                        Forgot Password?
                    </Link>
                </div>

                <h2>or Sign Up Using</h2>
                <div className={styles.socialButtons}>
                    <a href="https://facebook.com" className={`${styles.socialBtn} ${styles.facebookBtn}`} target='_blank' rel='noopener noreferrer'>
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" className={`${styles.socialBtn} ${styles.twitterBtn}`} target='_blank' rel='noopener noreferrer'>
                        <FaTwitter />
                    </a>
                    <a href="https://google.com" className={`${styles.socialBtn} ${styles.googleBtn}`} target='_blank' rel='noopener noreferrer'>
                        <FaGoogle />
                    </a>
                </div>

                <h2>or Sign Up Using</h2>
                <div className={styles.signupLink}>
                    <Link href="/signup" className={styles.signupPage}>SIGN UP</Link>
                </div>
            </div>
        </div>
    )
}