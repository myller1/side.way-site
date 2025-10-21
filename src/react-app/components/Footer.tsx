import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, MessageCircle, Music } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Redes Sociais',
    links: [
      { title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61582723167348', icon: Facebook },
      { title: 'Instagram', href: 'https://www.instagram.com/side.wayyy/', icon: Instagram },
      { title: 'TikTok', href: 'https://www.tiktok.com/@side.wayyy?_t=ZM-90k1CbIzVIS&_r=1', icon: Music },
      { title: 'WhatsApp', href: 'https://wa.me/5511945749907', icon: MessageCircle },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-10 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Divider line */}
      <div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      {/* Subtle radial highlight */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid w-full gap-8 lg:grid-cols-2 xl:gap-12">
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center justify-start"><div className="h-48 aspect-[16/9] transform -translate-x-[40%]"><img src="/images/logo-arvore.svg" alt="Side.way Logo" className="w-full h-full object-contain transform origin-left scale-[1.55]" /></div></div>
            {/* copyright moved to bottom */}
          </AnimatedContainer>

          <div className="mt-10 flex justify-center lg:justify-center xl:justify-start lg:mt-0 lg:pl-8 lg:ml-[60%]">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-sm font-medium mb-4">{section.label}</h3>
                  <ul className="text-white/70 space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white inline-flex items-center transition-all duration-300 hover:scale-105"
                        >
                          {link.icon && <link.icon className="mr-2 w-4 h-4" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex justify-end pr-[8%]">
          <p className="text-white/70 text-sm text-right">
            © 2025 Sideway. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#A8BBA2] text-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 z-50"
        aria-label="Voltar ao topo"
      >
        <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          ↑
        </motion.div>
      </motion.button>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
