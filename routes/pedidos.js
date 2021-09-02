const express = require('express');
const router= express.Router();

//todos os pedido
router.get('/',(request,response, next)=>{
    response.status(200).send({
        message:'usando get dentro da rota pedidos'
        })
})
//insere pedidos
router.post('/',(request,response, next)=>{
    const pedido={
        id_produto:request.body.id_produto,
        quantidade:request.body.quantidade
    }
    response.status(201).send({
        message:'usando post dentro da rota pedidos',
        pedidoCriado:pedido
        })
})
//um pedido especifico
router.get('/:id_pedido',(request,response, next)=>{
    const id=request.params.id_pedido;
  
        response.status(200).send({
        message:'id comum',
        id:id
        })
    
})

router.patch('/',(request,response, next)=>{
    response.status(200).send({
        message:'usando patch dentro da rota pedidos'
        })
})
//insere pedidos
router.delete('/',(request,response, next)=>{
    response.status(201).send({
        message:'usando delete dentro da rota pedidos'
        
        })
})

module.exports = router;