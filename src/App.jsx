import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <main className="bg-dark min-h-screen text-white">
      <WhatsAppButton />
      <Hero />
      
      <Benefits />
      
      <Packages />
      
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-24 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-2 border-neonPink/30"
          style={{
            background: 'linear-gradient(135deg, #0d0d0d 0%, #1a020d 100%)'
          }}
        >
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-neonPink/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-neonPink/10 blur-[100px] rounded-full"></div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Seu acesso exclusivo está a <span className="neon-text">um clique</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Não perca tempo. Junte-se a milhares de membros agora mesmo e desfrute da experiência completa.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon text-xl px-12 py-5"
          >
            Desbloquear agora
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
