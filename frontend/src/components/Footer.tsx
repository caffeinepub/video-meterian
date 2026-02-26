import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiYoutube, SiX, SiFacebook, SiInstagram } from 'react-icons/si';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const categories = [
  'General Studies',
  'Mathematics',
  'English',
  'Computer',
  'Logical Reasoning',
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'odisha-exam'
  );

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/assets/generated/vm-logo.dim_256x256.png"
                alt="Odisha Exam"
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-lg text-amber leading-none">
                  Odisha<span className="text-white"> Exam</span>
                </span>
                <span className="text-white/50 text-xs font-medium tracking-wide">
                  Video Materials and PDFs
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4 mt-3">
              Empowering learners across Odisha through high-quality educational video content and PDF study materials.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="YouTube"
                className="text-white/50 hover:text-amber transition-colors"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-white/50 hover:text-amber transition-colors"
              >
                <SiX className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/50 hover:text-amber transition-colors"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/50 hover:text-amber transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Subjects
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/courses"
                    className="text-sm text-white/60 hover:text-amber transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="mailto:support@odishaexam.edu"
                  className="hover:text-amber transition-colors"
                >
                  support@odishaexam.edu
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Odisha Exam. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="h-3 w-3 text-amber fill-amber" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
