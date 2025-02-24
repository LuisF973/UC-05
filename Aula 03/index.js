// Importando com (ESM)
const express = require('express');
const dotenv = require ('dotenv');
const { pool } = require('./src/config/database');

dotenv.config();

const port = process.env.PORTA;
const app = express();
// Aplicaçao use express como json (javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('/produtos', async (requisicao, resposta) => {
 //tratamento de exceçaes
  try {
    const query = `select * from produto`
    const produtos = await poll.query(consulta)
    if(produtos.rows.length === 0){
      return resposta.status(200).json(
        {mensagem:"Banco de dados vazio!"

        })
    }
    resposta.status(200).json(produtos.rows);
  } catch (error) {
    resposta.status(500).json(
      {
        mensagem:"erro ao buscar produto",
        erro: error.message
      })
  }
});

app.post('/produtos', async (requisicao, resposta) => {
  try {
    const { nome, preco, quantidade } = requisicao.body;
    if(!nome || !preco || !quantidade){
      return resposta.status(200).json({
        mensagem:"todos os dados devem ser preenchidos"
      }

      )
    }
  const novoProduto = [ nome, preco, quantidade ];
  const consulta = `INSERT INTO produto (nome, preco, quantidade) 
                   values ($1, $2, $3) returning *`
  
 await poll.query(consulta, novoProduto)
  
  resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json
    ({error:"erro ao cadastrar produto"})
  }
});

app.put("/produtos/:id", async(requisicao,resposta) =>{
  try {
    const id = requisicao.params.id;
    const {novoNome,novoPreco, novaQuantidade} = requisicao.body;
    if(!id){
      return resposta.status(404).json({mensagem:"Informe um parametro"})
    }
  const parametro = [1]
    const consulta1 = `select * from produto where id = $1`
  const resltado = await pool.query(consulta1, parametro)

    if(resltado.rows.length === 0){
        return resposta.status(404).json({mensagem: "produto nao encontrado"})
    }
    const dados = [id, novoNome, novoPreco, novaQuantidade]
    const consulta2 = `update produto set nome = $3, preco = $3, 
                      quatidade = $4  where id = $1 returning *`
    await poll.query(consulta2, dados)                  

    resposta.status(200).json({mensagem:"produto atualizado com sucesso"})
  } catch (error) {
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
})

app.delete("/produtos/:id", async (requisicao, resposta) =>{
  const id = requisicao.params.id
  const parametro = [1]
    const consulta1 = `select * from produto where id = $1`
  const resltado1 = await pool.query(consulta1, parametro)


  if (resltado1.rows.length ===0){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
  bancoDados.splice(produto, 1)
  resposta.status(200).json({
    mensagem:"produto deletado com sucesso"
  })

})


app.get("/produtos/:id",(requisicao,resposta) =>{
  try {
  const id = requisicao.params.id;
  const produto = bancoDados.find(elemento => elemento.id === parseInt(id));
  if(!produto){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
  resposta.status(200).json(produto)
  } catch (error) {
    resposta.status(500).json({
      menubar: "erro ao buscar produto",
      erro:error.message
    })
  }
})


app.delete("/produtos",(requisicao, resposta) =>{
  try {
    bancoDados.length = 0;
    resposta.status(200).json({mensagem: "todos os produtos foram excluidos"})
  } catch (error) {
    resposta.status(500).json({
      menubar: "erro ao deletar produto",
      erro: error.message
  }
)}
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
