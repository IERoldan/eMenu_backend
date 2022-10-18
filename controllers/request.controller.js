const Request = require('../schemas/request.schema');
const User = require('../schemas/user.schema');

async function addRequest(req, res) {
        try {
            if (!req.body.userID || !req.body.userName) {
            return res.status(400).send({msg: 'Debes estar loggeado para hacer el pedido'})}
        let newRequest = new Request(req.body);
        await newRequest.save();
        if(!newRequest) return res.status(401).send({
            msg:'No se guardo la trasacción'
        })
        res.send({
            newRequest,
            msg:'Se creo la transacción correctamente',
        
        })

            } catch (error) {
                res.status(404).send(error)
            }
        }

async function getRequests(req,res){
    const requestDB = await Request.find();
    return res.json({requestDB})
}

async function getRequestByUser(req,res){
    try {
        const userID = req.query.user_id;
        const requestById = await Request.find({userID});
        if(!requestById) return res.status(404).send({msg: 'El usuario referido no tiene pedidos realizados'});
        console.log(requestById)
        return res.status(200).send({
            request: requestById
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
}

async function getRequestByStatus(req, res){
    try {
        const status = req.query.status_type;
        const requestByStatus = await Request.find({status});
        if(!requestByStatus) return res.status(404).send({msg: 'No hay pedidos con ese status'});
        console.log(requestByStatus)
        return res.status(200).send({
            request: requestByStatus,
        })
        
    } catch (error) {
        res.status(404).send(error)
    }
}

async function deleteRequest(req,res){
    const idRequest = req.query.request_to_delete;
    const requestDelete = await Request.findByIdAndDelete({_id:idRequest});
    if(!requestDelete) return res.status(404).send({msg: `No se encontro el pedido que desea eliminar`})
    return res.status(404).send({msg: `El pedido ${requestDelete.menu} ha sido eliminado exitosamente`})
}

async function updateRequest(res,req){
    const id = req.params.upd_id;
    const requestChanges = req.body;
    const updatedRequest = await Request.findByIdAndUpdate(id, requestChanges, {new: true});
    if(!updatedRequest) return res.status(404).send({msg:'No se encuentra el pedido que deseas modificar'})
    return res.status(202).send({
        request: updatedRequest,
        msg: `El pedido ${idRequest} ha sido modificado correctamente`})
}


        module.exports = {
            addRequest,
            getRequests,
            getRequestByUser,
            getRequestByStatus,
            deleteRequest,
            updateRequest
        }