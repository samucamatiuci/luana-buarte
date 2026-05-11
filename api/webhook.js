export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const payload = req.body;

  // Log para você ver as vendas chegando no painel da Vercel
  console.log('--- NOVO WEBHOOK RECEBIDO ---');
  console.log('Evento:', payload.event);
  console.log('ID da Transação:', payload.data?.id);
  console.log('Status:', payload.data?.status);
  console.log('E-mail do Comprador:', payload.data?.buyer?.email);
  console.log('-----------------------------');

  // Aqui no futuro podemos adicionar a lógica de envio de e-mail ou liberação de conteúdo
  
  // A BuckPay espera um retorno 200 para saber que recebemos com sucesso
  return res.status(200).json({ received: true });
}
