const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'senha';

// Lista de JWT claims básicas
const jwtClaims = {
  iss: 'Issuer - Identifica o principal emissor do JWT',
  sub: 'Subject - Identifica o principal assunto do JWT',
  aud: 'Audience - Identifica o público-alvo do JWT',
  exp: 'Expiration Time - Define o tempo de expiração do JWT',
  nbf: 'Not Before - Define a data/hora a partir da qual o JWT será aceito',
  iat: 'Issued At - Data de emissão do JWT',
  jti: 'JWT ID - Um identificador único para o JWT'
};

// Rota para listar as JWT claims
app.get('/jwt/claims', (req, res) => {
  res.json(jwtClaims);
});

// Rota para gerar token com ID, data de geração e expiração
app.get('/jwt/tokenid', (req, res) => {
  const token = jwt.sign(
    {
      jti: '123456', // ID do token
      iat: Math.floor(Date.now() / 1000), // Data de geração
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // Expira em 1 hora
    },
    SECRET_KEY
  );

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
