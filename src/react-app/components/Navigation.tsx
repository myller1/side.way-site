import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Processo', href: '#process' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Modern Pill Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 left-[30%] z-50"
      >
        {/* Pill Container */}
        <motion.div
          className="flex items-center justify-between bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        >


          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 mx-8 font-['Montserrat'] font-bold capitalize">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-white/80 hover:text-white font-['Montserrat'] font-bold px-4 py-2 rounded-full transition-all duration-300 text-sm"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Email Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#f8f9fa',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const subject = 'Contato via site';
              const body = 'Olá! Gostaria de conversar com a Sideway.';
              window.location.href = `mailto:sidewaydigital@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
            className="bg-white text-gray-900 font-['Montserrat'] font-extrabold px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Mande um E-mail
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl min-w-[280px]"
            >
              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left py-3 px-4 text-white/80 hover:text-white font-['Montserrat'] font-bold rounded-xl transition-all duration-300"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    const subject = 'Contato via site';
                    const body = 'Olá! Gostaria de conversar com a Sideway.';
                    window.location.href = `mailto:sidewaydigital@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="mt-4 bg:white text-gray-900 font-['Montserrat'] font-extrabold px-6 py-3 rounded-xl text-center transition-all duration-300"
                >
                  Mande um E-mail
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
