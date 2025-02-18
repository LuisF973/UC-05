// Importando com (ESM)
const express = require('express');
const dotenv = require ('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();
// Aplicaçao use express como json (javascript object notation)
app.use(express.json());

const bancoDados = [];

app.get('/produtos', (requisicao, resposta) => {
 //tratamento de exceçaes
  try {
    if(bancoDados.length === 0){
      return resposta.status(200).json(
        {mensagem:"Banco de dados vazio!"

        })
    }
    resposta.status(200).json(bancoDados);
  } catch (error) {
    resposta.status(500).json(
      {
        mensagem:"erro ao buscar produto",
        erro: error.message
      })
  }
});

app.post('/produtos', (requisicao, resposta) => {
  try {
    const { id, nome, preco } = requisicao.body;
    if(!id || !nome || !preco){
      return resposta.status(200).json({
        mensagem:"todos os dados devem ser preenchidos"
      }

      )
    }
  const novoProduto = { id, nome, preco };
  bancoDados.push(novoProduto);
  resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json
    ({error:"erro ao cadastrar produto"})
  }
});

app.put("/produtos/:id", (requisicao,resposta) =>{
  try {
    const id = requisicao.params.id;
    const {novoNome,novoPreco} = requisicao.body;
    const produto = bancoDados.find(elemento => elemento.id === parseInt(id))
    if(!id){
      return resposta.status(404).json({mensagem:"Informe um parametro"})
    }
    if(!produto){
        return resposta.status(404).json({mensagem: "produto nao encontrado"})
    }
    produto.nome = novoNome || produto.nome
    produto.preco = novoPreco || produto.preco
    resposta.status(200).json({mensagem:"produto atualizado com sucesso"})
  } catch (error) {
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
})

app.delete("/produtos/:id", (requisicao, resposta) =>{
  const id = requisicao.params.id
  const produto = bancoDados.findIndex(elemento => elemento.id === id)
  if (produto === -1){
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
