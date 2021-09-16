const mysql = require('../mysql').pool

exports.getProdutos=  (request, response, next) => {
 
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query('SELECT *FROM produtos', (error, result, field) => {
      conn.release()
      if (error) {
        return response.status(500).send({ error: error })
      }
      const res = {
        quantidade: result.length,
        produtos: result.map(prod => {
          return {
            id: prod.id,
            nome: prod.nome,
            preco: prod.preco,
            request: {
              tipo: 'GET',
              descrição: 'produto em especifico',
              url: 'http://localhost:3000/produtos/' + prod.id
            }
          }
        })
      }

      return response.status(200).send({ response: res })
    })
  })
}

exports.setProdutos=(request, response, next) => {

  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      'INSERT INTO produtos (nome,preco,produto_imagem) VALUES(?,?,?)',
      [request.body.nome, request.body.preco, request.file.path],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        const res = {
          mensagem: 'produto inserido',
          ProdutoCriado: {
            id: result.id,
            nome: request.body.nome,
            preco: request.body.preco,
            path: request.body.path,
            request: {
              tipo: 'GET',
              descrição: 'Todos os produtos',
              url: 'http://localhost:3000/produtos/'
            }
          }
        }

        return response.status(200).send({ res })
      }
    )
  })
}
exports.getUmProduto=  (request, response, next) => {
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
        if (result.length === 0) {
          return response.status(404).send({ mensagem: 'Não encontrado' })
        }
        const res = {
          produto: {
            id: result[0].id,
            nome: result[0].nome,
            preco: result[0].preco,
            request: {
              tipo: 'GET',
              descrição: 'Todos os produtos',
              url: 'http://localhost:3000/produtos/'
            }
          }
        }

        return response.status(200).send({ response: res })
      }
    )
  })
}

exports.updateProduto=(request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      `UPDATE produtos
           SET nome= ?,
           preco= ? 
           WHERE id= ?`,
      [request.body.nome,request.body.preco, request.body.id],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        const res = {
          mensagem: 'produto alterado',
          ProdutoAlterado: {
            id: request.body.id,
            nome: request.body.nome,
            preco: request.body.preco,
            request: {
              tipo: 'GET',
              descrição: 'Detalhes de um produto',
              url: 'http://localhost:3000/produtos/'+'7'
            }
          }
        }

        return response.status(200).send({ res })
      }
    )
  })
}

exports.deleteProduto=(request, response, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return response.status(500).send({ error: error })
    }
    conn.query(
      `DELETE FROM  produtos
           WHERE id= ?`,
      [request.body.id],
      (error, result, field) => {
        conn.release()
        if (error) {
          return response.status(500).send({ error: error })
        }
        const res = {
          mensagem: 'produto removido',
          request: {
            tipo: 'POST',
            descrição: 'Insere produto',
            url: 'http://localhost:3000/produtos/',
            body: {
              nome: 'string',
              preco: 'number'
            }
          }
        }

        return response.status(200).send({ res })
      }
    )
  })
}