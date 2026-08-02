import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const Navbar = ({ darkMode, toggleDark }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-4 md:px-8 lg:px-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-transparent dark:border-[#1a1a1a] transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          S
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="px-5 py-2 text-sm font-semibold bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-full hover:opacity-80 transition-opacity"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contact
          </a>
          <button
            onClick={toggleDark}
            className="text-[#0a0a0a] dark:text-[#fafafa] hover:opacity-60 transition-opacity"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
