import { motion } from 'framer-motion';
import { Camera, Video, Star, Crown } from 'lucide-react';
import tableImg from '../assets/tabela-preços.jpg';

const packages = [
  {
    name: "Pacote Espiadinha",
    photos: "3 fotos",
    videos: "2 vídeos",
    price: "9,90",
    icon: <Camera className="w-6 h-6" />,
    featured: false
  },
  {
    name: "Pacote Safadinho",
    photos: "10 fotos",
    videos: "5 vídeos",
    price: "19,90",
    icon: <Video className="w-6 h-6" />,
    featured: false
  },
  {
    name: "Pacote Diabinho",
    photos: "25 fotos",
    videos: "10 vídeos",
    price: "29,90",
    icon: <Star className="w-6 h-6" />,
    featured: false
  },
  {
    name: "Pacote VIP",
    photos: "Pack completo",
    videos: "Acesso total",
    price: "49,90",
    icon: <Crown className="w-6 h-6" />,
    featured: true
  }
];

const Packages = () => {
  return (
    <section id="pacotes" className="py-20 px-4 bg-dark relative overflow-hidden">
      {/* Background Decorative Image (Subtle) */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <img src={tableImg} alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Escolha seu <span className="neon-text">Nível de Acesso</span></h2>
          <p className="text-gray-400">Conteúdo premium disponível imediatamente após o pagamento.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`glass p-8 rounded-3xl relative flex flex-col justify-between border-2 transition-all duration-300 ${
                pkg.featured ? 'border-neonPink shadow-neon scale-105 z-20 bg-dark/80' : 'border-white/10 hover:border-neonPink/50'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neonPink text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Mais Vendido
                </div>
              )}

              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pkg.featured ? 'bg-neonPink text-white shadow-neon' : 'bg-white/10 text-neonPink'}`}>
                  {pkg.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <ul className="space-y-3 mb-8 text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neonPink"></div>
                    {pkg.photos}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neonPink"></div>
                    {pkg.videos}
                  </li>
                </ul>
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-sm text-gray-400">R$</span>
                  <span className="text-4xl font-bold ml-1">{pkg.price}</span>
                </div>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${pkg.featured ? 'bg-neonPink hover:bg-neonPink/80 shadow-neon' : 'bg-white/10 hover:bg-white/20'}`}>
                  Assinar Agora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
