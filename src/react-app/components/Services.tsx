import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, MessageSquare, Camera, Globe, TrendingUp, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Branding e Identidade Visual',
    description: 'Criamos logos únicos, paletas de cores estratégicas e brandbooks completos que capturam a essência da sua marca.',
    features: ['Logo e Identidade', 'Paleta de Cores', 'Brandbook Completo', 'Aplicações Visuais'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Branding e Identidade Visual*.'
  },
  {
    icon: MessageSquare,
    title: 'Verbal e Conteúdo',
    description: 'Desenvolvemos tom de voz autêntico e criamos conteúdos otimizados para SEO que conectam com seu público.',
    features: ['Tom de Voz', 'Legendas SEO', 'Estratégia de Conteúdo', 'Copywriting'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Verbal e Conteúdo*.'
  },
  {
    icon: Camera,
    title: 'Visual e Audiovisual',
    description: 'Produzimos designs impactantes para posts e edições profissionais que elevam sua presença digital.',
    features: ['Design de Posts', 'Edição de Vídeos', 'Stories Criativos', 'Motion Graphics'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Visual e Audiovisual*.'
  },
  {
    icon: Globe,
    title: 'Sites e Landing Pages',
    description: 'Desenvolvemos sites responsivos e landing pages de alta conversão focados na experiência do usuário.',
    features: ['Sites Responsivos', 'Landing Pages', 'E-commerce', 'UX/UI Design'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Sites e Landing Pages*.'
  },
  {
    icon: TrendingUp,
    title: 'Marketing e Performance',
    description: 'Criamos estratégias de marketing digital e gerenciamos suas redes sociais com foco em resultados.',
    features: ['Gestão de Redes', 'Relatórios Analíticos', 'Insights Valiosos', 'Growth Hacking'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Marketing e Performance*.'
  },
  {
    icon: Lightbulb,
    title: 'Consultoria Estratégica',
    description: 'Oferecemos direcionamento estratégico personalizado para acelerar o crescimento da sua marca.',
    features: ['Análise de Mercado', 'Posicionamento', 'Planejamento 360°', 'Inovação Digital'],
    whatsappMessage: 'Olá, vim pelo site da *side.way*. Gostaria de saber mais sobre *Consultoria Estratégica*.'
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-['Poppins'] mb-6">
            Nossos Serviços
          </h2>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Transformamos ideias em soluções digitais completas, do conceito à execução, 
            sempre com foco na autenticidade e nos resultados.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -6,
                scale: 1.03
              }}
              className="group"
            >
              <motion.div layout transition={{ type: 'spring', stiffness: 300, damping: 28 }} className="relative bg-[#2a2a2a] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-600 overflow-hidden group-hover:overflow-visible">
                {/* Luz amarela sutil no hover */}
                <div aria-hidden="true" className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-[#A8BBA2]/12 to-transparent blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                {/* Borda LED amarela durante a expansão */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ring-2 ring-[#A8BBA2]/50 shadow-[0_0_35px_10px_rgba(168,187,162,0.35)] z-0" />
                {/* Content wrapper above overlays */}
                <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#A8BBA2] to-[#A8BBA2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-[#1a1a1a]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white font-['Poppins'] mb-4">
                  {service.title}
                </h3>
                
                <p className="text-white/80 font-['Inter'] mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features: ocultas inicialmente e reveladas no hover */}
                <div className="overflow-hidden max-h-0 opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:max-h-[360px] group-hover:opacity-100 group-hover:translate-y-0">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-white/70 font-['Inter']">
                        <div className="w-2 h-2 bg-[#A8BBA2] rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={`https://wa.me/5511945749907?text=${encodeURIComponent(service.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center text-[#A8BBA2] font-['Inter'] font-medium cursor-pointer hover:text-[#A8BBA2]/80 transition-colors duration-200"
                  >
                    Saiba mais →
                  </motion.a>
                </div>
              </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
