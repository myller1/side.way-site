import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Contato via site - ${formData.name || 'Novo contato'}`;
    const body = `Nome: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company}\n\nMensagem:\n${formData.message}\n\nEnviado via site Sideway`;
    const mailto = `mailto:sidewaydigital@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abre o cliente de email com os dados do formulário
    window.location.href = mailto;

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+55 11 94574-9907',
      link: 'https://wa.me/5511945749907?text=' + encodeURIComponent('Olá! Vim pelo site Sideway, podemos conversar?'),
      color: '#A8BBA2'
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: 'sidewaydigital@gmail.com',
      link: 'mailto:sidewaydigital@gmail.com',
      color: '#A8BBA2'
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'São Paulo, SP',
      link: '#',
      color: '#A8BBA2'
    },
    {
      icon: Clock,
      title: 'Horário',
      value: 'Seg-Sex: 9h às 18h',
      link: '#',
      color: '#A8BBA2'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#2F4858] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 right-10 w-96 h-96 border border-white/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 left-10 w-64 h-64 border border-white/5 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Poppins'] mb-6">
            Pronto para o próximo passo?
          </h2>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Vamos conversar sobre como transformar sua marca em uma presença digital 
            autêntica e impactante. O primeiro passo começa aqui.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-6">
                Fale conosco
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 font-['Inter'] text-sm mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 font-['Inter'] focus:outline-none focus:border-[#A8BBA2] transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 font-['Inter'] text-sm mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 font-['Inter'] focus:outline-none focus:border-[#A8BBA2] transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 font-['Inter'] text-sm mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 font-['Inter'] focus:outline-none focus:border-[#A8BBA2] transition-colors"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-['Inter'] text-sm mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 font-['Inter'] focus:outline-none focus:border-[#A8BBA2] transition-colors resize-none"
                    placeholder="Conte-nos sobre seu projeto, objetivos e como podemos ajudar..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#A8BBA2] hover:bg-[#A8BBA2]/90 text-[#1a1a1a] font-['Montserrat'] font-semibold px-6 py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#4B4B4B]/30 border-t-[#4B4B4B] rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensagem
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-6">
                Outras formas de contato
              </h3>
              <p className="text-white/80 font-['Inter'] leading-relaxed mb-8">
                Escolha a forma que for mais conveniente para você. Estamos sempre 
                prontos para ouvir suas ideias e transformá-las em realidade.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : '_self'}
                  rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: contact.color }}
                    >
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-['Poppins'] font-semibold mb-1">
                        {contact.title}
                      </h4>
                      <p className="text-white/80 font-['Inter'] text-sm">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="bg-gradient-to-r from-[#2F4858] to-[#A8BBA2] rounded-xl p-6 text-center"
            >
              <h4 className="text-xl font-bold text-white font-['Poppins'] mb-3">
                Vamos criar juntos?
              </h4>
              <p className="text-white font-['Inter'] mb-4">
                Sua marca merece uma presença digital autêntica e impactante.
              </p>
              <motion.a
                href={'https://wa.me/5511945749907?text=' + encodeURIComponent('Olá! Vim pelo site Sideway, podemos conversar?')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#4B4B4B] hover:bg-[#2F4858] text-white font-['Montserrat'] font-semibold px-6 py-3 rounded-full transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Chamar no WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
