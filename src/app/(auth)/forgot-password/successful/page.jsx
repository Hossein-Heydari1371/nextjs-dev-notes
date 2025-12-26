
"use client"

import Link from 'next/link'
import styles from './successful.module.css'

export default function SuccessfulPage() {
    return (
        <div className={styles.container}>
            <div className={styles.successCard}>
                {/* دایره آبی با تیک */}
                <div className={styles.successCircle}>
                    <div className={styles.checkmark}>✓</div>
                </div>
                
                <h1 className={styles.title}>Password Updated!</h1>
                
                <p className={styles.message}>
                    Your password has been successfully updated.
                    You can now login with your new password.
                </p>
                
                <div className={styles.actions}>
                    <Link href="/login" className={styles.loginBtn}>
                        Back to Login
                    </Link>
                    
                    <Link href="/" className={styles.homeBtn}>
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}