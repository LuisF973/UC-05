// Importando com (commonjs)
const express = require("express")
const dotenv = require("dotenv");
const routerAluno = require('./src/modules/aluno/routes/index')
const routerEndereco = require('./src/modules/endereco/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

// rotas para aluno
app.use(routerAluno)

// rotas para endereco
app.use(routerEndereco)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
