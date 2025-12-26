"use client"
import { useRouter } from 'next/navigation'
import styles from './password-reset.module.css'

export default function PasswordReset() {

    const router = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.ResetCodeBox}>
                <h2>Password reset</h2>
                <p>Your password has been successfully reset.click <br></br>
                    confirm to set a new password.</p>

                <button type="button" onClick={() => {
                    router.push("./new-password")
                }}>Confirm</button>
            </div>
        </div>
    )
}