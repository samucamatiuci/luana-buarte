import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ricardo S.",
    comment: "Simplesmente incrível. O conteúdo é de altíssima qualidade e o suporte foi super rápido.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    name: "Marcos V.",
    comment: "Melhor investimento que já fiz. O pacote VIP realmente vale cada centavo. Recomendo muito!",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704c"
  },
  {
    name: "Julio C.",
    comment: "Privacidade total e entrega instantânea. Gostei muito da facilidade de acesso no mobile.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704b"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">O que dizem os <span className="neon-text">Membros VIP</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-neonPink text-neonPink" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6">"{t.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border-2 border-neonPink" />
                <span className="font-bold">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
