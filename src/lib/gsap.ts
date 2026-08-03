// Centralized GSAP setup — import from here instead of directly from 'gsap'
// so that registerPlugin and config run exactly once.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// Optimize GSAP performance
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger };
