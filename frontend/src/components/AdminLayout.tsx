import { useEffect, type ReactNode } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LayoutDashboard, FileText, Video, LogOut, ShieldCheck } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAdminAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate({ to: '/admin/login' });
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) {
    return null;
  }

  function handleLogout() {
    logout();
    navigate({ to: '/admin/login' });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-bold font-serif text-foreground text-sm">Admin Panel</span>
                <p className="text-xs text-muted-foreground leading-none">Video Materials and PDFs</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/admin">
                {({ isActive }) => (
                  <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                )}
              </Link>
              <Link to="/admin/pdfs">
                {({ isActive }) => (
                  <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <FileText className="w-4 h-4" />
                    PDFs
                  </Button>
                )}
              </Link>
              <Link to="/admin/videos">
                {({ isActive }) => (
                  <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <Video className="w-4 h-4" />
                    Videos
                  </Button>
                )}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                View Site
              </a>
              <Separator orientation="vertical" className="h-5 hidden sm:block" />
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden border-b border-border bg-card">
        <div className="flex items-center gap-1 px-4 py-2">
          <Link to="/admin">
            {({ isActive }) => (
              <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-1.5 text-xs">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Button>
            )}
          </Link>
          <Link to="/admin/pdfs">
            {({ isActive }) => (
              <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-1.5 text-xs">
                <FileText className="w-3.5 h-3.5" />
                PDFs
              </Button>
            )}
          </Link>
          <Link to="/admin/videos">
            {({ isActive }) => (
              <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-1.5 text-xs">
                <Video className="w-3.5 h-3.5" />
                Videos
              </Button>
            )}
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
