const AlunoModel = require("../models/index")

class AlunoController {
  static async criar(requisicao, resposta) {
    try {
      const { matricula, nome, email, senhar } = requisicao.body;
      if (!matricula || !nome || !email || !senhar) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos devem ser fornecidos!" });
      }
      const novoAluno = await AlunoModel.criar(matricula, nome, email, senhar);
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
    try {
      const matricula = requisicao.params.matricula;
      const { nome, email, senhar } = requisicao.body;
      if (!nome || !email || !senhar) {
        return resposta
          .status(400)
          .json({ mensagem: "todos os compos devem ser preenchidos" });
      }
      const aluno = await AlunoModel.editar(matricula, nome, email, senhar);
      if (aluno.length === 0) {
        return resposta.status(400).json({ mensagem: "Aluno não encontrados" });
      }
      resposta.status(200).json({ mensagem: "Aluno editado com sucesso" , aluno: aluno});
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "erro ao editar aluno", erro: error.mensagem });
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
      resposta
        .status(500)
        .json({
          mensagem: "Erro ao listar por matricula o aluno!",
          erro: error.message,
        });
    }
  }
  static async excluirTodos(requisicao, resposta) {
    try {
      await AlunoModel.excluirTodos();
      resposta
        .status(200)
        .json({ mensagem: "todos os alunos foram excluidos" });
    } catch (error) {
      resposta
        .status(500)
        .json({
          mensagem: "erro ao excluir todos os alunoa!",
          erro: error.mensage,
        });
    }
  }
  static async excluirPorMatricula(requisicao, resposta) {
    try {
      const matricula = requisicao.params.matricula;
      const aluno = await AlunoModel.listarPorMatricula(matricula);
      if (aluno.length === 0) {
        return resposta.status(400).json({ mensagem: "Aluno nao encontrado" });
      }
      await AlunoModel.excluirPorMatriculo(matricula);
      resposta.status(200).json({ mensagem: "Aluno excluido com sucesso" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "erro ao excluir aluno", erro: error.mensage });
    }
  }
}

module.exports = AlunoController;
