import Link from 'next/link'
import styles from './about.module.css'


export default function AboutContent() {
    return (
        <>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>About Tech Blog</h1>
                <p className={styles.heroSubtitle}>
                    Empowering developers and tech enthusiasts with quality content since 2024
                </p>
            </section>

            {/* Mission Section */}
            <section className={styles.section}>
                <div className={styles.content}>
                    <h2 className={styles.sectionTitle}>Our Mission</h2>
                    <p className={styles.sectionText}>
                        At Tech Blog, we believe that knowledge should be accessible to everyone.
                        Our mission is to break down complex technical concepts into easy-to-understand
                        tutorials, guides, and articles that help developers at all levels grow their skills.
                    </p>
                    <p className={styles.sectionText}>
                        We're passionate about technology and committed to creating a community
                        where developers can learn, share, and grow together.
                    </p>
                </div>
                <div className={styles.imagePlaceholder}>
                    <span>🎯</span>
                </div>
            </section>

            {/* What We Offer */}
            <section className={styles.sectionAlt}>
                <h2 className={styles.sectionTitle}>What We Offer</h2>
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>📚</div>
                        <h3 className={styles.featureTitle}>Free Tutorials</h3>
                        <p className={styles.featureText}>
                            Step-by-step tutorials covering programming languages, frameworks, and tools.
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>🚀</div>
                        <h3 className={styles.featureTitle}>Project Guides</h3>
                        <p className={styles.featureText}>
                            Real-world projects to help you apply what you've learned and build your portfolio.
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>💡</div>
                        <h3 className={styles.featureTitle}>Tech Insights</h3>
                        <p className={styles.featureText}>
                            Latest trends, best practices, and industry insights to keep you updated.
                        </p>
                    </div>
                </div>
            </section>

            {/* For Whom */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Who Is This For?</h2>
                <div className={styles.audience}>
                    <div className={styles.audienceCard}>
                        <h3 className={styles.audienceTitle}>👶 Beginners</h3>
                        <ul className={styles.audienceList}>
                            <li>Starting your programming journey</li>
                            <li>Looking for foundational concepts</li>
                            <li>Need clear, simple explanations</li>
                        </ul>
                    </div>
                    <div className={styles.audienceCard}>
                        <h3 className={styles.audienceTitle}>👨‍💻 Intermediate Developers</h3>
                        <ul className={styles.audienceList}>
                            <li>Wanting to learn new technologies</li>
                            <li>Looking to improve existing skills</li>
                            <li>Preparing for job interviews</li>
                        </ul>
                    </div>
                    <div className={styles.audienceCard}>
                        <h3 className={styles.audienceTitle}>👴 Seasoned Professionals</h3>
                        <ul className={styles.audienceList}>
                            <li>Staying updated with latest trends</li>
                            <li>Exploring new frameworks and tools</li>
                            <li>Sharing knowledge with community</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className={styles.sectionAlt}>
                <h2 className={styles.sectionTitle}>Why Choose Tech Blog?</h2>
                <div className={styles.benefits}>
                    <div className={styles.benefit}>
                        <div className={styles.benefitNumber}>1</div>
                        <div>
                            <h3 className={styles.benefitTitle}>100% Free</h3>
                            <p>All our content is completely free. No subscriptions, no paywalls.</p>
                        </div>
                    </div>
                    <div className={styles.benefit}>
                        <div className={styles.benefitNumber}>2</div>
                        <div>
                            <h3 className={styles.benefitTitle}>Quality Content</h3>
                            <p>Every article and tutorial is carefully researched and well-written.</p>
                        </div>
                    </div>
                    <div className={styles.benefit}>
                        <div className={styles.benefitNumber}>3</div>
                        <div>
                            <h3 className={styles.benefitTitle}>Practical Approach</h3>
                            <p>We focus on real-world applications, not just theoretical concepts.</p>
                        </div>
                    </div>
                    <div className={styles.benefit}>
                        <div className={styles.benefitNumber}>4</div>
                        <div>
                            <h3 className={styles.benefitTitle}>Community Driven</h3>
                            <p>Our content evolves based on feedback and community needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            < section className={styles.cta} >
                <h2 className={styles.ctaTitle}>Start Your Learning Journey Today</h2>
                <p className={styles.ctaText}>
                    Whether you're just starting or looking to advance your skills,
                    we have something for everyone.
                </p>
                <div className={styles.ctaButtons}>
                    <Link href="/articles" className={styles.ctaButtonPrimary}>
                        Browse Articles
                    </Link>
                    <Link href="/courses" className={styles.ctaButtonSecondary}>
                        Explore Courses
                    </Link>
                </div>
            </section >

            {/* Contact Info */}
            < section className={styles.contact} >
                <h2 className={styles.contactTitle}>Get in Touch</h2>
                <p className={styles.contactText}>
                    Have suggestions, questions, or want to contribute? We'd love to hear from you!
                </p>
                <Link href="/contact" className={styles.contactButton}>
                    Contact Us
                </Link>
            </section >


        </>
    )
}