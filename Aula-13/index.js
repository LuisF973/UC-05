// Importando com (commonjs)
const express = require("express")
const dotenv = require("dotenv");
const sequelize = require('./src/config/configDB')
//const routerAluno = require('./src/modules/aluno/routes/index')
//const routerEndereco = require('./src/modules/endereco/routes/index')
dotenv.config();

const port = process.env.PORTA;
const app = express();

// Aplicação use express como json(javascript object notation)
app.use(express.json());

// rotas para aluno
// app.use(routerAluno)

// // rotas para endereco
// app.use(routerEndereco)

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('conectado com sucesso 👌');
  } catch (error) {
    console.error('sem conexão com o banco 😒', error);
  }
  console.log(`Servidor rodando em http://localhost:${port}`);
});
