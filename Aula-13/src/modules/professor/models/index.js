const { DataTypes } = require('sequelize')
const sequelize = require('../../../config/configDB')

const professor = sequelize.define('professor', {
    matricula:{
       type: DataTypes.CHAR(8),
       primaryKey:true,
       validate:{
        is:{
            args: /^[A-Za-z][0-9]{7}$/,
            msg: 'A matricula deve começar com uma letra e ter mais 7 numeros'

        }
       }

    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate:{
        len:{
            args:[100]
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
        unique:true,
        validate:{
            isEmail:{
                msg: 'Forneça um email valido!'
            },
            
        },
    },
    senha:{ 
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate:{
            
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{10}$/,
                msg:' A senha deve conter exatamente 10 caracteres e incluir pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial, como por exemplo !, @, # ou $.!'
            }
    }
})


module.exports = professor