// app/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import styles from '../components/homePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.highlight}>Tech Blog</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Learn programming, web development, and technology trends
          </p>
          <div className={styles.heroButtons}>
            <Link href="./posts" className={styles.primaryButton}>
              Read Articles
            </Link>
            <Link href="./categories" className={styles.secondaryButton}>
              Browse Courses
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* می‌تونی عکس اضافه کنی */}
          <div className={styles.imagePlaceholder}>
            <span>🚀</span>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Articles</h2>
          <Link href="/posts" className={styles.viewAll}>
            View All →
          </Link>
        </div>
        
        <div className={styles.articlesGrid}>
          {[
            { id: "hello-world", title: " Hello World", category: "Web Development", readTime: "5 min" },
            { id: "next-js", title: " Getting Started with Next.js 14", category: "Frontend", readTime: "8 min" },
            { id: "ai", title: "Artificial Intelligence", category: "Design", readTime: "10 min" }
          ].map(article => (
            <article key={article.id} className={styles.articleCard}>
              <div className={styles.articleCategory}>{article.category}</div>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleMeta}>{article.readTime} read</p>
              <Link href={`/posts/${article.id}`} className={styles.readMore}>
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Courses</h2>
          <Link href="/categories" className={styles.viewAll}>
            View All →
          </Link>
        </div>
        
        <div className={styles.coursesGrid}>
          {[
            { id: "html-css", title: "HTML & CSS", students: "1.2k", lessons: 24 },
            { id: "javascript", title: "JavaScript", students: "2.5k", lessons: 32 },
            { id: "react", title: "React", students: "3.1k", lessons: 28 }
          ].map(course => (
            <Link key={course.id} href={`/categories/${course.id}`} className={styles.courseCard}>
              <div className={styles.courseIcon}>📚</div>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <div className={styles.courseStats}>
                <span>👥 {course.students} students</span>
                <span>📖 {course.lessons} lessons</span>
              </div>
              <div className={styles.courseButton}>Start Learning</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <h2 className={styles.newsletterTitle}>Stay Updated</h2>
        <p className={styles.newsletterText}>
          Subscribe to get latest articles and tutorials
        </p>
        <form className={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Subscribe
          </button>
        </form>
      </section>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Articles</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>50+</div>
          <div className={styles.statLabel}>Courses</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>10k+</div>
          <div className={styles.statLabel}>Readers</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Free</div>
        </div>
      </div>

    </div>
  )
}