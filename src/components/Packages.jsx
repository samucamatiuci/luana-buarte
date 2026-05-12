import { motion } from 'framer-motion';
import { Camera, Video, Star, Crown } from 'lucide-react';
import tableImg from '../assets/tabela-preços.jpg';
import espiadinhaImg from '../assets/pacote-espiadinha.png';
import safadinhoImg from '../assets/pacote-safadinho.png';
import diabinhoImg from '../assets/pacote-diabinho.png';
import vipImg from '../assets/pacote-vip.png';

const packages = [
  {
    name: "Pacote Espiadinha",
    photos: "3 fotos",
    videos: "2 vídeos",
    price: "9,90",
    icon: <Camera className="w-6 h-6" />,
    image: espiadinhaImg,
    featured: false,
    link: "https://seguropagamentos.com.br/pack-espiadinha"
  },
  {
    name: "Pacote Safadinho",
    photos: "10 fotos",
    videos: "5 vídeos",
    price: "19,90",
    icon: <Video className="w-6 h-6" />,
    image: safadinhoImg,
    featured: false,
    link: "https://seguropagamentos.com.br/pack-safadinho"
  },
  {
    name: "Pacote Diabinho",
    photos: "25 fotos",
    videos: "10 vídeos",
    price: "29,90",
    icon: <Star className="w-6 h-6" />,
    image: diabinhoImg,
    featured: false,
    link: "https://seguropagamentos.com.br/pack-diabinho"
  },
  {
    name: "Pacote VIP",
    photos: "Pack completo",
    videos: "Acesso total",
    price: "49,90",
    icon: <Crown className="w-6 h-6" />,
    image: vipImg,
    featured: true,
    link: "https://seguropagamentos.com.br/pack-VIP"
  }
];

const Packages = ({ onSelectPackage }) => {
  const handlePurchase = (pkg) => {
    onSelectPackage(pkg);
  };

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
              className={`glass p-0 overflow-hidden rounded-3xl relative flex flex-col justify-between border-2 transition-all duration-300 ${
                pkg.featured ? 'border-neonPink shadow-neon scale-105 z-20 bg-dark/80' : 'border-white/10 hover:border-neonPink/50'
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-4 right-4 bg-neonPink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                  Mais Vendido
                </div>
              )}

              <div>
                {pkg.image ? (
                  <div className="h-48 overflow-hidden relative">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-12"></div>
                )}
                
                <div className="p-8 pt-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${pkg.featured ? 'bg-neonPink text-white shadow-neon' : 'bg-white/10 text-neonPink'}`}>
                    {pkg.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
                  <ul className="space-y-2 mb-6 text-gray-400 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-neonPink"></div>
                      {pkg.photos}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-neonPink"></div>
                      {pkg.videos}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-8 pt-0">
                <div className="mb-6">
                  <span className="text-xs text-gray-400 font-medium">R$</span>
                  <span className="text-3xl font-bold ml-1">{pkg.price}</span>
                </div>
                <button 
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full py-3 rounded-xl font-bold transition-all text-sm ${pkg.featured ? 'bg-neonPink hover:bg-neonPink/80 shadow-neon' : 'bg-white/10 hover:bg-white/20'}`}
                >
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
