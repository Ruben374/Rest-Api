const mysql = require('../mysql')

exports.getProdutos = async (request, response, next) => {
  try {
    const result = await mysql.execute('SELECT * FROM produtos;')
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
    return response.status(200).send(res)
  } catch (error) {
    return response.status(500).send({ error: error })
  }
}

exports.setProdutos = async (request, response, next) => {
  try {
    const query =
      'INSERT INTO produtos (nome, preco, produto_imagem) VALUES (?, ?, ?)'
    const result = await mysql.execute(query, [
      request.body.nome,
      request.body.preco,
      request.file.path
    ])
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
    return response.status(200).send(res)
  } catch (error) {
    return response.status(500).send({ error: error })
  }
}

exports.getUmProduto = async (request, response, next) => {
  try {
    const query = 'SELECT * FROM produtos WHERE id=?;'
    const result = await mysql.execute(query, [request.params.id_produto])
    if (result.length == 0) {
      return response
        .status(404)
        .send({ mensagem: 'não foi encontrado nenhum produto com esse id' })
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
    return response.status(200).send(res)
  } catch (error) {
    return response.status(500).send({ error: error })
  }
}

exports.updateProduto = (request, response, next) => {
  try {
    const query = 'UPDATE produtos SET nome= ?, preco= ? WHERE id= ?'
    const result = mysql.execute(query, [
      request.body.nome,
      request.body.preco,
      request.body.id
    ])
    const res = {
      mensagem: 'produto alterado',
      ProdutoAlterado: {
        id: request.body.id,
        nome: request.body.nome,
        preco: request.body.preco,
        request: {
          tipo: 'GET',
          descrição: 'Detalhes de um produto',
          url: 'http://localhost:3000/produtos/' + request.body.id
        }
      }
    }
    return response.status(200).send(res)
  } catch (error) {
    return response.status(500).send({ error: error })
  }
}

exports.deleteProduto = async (request, response, next) => {
  try {
    const query = 'DELETE FROM produtos WHERE id=?;'
    const result = await mysql.execute(query, [request.body.id])

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
    return response.status(200).send(res)
  } catch (error) {
    return response.status(500).send({ error: error })
  }
}
