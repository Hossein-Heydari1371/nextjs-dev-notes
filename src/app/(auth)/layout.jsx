// app/(auth)/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {children}  {/* این magic هست - Next.js خودش پرش می‌کنه */}
      </div>
    </div>
  );
}