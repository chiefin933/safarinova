// SafariNova Travels — Protected Admin Access
// Uses real OAuth authentication with role-based access control

import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Admin from "@/pages/Admin";
import { getLoginUrl } from "@/const";

export default function AdminAccess() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-[#1C4A2A] mx-auto mb-4" />
          <p className="font-ui text-sm text-[#1A1A1A]/60">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 shadow-lg text-center">
            <div className="w-14 h-14 rounded-full bg-[#1C4A2A]/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">
              Admin Portal
            </h1>
            <p className="font-body text-sm text-[#1A1A1A]/60 mb-8">
              This area is restricted to authorized administrators only. Please log in to continue.
            </p>
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              className="w-full bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui h-11"
            >
              Sign In with Manus
            </Button>
            <p className="font-ui text-xs text-[#1A1A1A]/40 mt-6">
              Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated but check if they're an admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 shadow-lg text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🚫</span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">
              Access Denied
            </h1>
            <p className="font-body text-sm text-[#1A1A1A]/60 mb-2">
              Hello, <span className="font-semibold">{user?.name || "User"}</span>!
            </p>
            <p className="font-body text-sm text-[#1A1A1A]/60 mb-8">
              Your account does not have administrator privileges. Only admins can access this area.
            </p>
            <Button
              onClick={() => logout()}
              variant="outline"
              className="w-full font-ui border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white h-11"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
            <a
              href="/"
              className="block mt-3 font-ui text-xs text-[#1C4A2A] hover:text-[#153820] transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and is an admin
  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <div className="bg-white rounded-full px-4 py-2 border border-[#E8DFD0] shadow-sm">
          <p className="font-ui text-xs text-[#1A1A1A]/60">
            Logged in as <span className="font-semibold text-[#1C4A2A]">{user?.name}</span>
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => logout()}
          className="font-ui text-xs border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white"
        >
          <LogOut size={14} className="mr-1" />
          Logout
        </Button>
      </div>
      <Admin />
    </div>
  );
}
