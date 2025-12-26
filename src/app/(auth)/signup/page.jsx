// app/signup/page.jsx
"use client"

import { FcGoogle } from 'react-icons/fc';
import styles from "./signup.module.css"
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/lib/auth-context';

export default function SignupPage() {
    const formRef = useRef()
    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { signup } = useAuth(); // استفاده از signup به جای login

    const clickHandler = async (event) => {
        event.preventDefault();
        setError('');

        const form = formRef.current;
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const confirmPassword = form.confirmPassword?.value.trim();

        // Validation مخصوص Signup
        if (!email || !password) {
            setError("Please fill in all required fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        // تأیید رمز عبور (مخصوص Signup)
        if (confirmPassword && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            // استفاده از تابع signup از context
            const result = await signup({
                email: email,
                password: password, // در واقعیت این رو به سرور می‌فرستی
                name: email.split('@')[0]
            });

            if (result.success) {
                console.log('Signup successful:', email);
                
                // بعد از ثبت نام موفق، به صفحه تأیید ایمیل یا تکمیل پروفایل برو
                router.push('/verify-email?email=' + encodeURIComponent(email));
                
                // یا اگر auto-login می‌خوای:
                // window.location.href = '/welcome'; // صفحه خوش‌آمدگویی
            } else {
                setError(result.error || 'Signup failed. Please try again.');
            }
            
        } catch (err) {
            console.error('Signup error:', err);
            setError('An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.signupPageContainer}>
            <div className={styles.signupBox}>
                <h1 className={styles.title}>Create an account</h1>
                
                {error && (
                    <div className={styles.errorMessage}>
                        ⚠️ {error}
                    </div>
                )}
                
                <form onSubmit={clickHandler} ref={formRef} className={styles.form}>
                    <h2>Email</h2>
                    <input 
                        type="email" 
                        name="email" 
                        className={styles.inputField} 
                        placeholder="Type Your Email" 
                        required
                        disabled={isLoading}
                    />
                    
                    <h2>Password</h2>
                    <input 
                        type="password" 
                        name="password" 
                        className={styles.inputField} 
                        placeholder="Type Your Password" 
                        required
                        minLength="6"
                        disabled={isLoading}
                    />
                    
                    {/* فیلد تأیید رمز عبور (مخصوص Signup) */}
                    <h2>Confirm Password</h2>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        className={styles.inputField} 
                        placeholder="Confirm Your Password" 
                        required
                        minLength="6"
                        disabled={isLoading}
                    />
                    
                    <button 
                        type='submit' 
                        className={styles.submitBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    
                    <div className={styles.divider}>
                        <span>or</span>
                    </div>
                    
                    <button 
                        type='button' 
                        className={styles.googleBtn}
                        disabled={isLoading}
                    >
                        <FcGoogle size={20} className={styles.googleIcon} />
                        Sign up with Google
                    </button>

                    <p className={styles.loginLink}>
                        Already have an account?{' '}
                        <a 
                            href="/login" 
                            onClick={(e) => {
                                e.preventDefault();
                                router.push('/login');
                            }}
                        >
                            Log in
                        </a>
                    </p>
                    
                    {/* شرایط و ضوابط (مخصوص Signup) */}
                    <p className={styles.terms}>
                        By signing up, you agree to our{' '}
                        <a href="/terms">Terms of Service</a> and{' '}
                        <a href="/privacy">Privacy Policy</a>
                    </p>
                </form>
            </div>
        </div>
    )
}