export default async function handler(req, res) {
  const { external_id } = req.query;

  if (!external_id) {
    return res.status(400).json({ message: 'external_id is required' });
  }

  const token = process.env.BUCK_TOKEN;
  const userAgent = process.env.BUCK_USER_AGENT || 'Buckpay API';

  try {
    const response = await fetch(`https://api.realtechdev.com.br/v1/transactions/external_id/${external_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': userAgent,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data.data);
  } catch (error) {
    console.error('Erro ao consultar:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
