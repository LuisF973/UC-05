const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB')

const Aluno = sequelize.define(
  'Aluno',
  {
    matricula: {
      type: DataTypes.char(5),
      primarykey:true,
    },
    nome: {
      type: DataTypes.STRING(100),
     allowNull: false,
    },
    email:{
        type: DataTypes.STRING(60),
        allowNull: false,
        unique:true,
        validate:{
            isEmail:{
                msg: 'Forneça um email valido!'
            },
            len:{
                args:[10,60],
                msg: 'o email deve ter no minimo 10 caracteres e no maximo 60!'
            }
        },

    },
    senha:{
        type: DataTypes.STRING(10),
        allowNull: false,
        validate:{
            len:{
                args:[10],
                msg:'A senha deve ter no minimo 10 caracteres!'
            },
           
            
        }
    },
    turma_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:

    }

  },
  {
   tableName:'aluno',
   createdAT:'criado_em',
   updatedAT:'atualizado_em',
  },
);

module.exports = Aluno