import SliderImage from '../../../components/slider'
import styles from "./nextjs.module.css"

export default function TextPage() {
    return (
        <div>
            <h1 className={styles.header}>Next.js Tutorial</h1>
            <h4 className={styles.update}>Last Updated : 26 Aug, 2025</h4>

            <div className={styles.content}>
                <p>
                    Next.js is a powerful React framework for building fast, scalable, and SEO-friendly<br></br>
                    web applications. It provides built-in features like server-side rendering, static site<br></br>
                    generation, routing, and API handling to make development easier and production-<br></br>
                    ready. It's:
                </p>

                <ul>
                    <li>Built on React, making it easier to create modern, component-driven UIs.</li>
                    <br />
                    <li>Server-Side Rendering (SSR) & Static Site Generation (SSG) improves SEO and<br></br>
                        performance by pre-rendering pages.</li>
                    <br />
                    <li>Offers automatic bundling, code splitting, and asset optimization.</li>
                    <br />
                    <li>Suitable for both small projects and enterprise-grade applications with full-<br></br>
                        stack support.</li>
                    <br />
                </ul>
                <SliderImage />

                <h2>Why learn Next.js?</h2>
                <p>Next.js offers several advantages over traditional React development:</p>
                <ul>
                    <li><b>Full-Stack Capabilities</b> – Build frontend + backend APIs in one framework.</li>
                    <br />
                    <li><b>Performance</b> – Includes optimizations like code splitting, image handling, and<br></br>
                        caching by default..</li>
                    <br />
                    <li><b>Industry Demand</b> – Used by top companies (Netflix, TikTok, Uber, etc.).</li>
                    <br />
                    <li><b>Future-Proof</b> – Backed by Vercel and rapidly evolving with strong community<br></br>
                        support.</li>
                </ul>

            </div>
        </div>
    )
}