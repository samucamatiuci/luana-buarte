import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "5519987164590";
  const message = "🔥 Oi! Tenho interesse nos conteúdos exclusivos e queria mais informações antes de finalizar a compra.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] flex items-center justify-center group"
    >
      <div className="absolute right-full mr-4 bg-dark/90 text-white px-4 py-2 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
        Dúvidas? Fale comigo!
      </div>
      <MessageCircle className="w-8 h-8 fill-white" />
      
      {/* Pulse Effect */}
      <div className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25"></div>
    </motion.a>
  );
};

export default WhatsAppButton;
