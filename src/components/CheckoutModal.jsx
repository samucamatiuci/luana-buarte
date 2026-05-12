import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, selectedPackage }) => {
  const [step, setStep] = useState('loading'); // Iniciar em loading para automático
  const [formData] = useState({ 
    name: 'Comprador Luana Buarte', 
    email: 'vendas@luanabuarte.com', 
    document: '111.444.777-35', // CPF válido (checksum)
    phone: '11999999999'
  });
  const [paymentData, setPaymentData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  // Efeito para resetar o estado quando o modal fecha
  useEffect(() => {
    if (!isOpen) {
      setStep('loading');
      setPaymentData(null);
      setError(null);
    }
  }, [isOpen]);

  // Efeito para disparar o pagamento assim que o modal abre
  useEffect(() => {
    if (isOpen && selectedPackage && !paymentData && step === 'loading') {
      const timer = setTimeout(() => {
        handleCreatePayment();
      }, 500); // Pequeno delay para efeito visual
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedPackage, paymentData, step]);

  const handleCreatePayment = async () => {
    if (!selectedPackage) return;
    setStep('loading');
    setError(null);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPackage.price.replace(',', '.'),
          buyer: {
            name: formData.name,
            email: formData.email,
            document: formData.document.replace(/\D/g, ''),
            phone: formData.phone.replace(/\D/g, '')
          },
          product: {
            id: `prod_${selectedPackage.name.toLowerCase().replace(/\s/g, '_')}`,
            name: selectedPackage.name
          },
          offer: {
            id: 'offer_1',
            name: 'Acesso Imediato',
            quantity: 1
          }
        })
      });

      const data = await response.json();
      if (response.ok) {
        setPaymentData(data);
        setStep('pix');
      } else {
        throw new Error(data.error?.message || 'Erro ao gerar pagamento');
      }
    } catch (err) {
      setError(err.message);
      setStep('form');
    }
  };

  // Polling para verificar status
  useEffect(() => {
    let interval;
    if (step === 'pix' && paymentData?.external_id) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/check-payment?external_id=${paymentData.external_id}`);
          const data = await res.json();
          if (data.status === 'paid') {
            setStep('success');
            clearInterval(interval);
          }
        } catch (err) {
          console.error('Erro polling:', err);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [step, paymentData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentData.pix.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#1a1a1a] border border-neon/30 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,20,147,0.2)]"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
              {step === 'success' ? 'Pagamento Confirmado!' : `Checkout: ${selectedPackage.name}`}
            </h3>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {step === 'form' && error && (
              <div className="text-center py-4">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button 
                  onClick={() => handleCreatePayment()}
                  className="bg-neon text-white px-6 py-2 rounded-lg"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            {step === 'loading' && (
              <div className="flex flex-col items-center py-12">
                <Loader2 className="w-12 h-12 text-neon animate-spin mb-4" />
                <p className="text-gray-400">Gerando seu PIX...</p>
              </div>
            )}

            {step === 'pix' && (
              <div className="space-y-6 text-center">
                <p className="text-gray-300 text-sm">Escaneie o QR Code abaixo:</p>
                <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                  <img 
                    src={`data:image/png;base64,${paymentData.pix.qrcode_base64}`} 
                    alt="QR Code PIX" 
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-400 text-xs">Ou use o código Copia e Cola:</p>
                  <div className="flex gap-2">
                    <input 
                      readOnly
                      value={paymentData.pix.code}
                      className="bg-black border border-white/10 rounded-lg p-2 text-xs text-gray-500 flex-1 outline-none"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="bg-neon/10 border border-neon text-neon p-2 rounded-lg hover:bg-neon hover:text-white transition-all"
                    >
                      {isCopied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-yellow-500 text-sm animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Aguardando pagamento...</span>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-6 space-y-6">
                <div className="bg-green-500/20 text-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold text-white">Pagamento Confirmado!</h4>
                <p className="text-gray-400">Seu acesso foi liberado. Clique no botão abaixo para receber o conteúdo no WhatsApp.</p>
                
                <a 
                  href={`https://wa.me/5519987164590?text=${encodeURIComponent(`🔥 Oi! Acabei de fazer o pagamento do ${selectedPackage?.name} e quero meu acesso!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25d366] text-white font-bold py-5 rounded-2xl hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all text-lg"
                >
                  <MessageCircle className="w-6 h-6 fill-white" />
                  RECEBER CONTEÚDO AGORA
                </a>

                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Fechar janela
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
