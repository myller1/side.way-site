import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'Auto Peças Saraiva',
    category: 'Branding & Digital',
    description: 'Transformamos uma tradição familiar em presença digital moderna, mantendo a essência de confiança e qualidade.',
    challenge: 'Modernizar a marca sem perder a tradição',
    solution: 'Nova identidade visual que honra o legado familiar',
    results: [
      '150% aumento no engajamento',
      '85% crescimento nas vendas online',
      'Reconhecimento regional da marca'
    ],
    tags: ['Identidade Visual', 'Site Responsivo', 'Social Media'],
    image: '/images/portfolio-saraiva.png',
    color: '#2F4858'
  },
  {
    id: 2,
    title: 'S44 Logística',
    category: 'Estratégia Digital',
    description: 'Desenvolvemos uma comunicação eficiente que reflete a agilidade e precisão dos serviços logísticos.',
    challenge: 'Comunicar eficiência em um mercado competitivo',
    solution: 'Estratégia digital focada em resultados mensuráveis',
    results: [
      '200% aumento em leads qualificados',
      '60% redução no custo de aquisição',
      'Posicionamento como líder regional'
    ],
    tags: ['Performance Marketing', 'Automation', 'CRM'],
    image: '/images/portfolio-s44.png',
    color: '#A8BBA2'
  },
  {
    id: 3,
    title: 'Infratech Produções',
    category: 'Audiovisual & Conteúdo',
    description: 'Criamos uma narrativa visual poderosa que destaca a inovação tecnológica e a criatividade da produtora.',
    challenge: 'Destacar-se no mercado audiovisual saturado',
    solution: 'Portfólio digital imersivo e estratégia de conteúdo',
    results: [
      '300% aumento na visualização do portfólio',
      '90% dos clientes vêm do digital',
      'Projetos internacionais conquistados'
    ],
    tags: ['Portfólio Digital', 'Motion Graphics', 'Brand Film'],
    image: '/images/infratech-portifolio.jpg',
    color: '#A8BBA2'
  }
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
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
            Projetos que Transformam
          </h2>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Cada projeto é uma jornada única de descoberta, criação e crescimento. 
            Conheça algumas das histórias que ajudamos a contar.
          </p>
        </motion.div>

        {/* Portfolio Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {portfolioItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedProject(index)}
              className={`px-6 py-3 rounded-full font-['Inter'] font-medium transition-all duration-300 ${
                selectedProject === index
                  ? 'bg-[#A8BBA2] text-[#1a1a1a] shadow-lg'
                  : 'bg-[#2a2a2a] text-white hover:bg-[#A8BBA2]/20 border border-gray-600'
              }`}
            >
              {item.title}
            </button>
          ))}
        </motion.div>

        {/* Selected Project Display */}
        <motion.div
          key={selectedProject}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl group aspect-[3/4] md:aspect-[4/5]">
            <img
              src={portfolioItems[selectedProject].image}
              alt={portfolioItems[selectedProject].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-['Inter'] font-medium text-white mb-2"
                style={{ backgroundColor: portfolioItems[selectedProject].color }}
              >
                {portfolioItems[selectedProject].category}
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            {/* removido: título e descrição */}

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-[#A8BBA2] font-['Poppins'] mb-2">
                  Desafio
                </h4>
                <p className="text-white/70 font-['Inter'] text-sm">
                  {portfolioItems[selectedProject].challenge}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#A8BBA2] font-['Poppins'] mb-2">
                  Solução
                </h4>
                <p className="text-white/70 font-['Inter'] text-sm">
                  {portfolioItems[selectedProject].solution}
                </p>
              </div>
            </div>

            {/* Results */}
            <div>
              <h4 className="text-lg font-semibold text-[#A8BBA2] font-['Poppins'] mb-4">
                Resultados Alcançados
              </h4>
              <ul className="space-y-2">
                {portfolioItems[selectedProject].results.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-white/80 font-['Inter']"
                  >
                    <ArrowRight className="w-4 h-4 text-[#A8BBA2] mr-3" />
                    {result}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div>
              <div className="flex flex-wrap gap-2">
                {portfolioItems[selectedProject].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#A8BBA2]/20 text-[#A8BBA2] rounded-full text-sm font-['Inter']"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#A8BBA2] hover:bg-[#A8BBA2]/90 text-[#1a1a1a] font-['Montserrat'] font-semibold px-6 py-3 rounded-full transition-colors duration-300"
            >
              Ver caso completo
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/80 font-['Inter'] mb-6">
            Quer ver mais do nosso trabalho e descobrir como podemos ajudar sua marca?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#A8BBA2] hover:bg-[#A8BBA2]/90 text-[#1a1a1a] font-['Montserrat'] font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-lg"
          >
            Ver portfólio completo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
