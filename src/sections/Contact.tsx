import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { Instagram, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [state, handleSubmit] = useForm("xvzeepyj");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Form fields animation
      const formFields = formRef.current?.querySelectorAll('.form-field');
      if (formFields) {
        gsap.fromTo(
          formFields,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Info animation
      const infoItems = infoRef.current?.querySelectorAll('.info-item');
      if (infoItems) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Socials animation
      const socialItems = socialsRef.current?.querySelectorAll('.social-link');
      if (socialItems) {
        gsap.fromTo(
          socialItems,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: socialsRef.current,
              start: 'top 90%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous email error
    setEmailError('');
    
    // Create a new FormData object
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('message', formData.message);
    
    // Submit to Formspree
    await handleSubmit(submitData as any);
    
    // Reset form after successful submission
    if (state.succeeded) {
      setFormData({ name: '', email: '', message: '' });
      // Also reset the form element directly
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  const socialLinks = [
    { icon: Instagram, label: 'Visit Sarthak Ojha\'s Instagram profile', href: 'https://www.instagram.com/_sarthakojha/' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative w-full py-20 border-t border-gray-200 dark:border-[#2a2a2a] overflow-hidden bg-transparent"
    >

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2
            className="text-4xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] mb-8 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Have a Project in Mind?
          </h2>
          <p
            className="text-lg max-w-xl text-[#262626] dark:text-[#d4d4d4]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {/* Success Message */}
            {state.succeeded && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-green-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Thank you for your message! I will get back to you soon.
                </p>
              </div>
            )}
            
            {/* Error Message */}
            {state.errors && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Oops! Something went wrong. Please try again later.
                </p>
              </div>
            )}
            <div className="form-field">
              <label
                htmlFor="name"
                className={`block text-sm mb-2 transition-all duration-200 ${focusedField === 'name' || formData.name ? 'text-[#0a0a0a]' : 'text-[#404040]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] transition-all duration-200 outline-none bg-transparent rounded-none focus:border-[#0a0a0a]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#0a0a0a',
                }}
                placeholder="Your name"
                required
                disabled={state.submitting}
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="email"
                className={`block text-sm mb-2 transition-all duration-200 ${focusedField === 'email' || formData.email ? 'text-[#0a0a0a]' : 'text-[#404040]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e: any) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError(''); // Clear error when user types
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] transition-all duration-200 outline-none bg-transparent rounded-none focus:border-[#0a0a0a]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#0a0a0a',
                }}
                placeholder="your@email.com"
                required
                disabled={state.submitting}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {emailError}
                </p>
              )}
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>



            <div className="form-field">
              <label
                htmlFor="message"
                className={`block text-sm mb-2 transition-all duration-200 ${focusedField === 'message' || formData.message ? 'text-[#0a0a0a]' : 'text-[#404040]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={5}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] transition-all duration-200 outline-none resize-none bg-transparent rounded-none focus:border-[#0a0a0a]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#0a0a0a',
                }}
                placeholder="Tell me about your project..."
                required
                disabled={state.submitting}
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full md:w-auto px-8 py-4 font-semibold text-[#fafafa] bg-[#0a0a0a] flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#262626] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {state.submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Start a Conversation
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-12">
            <div ref={infoRef} className="space-y-8">
              <div className="info-item flex flex-col gap-2">
                <div
                  className="text-sm tracking-widest text-[#a3a3a3] dark:text-[#888888] uppercase font-bold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Email
                </div>
                <div
                  className="font-semibold text-lg text-[#0a0a0a] dark:text-[#fafafa]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  sarthakojha.np@gmail.com
                </div>
              </div>

              <div className="info-item flex flex-col gap-2">
                <div
                  className="text-sm tracking-widest text-[#a3a3a3] dark:text-[#888888] uppercase font-bold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Location
                </div>
                <div
                  className="font-semibold text-lg text-[#0a0a0a] dark:text-[#fafafa]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Kathmandu, Nepal
                </div>
              </div>

              <div className="info-item flex flex-col gap-2">
                <div
                  className="text-sm tracking-widest text-[#a3a3a3] dark:text-[#888888] uppercase font-bold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Availability
                </div>
                <div
                  className="font-semibold text-lg text-[#0a0a0a] dark:text-[#fafafa]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Open for projects
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div
                className="text-sm tracking-widest text-[#a3a3a3] uppercase font-bold mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Find me on
              </div>
              <div ref={socialsRef} className="flex gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link text-[#0a0a0a] dark:text-[#fafafa] hover:text-[#525252] dark:hover:text-[#a3a3a3] transition-colors duration-300"
                  >
                    <social.icon className="w-6 h-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
