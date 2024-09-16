const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "senha";

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token não fornecido" });
  }

  const jwtToken = token.split(" ")[1];
  jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};

app.post("/jwt/auth", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username é obrigatório" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ token });
});

app.get("/jwt/metodosHttp", verifyJWT, (req, res) => {
  const httpMethods = {
    get: {
      objetivo_principal: "xxxxx",
      limite_caracteres:
        "xxxxxxx",
      aceita_https: "xxxx",
      aceita_http: "xxxx",
    },
    put: {
      objetivo_principal: "xxxxx",
      limite_caracteres: "x x",
      aceita_https: "x",
      aceita_http: "x",
    },
    post: {
      objetivo_principal: "xxxx",
      limite_caracteres: "x x",
      aceita_https: "x",
      aceita_http: "x",
    },
    patch: {
      objetivo_principal: "xxx",
      limite_caracteres: "xxx",
      aceita_https: "x",
      aceita_http: "x",
    },
    delete: {
      objetivo_principal: "xxxxxxx",
      limite_caracteres: "xxxxx",
      aceita_https: "xxx",
      aceita_http: "xxx",
    },
  };

  return res.json(httpMethods);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});