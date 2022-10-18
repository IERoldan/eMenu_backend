const Request = require('../schemas/request.schema');
const User = require('../schema/user.schema');

async function createRequest(req, res) {
    try {
        let newRequest = new Request(req.body);
        const Request = await newRequest.save();

        if(!Request) return res.status(401).send({
            ok: false,
            msg: 'No se guardo el pedido'
        })
        return res.status(200).send({
            ok: true,
            msg: 'Se creo el pedido correctamente',
            Request
        })
    }
    catch(error) {
        return res.status(404).send({
            ok: false,
            msg: 'No se pudo crear el pedido', 
            error
        })
    }
}

module.exports = {
    createRequest,
   
}