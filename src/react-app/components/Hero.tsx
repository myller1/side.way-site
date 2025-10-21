import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Good way - right side.";
  const [showCTA, setShowCTA] = useState(false);
  const [currentLogo, setCurrentLogo] = useState('/images/logo-arvore.svg');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [logoScale, setLogoScale] = useState(1.3);
  const [isBlankScreen, setIsBlankScreen] = useState(true);
  const [typedHighlight, setTypedHighlight] = useState('');
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const highlightFullText = 'O LADO BOM, O CAMINHO CERTO';
  const phrase1 = 'LADO BOM,';
  const phrase2 = 'CAMINHO CERTO';

  useEffect(() => {
    // Pré-carregar o vídeo
    const preloadVideo = async () => {
      try {
        const response = await fetch('/images/video-fundohero.mp4');
        if (!response.ok) throw new Error('Falha ao carregar o vídeo');
        
        const reader = response.body?.getReader();
        if (!reader) throw new Error('Falha ao iniciar o streaming');

        const contentLength = Number(response.headers.get('Content-Length')) || 0;
        let receivedLength = 0;

        while(true) {
          const {done, value} = await reader.read();
          
          if (done) {
            setLoadingProgress(100);
            break;
          }

          receivedLength += value.length;
          const progress = (receivedLength / contentLength) * 100;
          setLoadingProgress(Math.round(progress));
        }
      } catch (error) {
        console.error('Erro ao pré-carregar vídeo:', error);
        handleVideoError();
      }
    };

    preloadVideo();
  }, []);

  const handleVideoError = () => {
    console.error('Erro ao carregar vídeo, tentativa:', retryCount.current + 1);
    if (retryCount.current < maxRetries) {
      retryCount.current += 1;
      const video = videoRef.current;
      if (video) {
        video.load();
      }
    } else {
      setVideoError(true);
      setVideoLoading(false);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
    setVideoError(false);
    // Aguardar um pequeno delay antes de mostrar o vídeo para garantir uma transição suave
    setTimeout(() => {
      setVideoReady(true);
    }, 300);
  };

  const renderColoredTypedHighlight = () => {
    const typed = typedHighlight;
    const len = typed.length;
    const p1Start = highlightFullText.indexOf(phrase1);
    const p1End = p1Start + phrase1.length;
    const p2Start = highlightFullText.indexOf(phrase2);
    const p2End = p2Start + phrase2.length;

    const s0 = typed.slice(0, Math.min(len, p1Start));
    const s1 = typed.slice(Math.min(len, p1Start), Math.min(len, p1End));
    const sMid = typed.slice(Math.min(len, p1End), Math.min(len, p2Start));
    const s2 = typed.slice(Math.min(len, p2Start), Math.min(len, p2End));
    const sAfter = typed.slice(Math.min(len, p2End), len);

    return (
      <>
        {s0 && <span>{s0}</span>}
        {s1 && <span className="text-[#A8BBA2]">{s1}</span>}
        {sMid && <span>{sMid}</span>}
        {s2 && <span className="text-[#A8BBA2]">{s2}</span>}
        {sAfter && <span>{sAfter}</span>}
      </>
    );
  };

  useEffect(() => {
    let currentText = '';
    let index = 0;
    
    const typewriter = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setTypewriterText(currentText);
        index++;
      } else {
        clearInterval(typewriter);
        setTimeout(() => setShowCTA(true), 500);
      }
    }, 100);

    return () => clearInterval(typewriter);
  }, []);

  useEffect(() => {
    // Ciclo: frase por 10s, seguida de logo-arvore por 7s, repetindo continuamente com transições suaves.
    let toLogoTimeout: NodeJS.Timeout | null = null;
    let backToPhraseTimeout: NodeJS.Timeout | null = null;
    let transitionTimeout: NodeJS.Timeout | null = null;

    const startCycle = () => {
      // Mostrar frase
      setIsBlankScreen(true);
      setIsTransitioning(false);

      // Após 10s, transicionar para a logo
      toLogoTimeout = setTimeout(() => {
        setIsTransitioning(true);
        transitionTimeout = setTimeout(() => {
          setIsBlankScreen(false);
          setCurrentLogo('/images/logo-arvore.svg');
          setLogoScale(1.3);
          setIsTransitioning(false);
        }, 600); // duração da transição suave

        // Após 7s mostrando a logo, voltar para a frase e repetir
        backToPhraseTimeout = setTimeout(() => {
          setIsTransitioning(true);
          transitionTimeout = setTimeout(() => {
            setIsBlankScreen(true);
            setIsTransitioning(false);
            startCycle();
          }, 600);
        }, 7000);
      }, 10000);
    };

    startCycle();

    return () => {
      if (toLogoTimeout) clearTimeout(toLogoTimeout);
      if (backToPhraseTimeout) clearTimeout(backToPhraseTimeout);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, []);

  useEffect(() => {
    // Typewriter para o destaque durante a tela inicial; ao finalizar, exibe o conteúdo principal com logo-arvore
    let typingTimer: NodeJS.Timeout | undefined;

    if (isBlankScreen) {
      setTypedHighlight('');
      let i = 0;
      const type = () => {
        if (i <= highlightFullText.length) {
          setTypedHighlight(highlightFullText.slice(0, i));
          i++;
          typingTimer = setTimeout(type, 60);
        } else {
          // Finalizou a digitação: manter a tela inicial por 15s (controlado pelo ciclo)
          // Não alteramos isBlankScreen aqui; o ciclo controla o tempo de 15s.
        }
      };
      typingTimer = setTimeout(type, 150);
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [isBlankScreen]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with error handling and fallback */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback/Loading background */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: videoReady ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]"
        >
          {videoLoading && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-[#A8BBA2] border-t-transparent rounded-full animate-spin"></div>
                {/* Progress */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-[#A8BBA2] text-sm font-medium">
                  {loadingProgress}%
                </div>
                {/* Retry message */}
                {retryCount.current > 0 && (
                  <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 text-white/70 text-xs">
                    Tentativa {retryCount.current} de {maxRetries}
                  </div>
                )}
              </div>
            </div>
          )}
          {videoError && (
            <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
              Não foi possível carregar o vídeo
            </div>
          )}
        </motion.div>

        {/* Video element */}
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoReady ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          aria-hidden="true"
        >
          <source src="/images/video-fundohero.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </motion.video>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
      {/* Linhas verticais removidas conforme solicitação */}

      {/* Blank Highlight Content During initial focus */}
      {isBlankScreen && (
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl text-white font-['Poppins'] font-extrabold leading-tight tracking-tight"
          >
            {renderColoredTypedHighlight()}
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
            className="mt-6 flex flex-row items-center justify-center gap-3"
          >
            <p className="text-xl md:text-2xl text-white/90 font-['Poppins'] font-semibold">
              <span>Studio de Criação</span>
              <span className="mx-3 text-[#A8BBA2] font-bold">&</span>
              <span>Mídias Sociais</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      {!isBlankScreen && (
        <>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isTransitioning ? 0.8 : logoScale, 
                opacity: isTransitioning ? 0.3 : 1 
              }}
              transition={{ 
                duration: isTransitioning ? 0.6 : 0.8, 
                ease: "easeInOut" 
              }}
              className="mb-16 mt-8"
            >
              <motion.img 
                key={currentLogo} // Força re-render quando a logo muda
                src={currentLogo} 
                alt="Side.way Logo" 
                className="w-[32rem] h-80 md:w-[38rem] md:h-96 lg:w-[45rem] lg:h-[28rem] mx-auto block object-contain"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: currentLogo === '/images/logo-arvore.svg' ? 0.2 : 0
                }}
              />
            </motion.div>

            {/* Typewriter Slogan removido conforme solicitação */}
            <motion.div className="mb-8 hidden">
              <p className="text-2xl md:text-3xl text-white font-['Montserrat'] font-bold"></p>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-white/90 font-['Montserrat'] font-bold max-w-2xl mx-auto leading-relaxed">
                Estúdio de ideias que transforma marcas em presença digital com estratégia, autenticidade e criatividade.
              </p>
            </motion.div>

            {/* CTA Button */}
            {showCTA && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={scrollToServices}
                  className="bg-[#A8BBA2] hover:bg-[#A8BBA2] text-[#1a1a1a] font-['Montserrat'] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Descubra como
                </button>
              </motion.div>
            )}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToServices}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </>
      )}
    </section>
  );
}
