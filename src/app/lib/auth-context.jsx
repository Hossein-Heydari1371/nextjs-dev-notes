// src/app/lib/auth-context.jsx
"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // خواندن اطلاعات از localStorage هنگام لود اولیه
    const loadUser = () => {
      try {
        if (typeof window !== 'undefined') {
          const userData = localStorage.getItem('user');
          const isLoggedIn = localStorage.getItem('isLoggedIn');
          
          if (userData && isLoggedIn === 'true') {
            setUser(JSON.parse(userData));
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // گوش دادن به تغییرات localStorage از تب‌های دیگر
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'isLoggedIn') {
        loadUser();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange);
      }
    };
  }, []);

  // تابع Signup (ثبت نام)
  const signup = async (userData) => {
    if (typeof window !== 'undefined') {
      try {
        // در واقعیت اینجا API call برای ثبت نام
        // const response = await fetch('/api/auth/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(userData),
        // });
        // 
        // const data = await response.json();
        // if (!data.success) throw new Error(data.message);

        // شبیه‌سازی موفقیت ثبت نام (برای تست)
        console.log('Signup API called with:', userData);
        
        const newUser = {
          ...userData,
          id: Date.now(),
          isVerified: false, // کاربر جدید هنوز ایمیلش تایید نشده
          createdAt: new Date().toISOString(),
          // در واقعیت این اطلاعات از سرور می‌آید
          name: userData.name || userData.email.split('@')[0]
        };

        // ذخیره در localStorage (در واقعیت این کار رو سرور انجام می‌ده)
        // فعلاً برای تست localStorage استفاده می‌کنیم
        localStorage.setItem('temp_user', JSON.stringify(newUser));
        localStorage.setItem('signup_email', userData.email);
        
        // کاربر رو auto-login نمی‌کنیم چون باید ایمیلش رو تایید کنه
        return { 
          success: true, 
          message: 'Please check your email to verify your account',
          user: newUser 
        };
        
      } catch (error) {
        console.error('Signup error:', error);
        return { 
          success: false, 
          error: error.message || 'Signup failed. Please try again.' 
        };
      }
    }
    return { success: false, error: 'Window is not available' };
  };

  // تابع Login (ورود)
  const login = async (credentials) => {
    if (typeof window !== 'undefined') {
      try {
        // در واقعیت اینجا API call برای لاگین
        // const response = await fetch('/api/auth/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(credentials),
        // });
        // 
        // const data = await response.json();
        // if (!data.success) throw new Error(data.message);

        // شبیه‌سازی موفقیت لاگین (برای تست)
        console.log('Login API called with:', credentials);
        
        // بررسی آیا کاربر قبلاً ثبت نام کرده (برای تست)
        const tempUser = localStorage.getItem('temp_user');
        const userData = tempUser 
          ? JSON.parse(tempUser)
          : {
              email: credentials.email,
              name: credentials.email.split('@')[0],
              id: 12345,
              isVerified: true,
              lastLogin: new Date().toISOString()
            };

        // ذخیره اطلاعات کاربر
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', 'fake-token-' + Date.now());
        
        // به‌روزرسانی state
        setUser(userData);
        
        return { 
          success: true, 
          message: 'Login successful',
          user: userData 
        };
        
      } catch (error) {
        console.error('Login error:', error);
        return { 
          success: false, 
          error: error.message || 'Invalid email or password' 
        };
      }
    }
    return { success: false, error: 'Window is not available' };
  };

  // تابع Logout (خروج)
  const logout = () => {
    if (typeof window !== 'undefined') {
      try {
        // در واقعیت اینجا API call برای logout
        // await fetch('/api/auth/logout', { method: 'POST' });
        
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        
        // به‌روزرسانی state
        setUser(null);
        
        // هدایت به صفحه اصلی
        window.location.href = '/';
        
      } catch (error) {
        console.error('Logout error:', error);
        // حتی اگر خطا هم داد، باز هم localStorage رو پاک کن
        localStorage.clear();
        setUser(null);
        window.location.href = '/';
      }
    }
  };

  // تابع verifyEmail (تأیید ایمیل - برای Signup)
  const verifyEmail = async (token) => {
    if (typeof window !== 'undefined') {
      try {
        // در واقعیت اینجا API call برای تأیید ایمیل
        // const response = await fetch(`/api/auth/verify-email?token=${token}`);
        // const data = await response.json();
        // if (!data.success) throw new Error(data.message);

        // شبیه‌سازی موفقیت تأیید ایمیل
        console.log('Verify email called with token:', token);
        
        const tempUser = localStorage.getItem('temp_user');
        const signupEmail = localStorage.getItem('signup_email');
        
        if (!tempUser || !signupEmail) {
          throw new Error('No pending signup found');
        }

        const userData = JSON.parse(tempUser);
        userData.isVerified = true;
        userData.verifiedAt = new Date().toISOString();

        // ذخیره به عنوان کاربر اصلی
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', 'fake-token-' + Date.now());
        
        // پاک کردن اطلاعات موقت
        localStorage.removeItem('temp_user');
        localStorage.removeItem('signup_email');
        
        // به‌روزرسانی state
        setUser(userData);
        
        return { 
          success: true, 
          message: 'Email verified successfully',
          user: userData 
        };
        
      } catch (error) {
        console.error('Verify email error:', error);
        return { 
          success: false, 
          error: error.message || 'Email verification failed' 
        };
      }
    }
    return { success: false, error: 'Window is not available' };
  };

  // تابع getCurrentUser (گرفتن اطلاعات کاربر فعلی)
  const getCurrentUser = () => {
    return user;
  };

  // تابع updateUser (به‌روزرسانی اطلاعات کاربر)
  const updateUser = (updates) => {
    if (typeof window !== 'undefined' && user) {
      try {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return { success: true, user: updatedUser };
      } catch (error) {
        console.error('Update user error:', error);
        return { success: false, error: error.message };
      }
    }
    return { success: false, error: 'No user found' };
  };

  // تابع checkAuth (بررسی وضعیت احراز هویت)
  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('user');
      
      if (isLoggedIn && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        return { isAuthenticated: true, user: parsedUser };
      }
      
      setUser(null);
      return { isAuthenticated: false, user: null };
    }
    return { isAuthenticated: false, user: null };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading,
      // توابع اصلی
      signup,
      login,
      logout,
      // توابع کمکی
      verifyEmail,
      getCurrentUser,
      updateUser,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);