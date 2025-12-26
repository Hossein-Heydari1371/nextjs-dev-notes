// components/MainLayout.jsx
"use client"

import { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import UserMenu from './UserMenu';
import { useAuth } from '@/app/lib/auth-context'; // اضافه کردن useAuth

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const pathname = usePathname();
    const router = useRouter();
    const currentSection = pathname.split("/")[1] || "home";

    // استفاده از useAuth به جای localStorage مستقیم
    const { user, isLoading } = useAuth();
    const isLoggedIn = !!user;

    // منوی navigation
    const menuItems = [
        {
            key: 'home',
            label: 'Home',
            onClick: () => router.push('/'),
        },
        {
            key: 'posts',
            label: 'Posts',
            onClick: () => router.push('/posts'),
        },
        {
            key: 'categories',
            label: 'Categories',
            onClick: () => router.push('/categories'),
        },
        {
            key: 'about',
            label: 'About',
            onClick: () => router.push('/about'),
        },
    ];

    return (
        <Layout>
            <Header style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div
                        className="demo-logo"
                        onClick={() => router.push('/')}
                        style={{
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🏠 MyApp
                    </div>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[currentSection]}
                        items={menuItems}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            background: 'transparent',
                            border: 'none',
                            lineHeight: '64px'
                        }}
                    />
                </div>

                <div>
                    {isLoading ? (
                        // نمایش loading state
                        <div style={{ color: 'white' }}>Loading...</div>
                    ) : isLoggedIn ? (
                        <UserMenu />
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <a
                                href="/login"
                                style={{
                                    color: 'white',
                                    padding: '8px 16px',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '4px',
                                    textDecoration: 'none'
                                }}
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                style={{
                                    color: 'white',
                                    background: '#1890ff',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    textDecoration: 'none'
                                }}
                            >
                                Sign Up
                            </a>
                        </div>
                    )}
                </div>
            </Header>

            <Content style={{
                padding: '0 48px',
                background: '#e2ebf5ff',
                minHeight: 'calc(100vh - 64px - 70px)'
            }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        { title: 'Home', onClick: () => router.push('/') },
                        {
                            title: pathname.split('/')[1]
                                ? pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)
                                : 'Home'
                        },
                    ].filter(item => item.title)}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                        marginBottom: '20px'
                    }}
                >
                    {children}
                </div>
            </Content>

            <Footer style={{
                textAlign: 'center',
                background: '#e2ebf5ff',
                padding: '20px'
            }}>
                MyApp ©{new Date().getFullYear()} | Built with Next.js & Ant Design
            </Footer>
        </Layout>
    )
}