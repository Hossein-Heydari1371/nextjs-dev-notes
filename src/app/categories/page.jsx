"use client"

import styles from './categories.module.css'
import { useState } from "react"

// Course data in English
const courseData = {
  Frontend: [
    { 
      id: 'html-css', 
      title: 'HTML & CSS', 
      description: 'Learn web design fundamentals using HTML and CSS.',
      level: 'Beginner', 
      color: '#e34c26',
      duration: '4 weeks'
    },
    { 
      id: 'javascript', 
      title: 'JavaScript', 
      description: 'Master JavaScript programming for dynamic web pages.',
      level: 'Intermediate', 
      color: '#f1c40f',
      duration: '6 weeks'
    },
    { 
      id: 'react', 
      title: 'React', 
      description: 'Build modern user interfaces with React library.',
      level: 'Intermediate', 
      color: '#61dafb',
      duration: '6 weeks'
    },
    { 
      id: 'nextjs', 
      title: 'Next.js', 
      description: 'Develop React applications with Next.js framework.',
      level: 'Advanced', 
      color: '#000000',
      duration: '5 weeks'
    }
  ],
  Backend: [
    { 
      id: 'php', 
      title: 'PHP', 
      description: 'Learn PHP for server-side web development.',
      level: 'Beginner', 
      color: '#777bb4',
      duration: '5 weeks'
    },
    { 
      id: 'laravel', 
      title: 'Laravel', 
      description: 'Build secure web applications with Laravel framework.',
      level: 'Intermediate', 
      color: '#ff2d20',
      duration: '6 weeks'
    },
    { 
      id: 'java', 
      title: 'Java', 
      description: 'Master Java for desktop and web applications.',
      level: 'Intermediate', 
      color: '#007396',
      duration: '7 weeks'
    }
  ],
  AI: [
    { 
      id: 'ai', 
      title: 'Artificial Intelligence', 
      description: 'Learn AI fundamentals and real-world applications.',
      level: 'Advanced', 
      color: '#9b59b6',
      duration: '8 weeks'
    }
  ]
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const [search, setSearch] = useState('')

  // All courses for search
  const allCourses = Object.values(courseData).flat()
  
  // Filtered courses
  const filteredCourses = search 
    ? allCourses.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()))
    : courseData[activeCategory]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Courses</h1>
      
      {/* Search Box */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Category Tabs - Show only when not searching */}
      {!search && (
        <div className={styles.tabs}>
          {Object.keys(courseData).map(category => (
            <button
              key={category}
              className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Courses List */}
      <div className={styles.coursesGrid}>
        {filteredCourses.length === 0 ? (
          <p className={styles.noResults}>No courses found</p>
        ) : (
          filteredCourses.map(course => (
            <a
              key={course.id}
              href={`/categories/${course.id}`}
              className={styles.courseCard}
              style={{ borderColor: course.color }}
            >
              <div 
                className={styles.colorIndicator}
                style={{ backgroundColor: course.color }}
              />
              
              <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                
                <div className={styles.courseMeta}>
                  <span className={styles.level}>{course.level}</span>
                  <span className={styles.duration}>{course.duration}</span>
                </div>
                
                {!search && (
                  <span className={styles.categoryTag}>
                    {activeCategory}
                  </span>
                )}
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  )
}