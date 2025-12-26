"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from "./new-password.module.css"

export default function NewPassword() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const submitHandler = (e) => {
        e?.preventDefault() // اگر از form استفاده کنی
        
        setError('')
        
        if (!password || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }
        
        if (password.length < 6) {
            setError("Password must be at least 6 characters!")
            return
        }
        
        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }
        
        // پاکسازی
        setPassword('')
        setConfirmPassword('')
        localStorage.removeItem('code')
        localStorage.removeItem('resetEmail')
        
        // در واقعیت: اینجا API call می‌زنی
        console.log('Password changed to:', password)
        
        router.push('./successful')
    }

    return (
        <div className={styles.container}>
            <div className={styles.codeBox}>
                <h2>Set a new password</h2>
                <p>Create a new password...</p>
                
                {error && (
                    <div className={styles.error}>{error}</div>
                )}
                
                <form  onSubmit={submitHandler}>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <input 
                            type="password"
                            value={confirmPassword}
                            autoComplete="new-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                    
                    <button type="submit" className={styles.submitBtn}>
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    )
}