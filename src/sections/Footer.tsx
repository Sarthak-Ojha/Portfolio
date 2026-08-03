import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full border-t border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300 py-8"
    >
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 flex justify-center text-center"
      >
        <p
          className="text-xs text-[#404040] dark:text-[#a3a3a3]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © {new Date().getFullYear()} Sarthak Ojha. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
