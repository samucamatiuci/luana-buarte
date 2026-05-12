import { motion } from 'framer-motion';
import bannerImg from '../assets/banner.png';

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:h-screen w-full flex items-center justify-center overflow-hidden pt-10 md:pt-0 bg-dark">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-dark hero-banner"
      >
        <div className="absolute inset-0 bg-black/40 md:bg-black/60 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter"
        >
          Conteúdo <span className="neon-text">Exclusivo VIP</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-300 mb-8 font-light"
        >
          Acesso imediato • Privacidade • Experiência Premium
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#pacotes" 
            className="btn-neon inline-block"
          >
            Quero meu acesso
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('pacotes').scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-neonPink/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-neonPink rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
