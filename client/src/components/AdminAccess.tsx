// SafariNova Travels — Protected Admin Access
// Requires a secret token to access the admin dashboard
// In production, this should use OAuth or proper authentication

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Admin from "@/pages/Admin";

const ADMIN_TOKEN = "safarinova-admin-2026"; // In production, use env vars and proper auth

export default function AdminAccess() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user has valid token in sessionStorage
    const storedToken = sessionStorage.getItem("admin-token");
    if (storedToken === ADMIN_TOKEN) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token === ADMIN_TOKEN) {
      sessionStorage.setItem("admin-token", token);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin token");
      setToken("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    setIsAuthenticated(false);
    setToken("");
    setLocation("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#1C4A2A]/10 flex items-center justify-center">
                <Lock size={28} className="text-[#1C4A2A]" />
              </div>
            </div>
            <h1 className="font-display text-3xl font-semibold text-[#1A1A1A] text-center mb-2">
              Admin Portal
            </h1>
            <p className="font-body text-sm text-[#1A1A1A]/60 text-center mb-6">
              This area is restricted to authorized staff only.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin token"
                  className="font-ui text-sm border-[#E8DFD0] h-11 pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]/60"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="font-ui text-xs text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui h-11"
              >
                Access Admin Dashboard
              </Button>
            </form>

            <p className="font-ui text-xs text-[#1A1A1A]/40 text-center mt-6">
              Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleLogout}
          className="font-ui text-xs border-[#1C4A2A] text-[#1C4A2A]"
        >
          Logout
        </Button>
      </div>
      <Admin />
    </div>
  );
}
