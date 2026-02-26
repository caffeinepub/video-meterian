import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, PlayCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/vm-logo.dim_256x256.png"
              alt="Odisha Exam Logo"
              className="h-9 w-9 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-lg text-amber leading-none">
                Odisha<span className="text-white"> Exam</span>
              </span>
              <span className="text-white/50 text-xs font-medium tracking-wide">
                Video Materials and PDFs
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-amber bg-white/10'
                    : 'text-white/80 hover:text-amber hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'text-amber bg-white/10'
                  : 'text-white/80 hover:text-amber hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/courses">
              <Button
                size="sm"
                className="bg-amber text-charcoal hover:bg-amber-light font-semibold gap-2 shadow-amber"
              >
                <PlayCircle className="h-4 w-4" />
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-amber bg-white/10'
                  : 'text-white/80 hover:text-amber hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin')
                ? 'text-amber bg-white/10'
                : 'text-white/80 hover:text-amber hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
          <div className="pt-2">
            <Link to="/courses" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-amber text-charcoal hover:bg-amber-light font-semibold gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
