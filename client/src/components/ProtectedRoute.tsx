import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({
  children,
  requiredRole = "user",
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-[#1C4A2A] mx-auto mb-4" />
          <p className="font-ui text-sm text-[#1A1A1A]/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = getLoginUrl();
    }
    return null;
  }

  if (requiredRole === "admin" && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-2">
            Access Denied
          </h1>
          <p className="font-body text-sm text-[#1A1A1A]/60 mb-6">
            This area is restricted to administrators only. If you believe this is an error, please contact support.
          </p>
          <a
            href="/"
            className="inline-block bg-[#1C4A2A] hover:bg-[#153820] text-white font-ui text-sm px-6 py-2 rounded-full transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
