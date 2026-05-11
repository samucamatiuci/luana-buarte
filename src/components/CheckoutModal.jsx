import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, Loader2, QrCode } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, selectedPackage }) => {
  const [step, setStep] = useState('form'); // form, loading, pix, success
  const [formData, setFormData] = useState({ name: '', email: '', document: '' });
  const [paymentData, setPaymentData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
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
            document: formData.document.replace(/\D/g, '')
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
            {step === 'form' && (
              <form onSubmit={handleCreatePayment} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
                  <input 
                    required
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">CPF (Obrigatório para PIX)</label>
                  <input 
                    required
                    type="text"
                    placeholder="000.000.000-00"
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-neon outline-none transition-colors"
                    value={formData.document}
                    onChange={(e) => setFormData({...formData, document: e.target.value})}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                  type="submit"
                  className="w-full bg-neon text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_#ff1493] transition-all"
                >
                  Gerar QR Code PIX - R$ {selectedPackage.price}
                </button>
              </form>
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
              <div className="text-center py-12 space-y-6">
                <div className="bg-green-500/20 text-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h4 className="text-2xl font-bold text-white">Acesso Liberado!</h4>
                <p className="text-gray-400">Seu pagamento foi confirmado com sucesso. Você receberá o acesso por e-mail em instantes.</p>
                <button 
                  onClick={onClose}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Fechar
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
