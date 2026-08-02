import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { Github, ChevronDown } from 'lucide-react';

const techIcons: Record<string, string> = {
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  SQLite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  Stripe: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Maps API': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  CSS3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.project-item');
      if (cards) {
        cards.forEach((card: any, index: number) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'GyanYatra (1st Runner-Up Hackathon)',
      category: 'Mobile Development',
      description: 'Award-winning educational app for young learners featuring gamification, interactive lessons, offline SQLite support, and Stripe integration. Secured 1st Runner-Up.',
      tags: ['Flutter', 'Firebase', 'SQLite', 'Stripe'],
      links: { demo: '#', github: 'https://github.com/Sarthak-Ojha' },
    },
    {
      title: 'Quiz App',
      category: 'Mobile Development',
      description: 'A Flutter-based quiz application featuring category-based questions, timed challenges, score tracking, and Firebase-powered leaderboards.',
      tags: ['Flutter', 'Firebase'],
      links: { demo: '#', github: 'https://github.com/Sarthak-Ojha' },
    },
    {
      title: 'Tourism Portal',
      category: 'Web Development',
      description: 'A tourism web platform that helps users explore destinations, discover travel packages, and manage bookings through an intuitive interface.',
      tags: ['React', 'Node.js', 'Maps API'],
      links: { demo: '#', github: 'https://github.com/Sarthak-Ojha' },
    },
    {
      title: 'Car Rental System',
      category: 'Full Stack',
      description: 'A full-stack rental management platform featuring vehicle listings, reservation tracking, customer management, and secure payment processing.',
      tags: ['PHP', 'CSS3', 'Stripe'],
      links: { demo: '#', github: 'https://github.com/Sarthak-Ojha' },
    },
  ];

  return (
    <section id="projects" ref={sectionRef}
      className="projects-section relative w-full py-24 px-4 md:px-8 lg:px-16 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-[#0a0a0a] dark:text-[#fafafa]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Projects
          </h2>
        </div>

        {/* Projects List */}
        <div
          ref={cardsRef}
          className="flex flex-col space-y-2"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-item group border-b border-[#e5e5e5] dark:border-[#2a2a2a] py-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <div className="w-full flex items-center justify-between text-left group">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between w-full pr-4">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                    <h3
                      className="text-xl font-bold text-[#0a0a0a] dark:text-[#fafafa] group-hover:text-[#525252] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className="text-sm font-medium text-[#a3a3a3] mt-1 md:mt-0"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.category}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-[#a3a3a3] flex-shrink-0 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                />
              </div>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
              >
                <div className="overflow-hidden">
                  <p
                    className="text-base text-[#525252] dark:text-[#a3a3a3] leading-relaxed max-w-3xl mb-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Tags with Icons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.map((tag, ti) => (
                      <div key={ti} className="flex items-center gap-1.5">
                        {techIcons[tag] && (
                          <img
                            src={techIcons[tag]}
                            alt={tag}
                            className={`w-5 h-5 object-contain ${
                              tag === 'Next.js' || tag === 'Stripe' ? 'dark:invert' : ''
                            }`}
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        )}
                        <span
                          className="text-sm text-[#525252] dark:text-[#a3a3a3]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-6 pb-2">
                    <a
                      href={project.links.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#525252] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
