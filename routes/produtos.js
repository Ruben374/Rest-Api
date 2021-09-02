const express = require('express');
const router= express.Router();
const mysql = require('../mysql').pool;
//todos os produtos
router.get('/',(request,response, next)=>{
    mysql.getConnection((error,conn)=>{
         if(error){ return response.status(500).send({error:error})}
      conn.query(
          'SELECT *FROM produtos',
          (error,result,field)=>{
              conn.release()
              if(error){ return response.status(500).send({error:error})}
       response.status(201).send({ response:result });
          }
      )
      
  })
})
//insere produtos
router.post('/',(request,response, next)=>{
  mysql.getConnection((error,conn)=>{
          if(error){ return response.status(500).send({error:error})}
      conn.query(
          'INSERT INTO produtos (nome,preco) VALUES(?,?)',
          ['ruben andre',45],
          (error,result,field)=>{
              conn.release()
          if(error){ return response.status(500).send({error:error})}
       response.status(201).send({
        message:'produto inserido',
        id_produto:result.insetId
        
        });
          }
      )
      
  })
 
})
//um produto especifico
router.get('/:id_produto',(request,response, next)=>{
    const id=request.params.id_produto;
    if(id=='especial'){
        response.status(200).send({
        message:'id especial',
        id:id
        
        })
    }
    else{
        response.status(200).send({
        message:'id comum',
        id:id
        })
    }
})

router.patch('/',(request,response, next)=>{
    response.status(200).send({
        message:'usando patch dentro da rota produtos'
        })
})
//insere produtos
router.delete('/',(request,response, next)=>{
    response.status(201).send({
        message:'usando delete dentro da rota produtos'
        
        })
})

module.exports = router;