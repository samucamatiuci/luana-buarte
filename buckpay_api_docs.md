# Documentação BuckPay

Bem-vindo à documentação da API BuckPay. Aqui você encontra tudo para integrar pagamentos PIX, cartão e boleto em sua aplicação.

> [!IMPORTANT]
> Solicite o header user-agent e suas credenciais (token) ao seu gerente de contas para que as chamadas à API funcionem corretamente.

## Autenticação

Todas as requisições à API BuckPay devem incluir autenticação via header Authorization.

### Header Authorization

Envie o token no formato:
`Authorization: Bearer <token>`

O `<token>` é um secret de 40 caracteres fornecido pelo BuckPay.

### User-Agent

Para que sua chamada seja aceita, é necessário também enviar o header user-agent conforme orientado pelo seu gerente de contas.
**Valor atual:** `Buckpay API`

---

## Endpoint Base

Todas as rotas da API BuckPay são relativas à seguinte base URL:
`https://api.realtechdev.com.br`

| Método | Rota                                        | Descrição |
| ------ | ------------------------------------------- | ----------- |
| POST   | `/v1/transactions`                            | Criar transação |
| GET    | `/v1/transactions/external_id/:external_id` | Consultar transação |

---

## Criar Transação (POST /v1/transactions)

Cria uma nova transação. Suporta `pix`, `card` e `boleto`.

### Headers
- `Authorization: Bearer <token>`
- `User-Agent: Buckpay API`
- `Content-Type: application/json`

### Body (Campos principais)
- `external_id` (String): ID único por vendedor.
- `payment_method` (String): "pix", "card" ou "boleto".
- `amount` (Number): Valor em **centavos**. (Ex: R$ 10,00 = 1000).
- `buyer` (Object): `name`, `email`, `document`, `phone`.
- `product` / `offer` (Object): Identificação do produto para UTMify.
- `postbackUrl` (String): URL para receber webhooks.

### Exemplo Sucesso PIX (201)
```json
{
  "data": {
    "id": "uuid",
    "status": "pending",
    "pix": {
      "code": "PIX_COPIA_E_COLA",
      "qrcode_base64": "BASE64_IMAGE"
    }
  }
}
```

---

## Consultar Transação (GET /v1/transactions/external_id/:external_id)

### Exemplo de Resposta (200 OK)
```json
{
  "data": {
    "id": "uuid",
    "status": "paid",
    "payment_method": "pix",
    "total_amount": 3590,
    "created_at": "ISO-8601"
  }
}
```

---

## Webhooks

A BuckPay envia notificações para:
- `transaction.created`: Venda pendente.
- `transaction.processed`: Venda paga.

---

## Configuração de Ambiente

Para o funcionamento correto, configure as seguintes chaves:
- `BUCK_TOKEN`: Seu token de 40 caracteres.
- `BUCK_USER_AGENT`: `Buckpay API`
