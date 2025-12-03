"use client"
import { useRouter } from 'next/navigation'
import styles from "./posts.module.css"

const articles = [
  { 
    slug: "hello-world", 
    title: "Hello World",
    description: "Introduction to programming and first steps",
    level: "Beginner",
    color: "#3498db",
    duration: "2 weeks"
  },
  { 
    slug: "next-js", 
    title: "Next.js Tutorial",
    description: "Complete guide to Next.js framework",
    level: "Intermediate", 
    color: "#000000",
    duration: "4 weeks"
  },
  { 
    slug: "ai", 
    title: "Artificial Intelligence",
    description: "Introduction to AI and machine learning",
    level: "Advanced",
    color: "#9b59b6", 
    duration: "6 weeks"
  }
]

export default function PostsPage() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Articles</h1>
      
      <div className={styles.articlesGrid}>
        {articles.map((article) => (
          <div key={article.slug} className={styles.articleCard}>
            <div 
              className={styles.colorIndicator}
              style={{ backgroundColor: article.color }}
            />
            
            <div className={styles.articleContent}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <p className={styles.articleDescription}>{article.description}</p>
              
              <div className={styles.articleMeta}>
                <span className={styles.level}>{article.level}</span>
                <span className={styles.duration}>{article.duration}</span>
              </div>
              
              <div className={styles.articleActions}>
                <a 
                  href={`/posts/${article.slug}`}
                  className={styles.readLink}
                >
                  Read Article
                </a>
                <button 
                  className={styles.readButton}
                  onClick={() => router.push(`/posts/${article.slug}`)}
                >
                  Read Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}