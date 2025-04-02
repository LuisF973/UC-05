const AlunoModel = require("../models/index");

class AlunoController {
  static async criar(requisicao, resposta) {
    try {
      const { matricula, nome, email, senha } = requisicao.body;
      if (!matricula || !nome || !email || !senha) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos devem ser fornecidos!" });
      }
      const novoAluno = await AlunoModel.criar(matricula, nome, email, senha);
      resposta
        .status(201)
        .json({ mensagem: "Aluno criado com sucesso", aluno: novoAluno });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao criar o aluno!", erro: error.message });
    }
  }
  static async editar(requisicao, resposta) {
    // http://localhost:3000/aluno/
    try {
      const matricula = requisicao.params.matricula;
      const { nome, email, senha } = requisicao.body;
      if (!nome || !email || !senha) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos devem ser preenchidos!" });
      }
      const aluno = await AlunoModel.editar(matricula, nome, email, senha);
      if (aluno.length === 0) {
        return resposta.status(400).json({ mensagem: "Aluno não encontrado!" });
      }
      resposta.status(200).json({ mensagem: "Aluno editado com sucesso!", aluno: aluno });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao editar o aluno!", erro: error.message });
    }
  }
  static async listarTodos(requisicao, resposta) {
    try {
      const alunos = await AlunoModel.listar();
      if (alunos.length === 0) {
        return resposta
          .status(400)
          .json({ mensagem: "Não existe alunos a serem exibidos!" });
      }
      resposta.status(200).json(alunos);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao listar os alunos!", erro: error.message });
    }
  }
  static async listarPorMatricula(requisicao, resposta) {
    try {
      const matricula = requisicao.params.matricula;
      const aluno = await AlunoModel.listarPorMatricula(matricula);
      if (aluno.length === 0) {
        return resposta.status(400).json({ mensagem: "Aluno não encontrado!" });
      }
      resposta.status(200).json(aluno);
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro ao listar por matricula o aluno!",
        erro: error.message,
      });
    }
  }
  static async excluirTodos(requisicao, resposta) {
    try {
      debug("Rota raiz foi acessada!");
      await AlunoModel.excluirTodos();
      resposta
        .status(200)
        .json({ mensagem: "Todos os alunos foram excluidos com sucesso!" });
    } catch (error) {
      resposta.status(500).json({
        mensagem: "Erro ao excluir todos os alunos!",
        erro: error.message,
      });
    }
  }
  static async excluirPorMatricula(requisicao, resposta) {
    try {
      const matricula = requisicao.params.matricula;
      const aluno = await AlunoModel.listarPorMatricula(matricula);
      if (aluno.length === 0) {
        return resposta.status(400).json({ mensagem: "Aluno não encontrado!" });
      }
      await AlunoModel.excluirPorMatricula(matricula);
      resposta.status(200).json({ mensagem: "Aluno excluido com sucesso!" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao excluir o aluno!", erro: error.message });
    }
  }
}

module.exports = AlunoController