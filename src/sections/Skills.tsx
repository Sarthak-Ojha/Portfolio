import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { techIcons } from '../assets/techIcons';

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Mobile',
    skills: [
      { name: 'Flutter', icon: techIcons['Flutter'] },
      { name: 'Android', icon: techIcons['Android'] },
      { name: 'Riverpod', icon: techIcons['Riverpod'] },
      { name: 'Firebase', icon: techIcons['Firebase'] },
    ],
  },
  {
    name: 'Languages',
    skills: [
      { name: 'Dart', icon: techIcons['Dart'] },
      { name: 'JavaScript', icon: techIcons['JavaScript'] },
      { name: 'TypeScript', icon: techIcons['TypeScript'] },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: techIcons['React'] },
      { name: 'Next.js', icon: techIcons['Next.js'] },
      { name: 'Tailwind CSS', icon: techIcons['Tailwind CSS'] },
      { name: 'shadcn/ui', icon: techIcons['shadcn/ui'] },
    ],
  },
  {
    name: 'Backend & Auth',
    skills: [
      { name: 'Next.js API', icon: techIcons['Next.js'] },
      { name: 'Clerk', icon: techIcons['Clerk'] },
    ],
  },
  {
    name: 'Data & Persistence',
    skills: [
      { name: 'PostgreSQL', icon: techIcons['PostgreSQL'] },
      { name: 'Prisma', icon: techIcons['Prisma'] },
    ],
  },
  {
    name: 'CI/CD',
    skills: [
      { name: 'GitHub', icon: techIcons['GitHub'] },
      { name: 'Vercel', icon: techIcons['Vercel'] },
      { name: 'Docker', icon: techIcons['Docker'] },
    ],
  },
];


const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const rows = gridRef.current?.querySelectorAll('.skill-row');
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative w-full py-20 border-t border-gray-200 dark:border-[#2a2a2a] bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h2
            className="text-4xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] mb-8 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Skills
          </h2>
        </div>

        {/* Skill rows */}
        <div ref={gridRef} className="flex flex-col">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-row grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-6 border-b border-[#e5e5e5] dark:border-[#2a2a2a] py-6"
            >
              {/* Category label */}
              <h3
                className="text-sm font-semibold text-[#404040] dark:text-[#a3a3a3] uppercase tracking-wider"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category.name}
              </h3>

              {/* Icons row */}
              <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`w-6 h-6 md:w-7 md:h-7 object-contain ${
                        skill.name === 'GitHub' || skill.name === 'Next.js' || skill.name === 'Express' || skill.name === 'Vercel'
                          ? 'dark:invert'
                          : ''
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        // Add text fallback when image fails
                        const parent = img.parentElement;
                        if (parent && !parent.querySelector('.text-fallback')) {
                          const fallback = document.createElement('span');
                          fallback.className = 'text-fallback text-xs font-bold text-[#404040] dark:text-[#a3a3a3]';
                          fallback.textContent = skill.name.substring(0, 2).toUpperCase();
                          parent.insertBefore(fallback, img);
                        }
                      }}
                    />
                    <span
                      className="text-xs md:text-sm font-medium text-[#262626] dark:text-[#d4d4d4]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
