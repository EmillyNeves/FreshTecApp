import { Link, useLocation } from "wouter";
import { Bell, Home, BarChart3, Calendar, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <div className="mobile-container max-w-sm mx-auto min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 text-white">🌿</div>
            </div>
            <h1 className="text-xl font-semibold text-neutral-800">FreshTec</h1>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-neutral-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          <Link href="/">
            <a className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isActive("/") ? "text-primary" : "text-neutral-400 hover:text-primary"
            }`}>
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </a>
          </Link>
          <Link href="/analytics">
            <a className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isActive("/analytics") ? "text-primary" : "text-neutral-400 hover:text-primary"
            }`}>
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Analytics</span>
            </a>
          </Link>
          <Link href="/calendar">
            <a className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isActive("/calendar") ? "text-primary" : "text-neutral-400 hover:text-primary"
            }`}>
              <Calendar className="w-5 h-5 mb-1" />
              <span className="text-xs">Calendar</span>
            </a>
          </Link>
          <Link href="/settings">
            <a className={`flex flex-col items-center py-2 px-4 transition-colors ${
              isActive("/settings") ? "text-primary" : "text-neutral-400 hover:text-primary"
            }`}>
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Settings</span>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
