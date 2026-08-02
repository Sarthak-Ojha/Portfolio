import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

interface SkillItem {
  name: string;
  icon: string; // URL to devicons SVG
}

interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ],
  },
  {
    name: 'Mobile',
    skills: [
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
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
      ref={sectionRef}
      className="skills-section relative w-full py-24 px-4 md:px-8 lg:px-16 bg-transparent"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0a0a0a] dark:text-[#fafafa]"
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
              className="skill-row flex flex-col md:flex-row md:items-start border-b border-[#e5e5e5] dark:border-[#2a2a2a] py-6"
            >
              {/* Category label */}
              <h3
                className="w-full md:w-36 text-sm font-semibold text-[#a3a3a3] dark:text-[#666] uppercase tracking-wider mb-4 md:mb-0 md:pt-1 flex-shrink-0"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category.name}
              </h3>

              {/* Icons row */}
              <div className="flex flex-wrap gap-6">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`w-7 h-7 object-contain ${
                        skill.name === 'GitHub' || skill.name === 'Next.js' || skill.name === 'Express'
                          ? 'dark:invert'
                          : ''
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span
                      className="text-sm font-medium text-[#525252] dark:text-[#a3a3a3]"
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
