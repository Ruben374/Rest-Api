const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
//todos os produtos
router.get('/', (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query('SELECT *FROM produtos', (error, result, field) => {
      conn.release()
      if (error) {
        return response.status(500).send({ error: error })
      }
      response.status(201).send({ response: result })
    })
  })
})
//insere produtos
router.post('/', (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      'INSERT INTO produtos (nome,preco) VALUES(?,?)',
      ['ruben andre', 45],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        response.status(201).send({
          message: 'produto inserido',
          id_produto: result.insetId
        })
      }
    )
  })
})
//um produto especifico
router.get('/:id_produto', (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      'SELECT *FROM produtos WHERE id=?',
      [request.params.id_produto],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        response.status(201).send({ response: result })
      }
    )
  })
})

router.patch('/', (request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      `UPDATE produtos
           SET nome= ?,
           preco= ? 
           WHERE id= ?`,
      ['Ruben André', 4550.2,2],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        response.status(201).send({
          message: 'produto alterado'
        })
      }
    )
  })
})
//insere produtos
router.delete('/', (request, response, next) => {
   mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      `DELETE FROM  produtos
           WHERE id= ?`,
      [3],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        response.status(201).send({
          message: 'produto deletado'
        })
      }
    )
  })
})

module.exports = router
