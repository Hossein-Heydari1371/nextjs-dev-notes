// components/UserMenu.jsx
"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/lib/auth-context';
import styles from './userMenu.module.css';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // بستن منو هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          triggerRef.current && 
          !dropdownRef.current.contains(event.target) && 
          !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // بستن منو با کلید Escape
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: (
        <svg className={styles.menuIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false);
        router.push('/dashboard');
      }
    },
    {
      label: 'Profile',
      icon: (
        <svg className={styles.menuIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="4" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 13C2 10.2386 4.23858 8 7 8H9C11.7614 8 14 10.2386 14 13V14H2V13Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false);
        router.push('/profile');
      }
    },
    {
      label: 'Settings',
      icon: (
        <svg className={styles.menuIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 5V8L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      onClick: () => {
        setIsOpen(false);
        router.push('/settings');
      }
    }
  ];

  // گرفتن حرف اول نام برای آواتار
  const getAvatarLetter = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // اگر کاربر null است، منو را نشان نده
  if (!user) {
    return null;
  }

  return (
    <>
      <div className={styles.userMenuContainer}>
        <button 
          ref={triggerRef}
          className={styles.userMenuTrigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="User menu"
        >
          <div className={styles.avatar}>{getAvatarLetter()}</div>
          <span>{user.name || user.email.split('@')[0]}</span>
        </button>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className={styles.dropdownMenu}
            role="menu"
            aria-label="User menu options"
          >
            {/* Header */}
            <div className={styles.menuHeader}>
              <div className={styles.headerTitle}>Account</div>
              <div className={styles.userInfoSection}>
                <div className={styles.userName}><strong>{user.name || user.email.split('@')[0]}</strong></div>
                <div className={styles.userEmailRow}>
                  <svg className={styles.emailIcon} width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4L8 8L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <small>{user.email}</small>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Menu Items */}
            <div className={styles.menuItems}>
              {menuItems.map((item, index) => (
                <button 
                  key={index} 
                  className={styles.menuItem}
                  onClick={item.onClick}
                  role="menuitem"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.divider}></div>

            {/* Logout */}
            <button 
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={handleLogout}
              role="menuitem"
            >
              <svg className={styles.logoutIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 12H3V4H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9L13 12L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Overlay برای بستن منو */}
      {isOpen && (
        <div 
          className={styles.dropdownOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}