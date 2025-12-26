"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./verify-code.module.css"
import Link from "next/link"

export default function VerifyCodePage() {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState(['','','','',''])
    const inputRef = useRef([])

    const handleCodeChange = (index , value) =>{
        const newCode = [...code]; //create new code
        newCode[index] = value; // مقدار جدید بزار سر جاش
        setCode(newCode) // state را آپدیت کن


        if(value && index < 4){
                    inputRef.current[index + 1].focus();
                }
    }


   const isCompletedCode = code.every(digit => digit !== '');

    useEffect(() => {
        const savedEmail = localStorage.getItem('email')

        if (savedEmail) {
            setEmail(savedEmail)
            console.log('ایمیل دریافتی از localStorage: ', savedEmail)

        }

        // setTimeout(() =>{
        //     localStorage.removeItem('resetEmail')
        // }, 2000)
    }, [])

    
    return (
        <div className={styles.container}>
            <div className={styles.VerifyCodeBox}>
                <h2>Check Your Email</h2>
                {email && <p>we sent a reset link to <b>{email}</b> <br></br>
                    enter 5 digit code that mentioned in the email
                </p>}

                <div className={styles.codeInputs}>
                    {[0,1,2,3,4].map((index) =>(
                        <input type="text"
                         key={index} 
                         ref={(el) => inputRef.current[index] = el}
                         maxLength={1} 
                         value={code[index]} 
                         onChange={(e) => handleCodeChange (index, e.target.value)}
                         ></input>
                    ))}
                </div>

                

                {isCompletedCode ? (
                    <Link href="./password-reset" className={styles.verifyCodeActive} onClick={() =>{
                        localStorage.setItem('code',code.join(''))
                        }}> Verify Code
                    </Link>

                ):(
                    // <span className={styles.verifyCodeDisActive}> Verify Code</span>
                     <button 
                         className={styles.verifyCodeDisActive}
                         disabled
                     >
                         Verify Code
                     </button>
                )
            }

            <div className={styles.resendCode}>
                <p>Haven't got the email yet? <ins>Resend email</ins></p>
            </div>
            </div>
        </div>

    )
}


// "use client"
// import { useEffect, useState } from "react"
// import styles from "./verify-code.module.css"
// import Link from "next/link"

// export default function VerifyCodePage() {
//     const [email, setEmail] = useState('')
//     const [code, setCode] = useState(['', '', '', '', '']) // آرایه ۵ خونه

//     useEffect(() => {
//         const savedEmail = localStorage.getItem('email')
//         if (savedEmail) setEmail(savedEmail)
//     }, [])

//     // تابع برای تغییر هر رقم
//     const handleCodeChange = (index, value) => {
//         // فقط اعداد قبول کن
//         if (!/^\d*$/.test(value)) return
        
//         const newCode = [...code]
//         newCode[index] = value
//         setCode(newCode)
        
//         // اگر رقم وارد شد، به input بعدی فوکوس کن
//         if (value && index < 4) {
//             document.getElementById(`code-${index + 1}`).focus()
//         }
//     }

//     // چک کنه آیا همه ۵ رقم پر شده
//     const isCodeComplete = code.every(digit => digit !== '')

//     return (
//         <div className={styles.container}>
//             <div className={styles.VerifyCodeBox}>
//                 <h2>Check Your Email</h2>
//                 {email && (
//                     <p>we sent a reset link to {email} <br />
//                        enter 5 digit code that mentioned in the email
//                     </p>
//                 )}

//                 <div className={styles.codeInputs}>
//                     {[0, 1, 2, 3, 4].map((index) => (
//                         <input
//                             key={index}
//                             id={`code-${index}`}
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={code[index]}
//                             onChange={(e) => handleCodeChange(index, e.target.value)}
//                             className={styles.codeInput}
//                             autoFocus={index === 0}
//                         />
//                     ))}
//                 </div>

//                 {isCodeComplete ? (
//                     <Link 
//                         href="/forgot-password/password-reset" 
//                         className={styles.verifyCodeActive}
//                         onClick={() => {
//                             localStorage.setItem('code', code.join('')) // آرایه رو به رشته تبدیل کن
//                         }}
//                     >
//                         Verify Code
//                     </Link>
//                 ) : (
//                     <button 
//                         className={styles.verifyCodeDisActive}
//                         disabled
//                     >
//                         Verify Code
//                     </button>
//                 )}

//                 <div className={styles.resendCode}>
//                     <p>Haven't got the email yet? <ins>Resend email</ins></p>
//                 </div>
//             </div>
//         </div>
//     )
// }