import styles from "./HelloWorld.module.css"
import Image from 'next/image'

export default function TextPage() {
    return (
        <div className={styles.container}>
            <h1>Hello World</h1>
            <h4 className={styles.update}>Last Updated : 26 Aug, 2025</h4>
            <p>
                A “<b>Hello, world</b>!” program is a computer program that outputs or displays “Hello, world!” to a <br></br>
                user. Being a very simple program in most programming languages, it is often used to illus- <br></br>
                trate the basic syntax of a programming language for a working program, and as such is of-<br></br>
                ten the very first program people write.[1]
            </p>

            <h2>Discussion</h2>
            <p
            >A “Hello, world!” program is traditionally used to introduce novice programmers to a pro-<br></br>
                gramming language. “Hello, world!” is also traditionally used in a sanity test to make sure<br></br>
                that a computer language is correctly installed, and that the operator understands how to<br></br>
                use it.[2]
            </p>

            <p>
                he tradition of using the phrase “Hello, world!” as a test message was influenced by an exam-<br></br>
                ple program in the seminal book The C Programming Language. The example program<br></br>
                from that book prints “hello, world” (without capital letters or exclamation mark), and was in-<br></br>
                herited from a 1974 Bell Laboratories internal memorandum by Brian Kernighan.[3]
            </p>

            <p>
                In addition to displaying “Hello, world!”, a “Hello, world!” program might include comments.<br></br>
                A <b>comment</b> is a programmer-readable explanation or annotation in the source code of a<br></br>
                computer program. They are added with the purpose of making the source code easier for<br></br>
                humans to understand, and are generally ignored by compilers and interpreters. The syntax<br></br>
                of comments in various programming languages varies considerably.[4]
            </p>

            <h2 >Pseudocode</h2>
            <div className={styles.pseudocode}>
                <b>Function Main</b><br></br>
                <b>... This program displays "Hello world!"</b><br></br>
                <b>Output "Hello world!"</b><br></br>
                <b>End</b>
            </div>
            <br></br>

            <h2>Output</h2>
            <div className={styles.output}><b>Hello world!</b></div>
            <br></br>

            <h2>Flowchart</h2>
            <Image
                src="/images/HelloWorld.png"
                alt="Hello World"
                width={500}
                height={235}
                className={styles.flowchart}
            />
        </div>
    )
}