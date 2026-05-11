export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, buyer, product, offer } = req.body;
  const token = process.env.BUCK_TOKEN;
  const userAgent = process.env.BUCK_USER_AGENT || 'BuckPay-Integration';

  // Gerar ID externo único
  const external_id = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  try {
    const response = await fetch('https://api.realtechdev.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id,
        payment_method: 'pix',
        amount: Math.round(parseFloat(amount) * 100), // Converter para centavos
        buyer,
        product,
        offer,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro BuckPay:', data);
      return res.status(response.status).json(data);
    }

    return res.status(201).json({
      ...data.data,
      external_id // Retornamos para que o frontend possa consultar depois
    });
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
