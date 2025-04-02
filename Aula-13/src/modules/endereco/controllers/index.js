const EnderecoModel = require('../models/index')

class EnderecoController{
    static async criarEndereco(requisicao, resposta){
        try {
            const { matricula, cep, numero, ponto_referencia } = requisicao.body
            if(!matricula || !cep || !numero){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser preenchidos!'})
            }
            const novoEndereco = await EnderecoModel.criarEndereco(matricula, cep, numero, ponto_referencia)
            resposta.status(201).json({mensagem: 'Endereco criado com sucesso!',endereco: novoEndereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async editarEnderecoAluno(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/a1234
            const matricula = requisicao.params.matricula
            const { cep, numero, ponto_referencia } = requisicao.body
            if(!cep || !numero){
                return resposta.status(400).json({mensagem: 'Todos os campos devem ser fornecidos!'})
            }
            const endereco = await EnderecoModel.editarEndereco(matricula, cep, numero, ponto_referencia )
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Endereço não encontrado!'})
            }
            resposta.status(200).json({mensagem: 'Endereço atualizado com sucesso', endereco: endereco})
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecoCEP(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/cep/59000000
            const cep = requisicao.params.cep
            const endereco = await EnderecoModel.listarEnderecoCEP(cep)//59000000
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Cep não existe ou invalido!'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecoCidade(requisicao, resposta){
        try {
            // http://localhost:3000/endereco/cidade/natal
            const cidade = requisicao.params.cidade
            const endereco = await EnderecoModel.listarEnderecoCidade(cidade)
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Cidade não existe ou invalida!'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecos(requisicao, resposta){
        try {
            const enderecos = await EnderecoModel.listarEnderecos()
            if(enderecos.length === 0){
                return resposta.status(404).json({mensagem: 'Não há registros a serem exibidos!'})
            }
            resposta.status(200).json(enderecos)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }
    static async listarEnderecoAluno(requisicao, resposta){
        try {
            const matricula = requisicao.params.matricula
            const endereco = await EnderecoModel.listarEndereco(matricula)
            if(endereco.length === 0){
                return resposta.status(404).json({mensagem: 'Não há registros a serem exibidos!'})
            }
            resposta.status(200).json(endereco)
        } catch (error) {
            resposta.status(500).json({mensagem: 'Erro interno do servidor. Por favor tente mais tarde!', erro: error.message})
        }
    }

}

module.exports = EnderecoController