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
    const consulta = `select * from produto`
    const produtos = await pool.query(consulta) // 
    if(produtos.rows.length === 0){  // 
      return resposta.status(200).json(
        {mensagem:"Banco de dados vazio!"

        })
    }
    resposta.status(200).json(produtos.rows);  // retona todos as linhas 
  } catch (error) {
    resposta.status(500).json(
      {
        mensagem:"erro ao buscar produto",
        erro: error.message
      })
  }
});

app.post('/produtos', async (requisicao, resposta) => {  // indo na rota produto para ser criado
  try {
    const { nome, preco, quantidade } = requisicao.body; // dando caracteristica a um produto
    if(!nome || !preco || !quantidade){ // verificando ser todos os dados do produto estao preenchidos se nao estiver vai retornar uma mensagem de erro.
      return resposta.status(200).json({ // quando for para preencher todos os dados usar ! e ||
        mensagem:"todos os dados devem ser preenchidos"
      }

      )
    }
  const dados = [ nome, preco, quantidade ]; //guardado os dados do produto passado na requisicao
  const consulta = `INSERT INTO produto (nome, preco, quantidade) 
                   values ($1, $2, $3) returning *`
  
 await pool.query(consulta, dados)
  
  resposta.status(201).json({ mensagem: "Produto criado com sucesso" });
  } catch (error) {
    resposta.status(500).json
    ({error:"erro ao cadastrar produto",
      erro:error.message
    })
  }
});

app.put("/produtos/:id", async(requisicao,resposta) =>{
  try {
    const id = requisicao.params.id;
    const {novoNome,novoPreco, novaQuantidade} = requisicao.body;
    if(!id){
      return resposta.status(404).json({mensagem:"Informe um parametro"})
    }
  const dados1 = [id]
    const consulta1 = `select * from produto where id = $1`
  const resltado = await pool.query(consulta1, dados1)
                                                         // verificando no banco 
    if(resltado.rows.length === 0){
        return resposta.status(404).json({mensagem: "produto nao encontrado"})
    }
    const dados2 = [id, novoNome, novoPreco, novaQuantidade]
    const consulta2 = `update produto set nome = $2, preco = $3, 
                      quantidade = $4  where id = $1 returning *`
    await pool.query(consulta2, dados2)                  

    resposta.status(200).json({mensagem:"produto atualizado com sucesso"})
  } catch (error) {
    return resposta.status(404).json({mensagem:"produto nao encontrado",
      erro:error.message
    })
  }
})

app.delete("/produtos/:id", async (requisicao, resposta) =>{
  const id = requisicao.params.id
  const dados1 = [id]
    const consulta1 = `select * from produto where id = $1` // buscondo produto pelo id
  const resltado1 = await pool.query(consulta1, dados1)


  if (resltado1.rows.length ===0){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})  // 
  }

const dados2 = [id]
const consulta2 = `delete from produto where id = $1`
await pool.query(consulta2, dados2)

  bancoDados.splice(produto, 1)
  resposta.status(200).json({
    mensagem:"produto deletado com sucesso"
  })

})


app.get("/produtos/:id", async (requisicao,resposta) =>{
  try {
  const id = requisicao.params.id;
  const dados1 = [id]
  const consulta1 = `select * from produto where id = $1`
  const resltado1 = await pool.query(consulta1, dados1)
  if(resltado1.rows.length === 0){
    return resposta.status(404).json({mensagem:"produto nao encontrado"})
  }
  resposta.status(200).json(resltado1.rows[0])
  } catch (error) {
    resposta.status(500).json({
      menubar: "erro ao buscar produto",
      erro:error.message
    })
  }
})


app.delete("/produtos", async (requisicao, resposta) =>{
  try {
    const consulta =`delete from produto`
    await pool.query(consulta)
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
