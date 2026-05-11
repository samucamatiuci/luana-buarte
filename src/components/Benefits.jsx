import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Gem, EyeOff } from 'lucide-react';

const benefits = [
  {
    title: "Acesso Imediato",
    desc: "Receba seu conteúdo segundos após a confirmação.",
    icon: <Zap className="w-8 h-8 text-neonPink" />
  },
  {
    title: "Pagamento Seguro",
    desc: "Transações criptografadas e 100% protegidas.",
    icon: <ShieldCheck className="w-8 h-8 text-neonPink" />
  },
  {
    title: "Conteúdo Premium",
    desc: "Imagens e vídeos em alta definição (4K).",
    icon: <Gem className="w-8 h-8 text-neonPink" />
  },
  {
    title: "Privacidade Garantida",
    desc: "Seus dados estão seguros e o sigilo é total.",
    icon: <EyeOff className="w-8 h-8 text-neonPink" />
  }
];

const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center mb-6 group-hover:shadow-neon group-hover:scale-110 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
