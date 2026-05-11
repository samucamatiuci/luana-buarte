const Footer = () => {
  return (
    <footer className="py-10 bg-black text-center border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 tracking-widest uppercase">Luana <span className="neon-text">Buarte</span></h2>
        <p className="text-gray-500 text-sm mb-6">
          Conteúdo exclusivo para maiores de 18 anos. Privacidade e sigilo total garantidos.
        </p>
        <div className="flex justify-center gap-6 mb-8 text-gray-400 text-sm">
          <a href="#" className="hover:text-neonPink transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-neonPink transition-colors">Privacidade</a>
          <a href="#" className="hover:text-neonPink transition-colors">Suporte</a>
        </div>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Luana Buarte • Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
