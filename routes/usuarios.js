const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
const bcrypt = require('bcrypt')

router.post('/cadastro', (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
      conn.query(
        'SELECT *FROM usuarios WHERE email=?',
        [request.body.email],
        (error, result) => {
          if (error) {
            return response.status(500).send({ error: error })
          }
     if(result.length > 0) {
         return response.status(409).send({ mensagem: "usuario ja existe" })
     }
     else{
    bcrypt.hash(request.body.senha, 10, (errBcrypt, hash) => {
      if (errBcrypt) {
        return response.status(500).send({ error: errBcrypt })
      }
      conn.query(
        'INSERT INTO usuarios (nome,email,senha) VALUES(?,?,?)',
        [request.body.nome, request.body.email, hash],
        (error, result) => {
            conn.release;
          if (error) {
            return response.status(500).send({ error: error })
          }
       const res={ 
              mensagem:'usuário cadastrado com sucesso',
              UsuárioCriado:{
                  id: result.insertId,
                  nome:request.body.nome,
                  email:request.body.email
              }
          }
          return response.status(200).send(res)
        }
      )
    })
     }
      
        }
      )

  })
})

module.exports = router
