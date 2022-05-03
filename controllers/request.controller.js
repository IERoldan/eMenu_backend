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

// const getMovements = async (req, res) => {
//     const id = req.query.id;
//     const start = +req.query.start || 0;
//     const limit = +req.query.limit || 5;
//     if(req.user.role === 'CLIENT_ROLE' && (!id || req.user._id !== id)) {
//         return res.status(401).send({ok: false, msg: 'No puede acceder a las transacciones'})
//     }
//     const typeOfMovement = req.params.type;
//     if(id) {
//         try {
//             let requests = await Request.find({ client_id: id });
//             let user = await User.findById(id).exec();
//             if(!requests || !user) {
//                 return res.status(404).send({
//                     ok: false,
//                     msg: 'No se pudo obtener el pedido del usuario',
//                 })
//             }
//             return res.status(200).send({
//                 ok: true,
//                 msg: 'Pedidos y Usuario obtenidos correctamente',
//                 requests,
//                 user
//             })
//         } catch(error) {
//             return res.status(404).send({
//                 ok: false,
//                 msg: 'Error al obtener los pedidos del usuario',
//                 error
//             });
//         }   
        
//         }else {
//             try {
//                 console.log(limit, start)
//                                     // $lt: menor que       // $lte: menor o igual que      // $gt: mayor que
//                                     // $gte: mayor o igual que   //$ne: not equal
//                 const [ total, requests ] = await Promise.all([
//                     Request.countDocuments(),
//                     Request.find({})
//                             .skip(start)
//                             .limit(limit)
//                             .sort('-value description')
//                             .populate('userID', 'fullname email')
//                             .exec()
//                 ]);
//                 if(!requests) return res.status(404).send({
//                     ok: false,
//                     msg: 'No existen pedidos en la base de datos',
//                 })

//                 return res.status(200).send({
//                     ok: true,
//                     msg: 'Pedidos obtenidas correctamente',
//                     itemsPerPage: limit,
//                     total: total, 
//                     pages: Math.ceil(total / limit),
//                     requests,
//                 })

//             } catch (error) {
//                 return res.status(500).send({
//                     ok: false,
//                     msg: 'Error al obtener pedidos',
//                     error
//                 });
//             }
//         }

       
// }

// const getMovementsByValue = function(req, res) {
//     const criteria = req.params.criteria;
//     Request.find({
//         $or: [
//             {
//                 $and: [
//                     { menu: 'Gas'},
//                     { createAt: { $gte: 1631833012667 } }
//                 ]
//             }, 
//             {
//                 quantity: { $gte: 20000 }
//             }
//         ]
//     })

    
//         .exec((error, requests) => {
//             if(error) return res.status(404).send({
//                 ok: false,
//                 msg: 'Error al obtener pedidos',
//                 error
//             });
//             if(!requests) return res.status(404).send({
//                 ok: false,
//                 msg: 'No se pudo obtener ningun pedido con los criterios de busqueda enviados',
//             })
//             return res.status(200).send({
//                 ok: true,
//                 msg: `Pedidos encontrados referentes a ${criteria}`,
//                 count: requests.length,
//                 requests
//             })
//     })

// }

// function updateMovement(req, res) {
//     const id = req.params.id;
//     const update = req.body;
//     console.log(req.params)
//     Request.findByIdAndUpdate(id, update, {new: true} , (error, requestUpdated) => {
//         if(error) return res.status(404).send({
//             ok: false,
//             msg: 'Error al actualizar el pedido',
//             error
//         });
//         if(!requestUpdated) return res.status(404).send({
//             ok: false,
//             msg: 'No se encontró el pedido a actualizar ',
//         })
//         return res.status(200).send({
//             ok: true,
//             msg: `Pedido ${id} actualizado correctamente`,
//             requestUpdated
//         })
//     } )
// }

// //  buscarTransacciones();

// function updateInvalidDate(req, res) {
//     let requestArrayFromDB = [
//         {created_at: 1632442060.957},
//         {created_at: 1632442060000},
//         {created_at: 1632442060000},
//         {created_at: 1632442060.957},
//     ];
//     requestArrayFromDB.forEach(t  => {
//         let createdLength = t.created_at.toString().length;
//         if(createdLength > 10) {
//             if(createdLength === 14) {

//                 t.created_at = t.created_at.toString().replace('.', '');
//                 t.created_at = parseInt(t.created_at);
//             }
//             t.created_at = parseInt(t.created_at / 1000);
//         }
//     })

//     console.log(requestArrayFromDB);
// }

module.exports = {
    createRequest,
    // getMovements,
    // getMovementsByValue,
    // updateMovement,
    // updateInvalidDate,
}