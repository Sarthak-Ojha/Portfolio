import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const Navbar = ({ darkMode, toggleDark }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#0a0a0a] focus:text-[#fafafa] focus:rounded-lg focus:font-bold focus:border-2 focus:border-[#fafafa] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-4 md:px-8 lg:px-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-transparent dark:border-[#1a1a1a] transition-colors duration-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            aria-label="Sarthak Ojha - Home"
          >
            S
          </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#262626] dark:hover:text-[#d4d4d4] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleDark}
            className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleDark}
            className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1a1a1a] shadow-lg">
          <div className="flex flex-col py-4 px-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#262626] dark:hover:text-[#d4d4d4] transition-colors py-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
