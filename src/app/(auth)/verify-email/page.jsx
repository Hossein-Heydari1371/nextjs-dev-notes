// app/verify-email/page.jsx
"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import styles from './verify-email.module.css'; // اگر CSS داری

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60); // تایمر 60 ثانیه

  useEffect(() => {
    // گرفتن ایمیل از URL
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    // تایمر برای ارسال مجدد کد
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // رفتن به اینپوت بعدی
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // در واقعیت اینجا API call برای تأیید کد
      // const response = await fetch('/api/verify-email', {...});
      
      // شبیه‌سازی
      const result = await verifyEmail(verificationCode);
      
      if (result.success) {
        setMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          router.push('./');
        }, 2000);
      } else {
        setError(result.error || 'Verification failed');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (timer > 0) return;
    
    // در واقعیت اینجا API call برای ارسال مجدد کد
    console.log('Resending code to:', email);
    setMessage('Verification code sent!');
    setTimer(60); // ریست تایمر
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify Your Email</h1>
        
        <p className={styles.subtitle}>
          We sent a 6-digit verification code to:
          <br />
          <strong>{email}</strong>
        </p>
        
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}
        
        {message && (
          <div className={styles.success}>
            ✅ {message}
          </div>
        )}
        
        <div className={styles.codeContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className={styles.codeInput}
              disabled={isLoading}
            />
          ))}
        </div>
        
        <button
          onClick={handleVerify}
          disabled={isLoading || code.join('').length !== 6}
          className={styles.verifyButton}
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
        
        <div className={styles.resendContainer}>
          <p>
            Didn't receive the code?{' '}
            <button
              onClick={handleResendCode}
              disabled={timer > 0}
              className={styles.resendButton}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
            </button>
          </p>
        </div>
        
        <p className={styles.footer}>
          Check your spam folder if you don't see the email.
        </p>
      </div>
    </div>
  );
}