import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Lightbulb, Rocket, BarChart } from 'lucide-react';

const processSteps = [
  {
    icon: Search,
    number: '01',
    title: 'Imersão',
    description: 'Mergulhamos profundamente no universo da sua marca para entender suas necessidades, objetivos e desafios únicos.',
    details: [
      'Diagnóstico completo da marca',
      'Análise de concorrência',
      'Identificação do público-alvo',
      'Mapeamento de oportunidades'
    ]
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Estratégia 360',
    description: 'Desenvolvemos uma estratégia completa que conecta todos os pontos de contato da sua marca com o público.',
    details: [
      'Definição de posicionamento',
      'Criação de personas',
      'Planejamento de conteúdo',
      'Estratégia de canais'
    ]
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Produção',
    description: 'Colocamos a mão na massa para criar soluções visuais e de conteúdo que materializem a estratégia definida.',
    details: [
      'Criação de identidade visual',
      'Desenvolvimento de conteúdo',
      'Produção audiovisual',
      'Implementação de campanhas'
    ]
  },
  {
    icon: BarChart,
    number: '04',
    title: 'Otimização',
    description: 'Monitoramos, analisamos e otimizamos continuamente para garantir os melhores resultados e crescimento sustentável.',
    details: [
      'Análise de performance',
      'Relatórios detalhados',
      'Ajustes estratégicos',
      'Evolução contínua'
    ]
  }
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
            Nosso Processo
          </h2>
          <p className="text-xl text-white/90 font-['Inter'] max-w-3xl mx-auto">
            Uma metodologia comprovada que garante resultados excepcionais através 
            de um processo estruturado e personalizado para cada cliente.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#A8BBA2] to-[#2F4858] rounded-full" />

          {/* Process Steps */}
          <div className="space-y-16 lg:space-y-24">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 lg:max-w-md">
                  <div className={`text-center ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block mb-4"
                    >
                      <span className="text-6xl font-bold text-[#A8BBA2] font-['Poppins'] opacity-50">
                        {step.number}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-['Poppins'] mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/80 font-['Inter'] mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li 
                          key={detailIndex} 
                          className={`flex items-center text-white/70 font-['Inter'] text-sm ${
                            index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                          }`}
                        >
                          <div className="w-2 h-2 bg-[#A8BBA2] rounded-full mr-3" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Icon Circle */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <div className="w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center shadow-xl border-4 border-[#A8BBA2]">
                    <step.icon className="w-10 h-10 text-[#A8BBA2]" />
                  </div>
                </motion.div>

                {/* Spacer for alignment */}
                <div className="flex-1 lg:max-w-md" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-[#A8BBA2] rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-['Poppins'] mb-6">
              Pronto para começar sua jornada?
            </h3>
            <p className="font-['Inter'] text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#ffffffff' }}>
              Cada projeto é único, assim como cada marca. Vamos conversar sobre 
              como podemos transformar sua visão em realidade digital.
            </p>
            <a
              href={`mailto:sidewaydigital@gmail.com?subject=${encodeURIComponent('Contato via site')}&body=${encodeURIComponent('Olá! Gostaria de conversar com a Sideway.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white font-['Montserrat'] font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ color: '#4B4B4B' }}
            >
              Vamos conversar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
