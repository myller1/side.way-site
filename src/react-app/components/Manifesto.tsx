import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Target, Eye, Star, BadgeCheck, Code, Lightbulb, Sparkles, Palette } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Criatividade Intencional',
    description: 'Cada ideia tem um propósito, cada criação tem significado.'
  },
  {
    icon: Target,
    title: 'Parceria Real',
    description: 'Trabalhamos juntos, crescemos juntos, celebramos juntos.'
  },
  {
    icon: Eye,
    title: 'Evolução Constante',
    description: 'Sempre aprendendo, sempre melhorando, sempre inovando.'
  },
  {
    icon: Star,
    title: 'Estilo com Essência',
    description: 'Beleza que comunica, design que transforma.'
  }
];

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-10 w-64 h-64 border border-white/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-10 w-48 h-48 border border-white/10 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Manifesto */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white font-['Poppins'] mb-8 leading-tight">
            Pensar diferente,<br />
            <span className="text-[#A8BBA2]">criar com autenticidade</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-['Inter'] max-w-4xl mx-auto leading-relaxed"
          >
            Somos um estúdio de ideias que acredita na força da autenticidade. 
            Cada marca tem sua história única, e nossa missão é revelá-la ao mundo 
            através de estratégias digitais que conectam, engajam e transformam.
          </motion.p>
        </motion.div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-[#A8BBA2] rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-[#4B4B4B]" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-4">Nossa Missão</h3>
            <p className="text-white/80 font-['Inter'] leading-relaxed">
              Posicionar marcas com personalidade única, criando conexões autênticas 
              que geram resultados duradouros no mundo digital.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-[#2F4858] rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-4">Nossa Visão</h3>
            <p className="text-white/80 font-['Inter'] leading-relaxed">
              Ser referência em inovação e confiança, transformando a forma como 
              as marcas se comunicam e se relacionam com seus públicos.
            </p>
          </motion.div>

          {/* Purpose */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-[#A8BBA2]" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-4">Nosso Propósito</h3>
            <p className="text-white/80 font-['Inter'] leading-relaxed">
              Criar autenticidade digital que ressoa verdadeiramente, construindo 
              pontes entre marcas e pessoas através de histórias significativas.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white font-['Poppins'] text-center mb-12">
            Nossos Valores
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <BadgeCheck className="w-5 h-5 text-[#A8BBA2]" aria-hidden="true" />
                <h4 className="text-lg font-semibold text-white font-['Poppins'] mb-3">
                  {value.title}
                </h4>
                <p className="text-white/80 font-['Inter'] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quem Somos */}
        <motion.div
          id="quem-somos"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-white font-['Poppins'] text-center mb-12">
            Quem Somos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Henrique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="relative aspect-[3/4] md:aspect-[4/5] perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full preserve-3d cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Frente do Card Henrique */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-lg hover:shadow-xl overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: "url('/images/henrique-site.jpg')" }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-2xl md:text-3xl font-bold text-white font-['Poppins']">Henrique</h4>
                      <BadgeCheck className="w-5 h-5 text-[#A8BBA2]" aria-hidden="true" />
                    </div>
                    <p className="text-white/85 font-['Inter'] font-semibold leading-relaxed">
                      Sou movido pela ideia de que estratégia e criatividade caminham juntas. Gosto de transformar conceitos em sistemas, ideias em estrutura e visão em entrega real. Meu papel é conectar propósito, tecnologia e direção para impulsionar marcas de forma inteligente e autêntica.
                    </p>
                    <div className="mt-4 text-white/60 text-sm font-['Inter'] font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>Passe o mouse para saber mais</span>
                    </div>
                  </div>
                </div>

                {/* Verso do Card Henrique */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 shadow-lg overflow-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    {/* Foto de perfil circular */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#A8BBA2] mb-3">
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{ backgroundImage: "url('/images/henrique-site.jpg')" }}
                        />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-white font-['Poppins'] text-center">Henrique</h4>
                    </div>

                    {/* Descrição */}
                    <div className="mb-6">
                      <p className="text-white/85 font-['Inter'] font-medium text-sm leading-relaxed text-center">
                        Estrategista criativo e cofundador da Side.way. Movido por propósito, transforma ideias em estratégias com identidade e direção. Une autenticidade e simplicidade para criar resultados reais e consistentes.
                      </p>
                    </div>
                      
                    {/* Principais frentes */}
                    <div className="space-y-3 flex-1">
                      <h5 className="text-[#A8BBA2] font-['Inter'] font-semibold text-sm mb-3">Principais Frentes:</h5>
                      <div className="flex items-center gap-3 text-white/85">
                        <Target className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                        <span className="font-['Inter'] font-medium text-sm">Estratégia & Posicionamento de Marca</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/85">
                        <Code className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                        <span className="font-['Inter'] font-medium text-sm">UX/UI & Desenvolvimento Digital</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/85">
                        <Lightbulb className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                        <span className="font-['Inter'] font-medium text-sm">Estrutura e Direção Estratégica</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A8BBA2]" />
                      <span className="text-[#A8BBA2] text-sm font-['Inter'] font-medium">Cofundador & Estrategista</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card Carolina */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="relative aspect-[3/4] md:aspect-[4/5] perspective-1000"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full preserve-3d cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Frente do Card Carolina */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-[#1f1f1f] border border-white/10 shadow-lg hover:shadow-xl overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full bg-cover"
                    style={{ 
                      backgroundImage: "url('/images/carol-site.jpg')",
                      backgroundPosition: "20% center"
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  <div className="relative p-6 md:p-8 flex flex-col justify-end h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-2xl md:text-3xl font-bold text-white font-['Poppins']">Carol</h4>
                      <BadgeCheck className="w-5 h-5 text-[#A8BBA2]" aria-hidden="true" />
                    </div>
                    <p className="text-white/85 font-semibold font-['Inter'] leading-relaxed">
                      Acredito no poder da comunicação que inspira e do design que emociona. Meu foco é dar forma e voz às ideias, criando narrativas visuais e campanhas que geram conexão de verdade entre marcas e pessoas.
                    </p>
                    <div className="mt-4 text-white/60 text-sm font-medium font-['Inter'] flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>Passe o mouse para saber mais</span>
                    </div>
                  </div>
                </div>

                {/* Verso do Card Carolina */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 shadow-lg overflow-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    {/* Foto circular e nome */}
                    <div className="flex flex-col items-center mb-6">
                      <div 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cover bg-center border-2 border-[#A8BBA2]/30 mb-3"
                        style={{ 
                          backgroundImage: "url('/images/carol-site.jpg')",
                          backgroundPosition: "20% center"
                        }}
                      />
                      <h4 className="text-xl md:text-2xl font-bold text-white font-['Poppins']">Carol</h4>
                    </div>

                    {/* Descrição */}
                    <div className="mb-6">
                      <p className="text-white/80 font-['Inter'] text-sm leading-relaxed text-center">
                        Designer, comunicadora e cofundadora da Side.way. Cria com sensibilidade e propósito, traduzindo essência em experiências visuais que conectam.
                      </p>
                    </div>

                    {/* Principais Frentes */}
                    <div className="flex-1">
                      <h5 className="text-[#A8BBA2] font-semibold font-['Poppins'] mb-4 text-center">Principais Frentes</h5>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-white/85">
                          <Palette className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                          <span className="font-['Inter'] text-sm">Direção Criativa & Comunicação Visual</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/85">
                          <Heart className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                          <span className="font-['Inter'] text-sm">Branding & Identidade de Marca</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/85">
                          <Sparkles className="w-4 h-4 text-[#A8BBA2] flex-shrink-0" />
                          <span className="font-['Inter'] text-sm">Estratégia de Conteúdo & Storytelling</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge final */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#A8BBA2]" />
                      <span className="text-[#A8BBA2] text-sm font-['Inter']">Cofundadora & Designer</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
