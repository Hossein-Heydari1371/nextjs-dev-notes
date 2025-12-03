import styles from "./ai.module.css"
import Image from 'next/image'


export default function TextPage() {
    return (
        <div>
            <h1 className={styles.ai_header}>What Is Artificial Intelligence? Definition, Uses, and Types</h1>
            <h4 className={styles.update}>Last Updated : 26 Aug, 2025</h4>
            <Image
                src="/images/ai-5.webp"
                alt="Artificial Intelligence"
                width={500}
                height={235}
                className={styles.imageContainer}
            />
            <div className={styles.content}>
                <p>
                    Artificial intelligence (AI) refers to computer systems capable of performing complex tasks that historically only<br></br>
                    humans could do, such as reasoning, making decisions, or solving problems.At a glance, here's what you need to <br></br>
                    know about artificial intelligence:
                </p>
                <br></br>
                <ul>
                    <li>Today,the term “AI” describes a wide range of technologies that power many<br></br>
                        of the services and goods we use every day – from apps that recommend TV<br></br>
                        shows to chatbots that provide customer support in real time.</li>
                    <br></br>
                    <li>
                        Machine learning is the most common form of artificial intelligence used<br></br>
                        today.
                    </li>
                    <br></br>
                    <li
                    >   As AI becomes more interwoven into our modern world, knowing how it works<br></br>
                        and how to use it can help you better leverage the technology at work and<br></br>
                        in your personal life.
                    </li>
                </ul>
                <br></br>
                <p className={styles.content}>
                    In this article, you’ll learn more about artificial intelligence, what it actually does, and the different types-<br></br>
                    . You’ll also learn about some of its benefits and dangers and explore flexible courses that can help you expand<br></br>
                    your knowledge of AI even further. If you're ready to start building your AI skills, consider enrolling in the IBM<br></br>
                    AI Foundations for Everyone Specialization, where you'll gain a firm understanding of what AI is, its applications<br></br>
                    ,and use cases acrossvarious industries.<br></br>

                </p>
            </div>
        </div >
    )
}