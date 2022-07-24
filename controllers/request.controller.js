const Request = require('../schemas/request.schema');
const Menu = require('../schemas/menu.schema');

const getMenusCart = async (req, res)=> {
    const menusCart = await Request.find();
    if (menusCart){
        res.json({menusCart})
    } else {
        res.json({mensaje: "No hay productos en el carrito"})
    }
}


const addMenusCart = async (req,res)=>{
    const {title,picture,price} = req.body;

    // Me fijo si esta el producto
    const estaEnMenu = await Menu.findOne({title});

   // Me fijo si todos los campos vienen con info
   const noEstaVacio = title !== "" && picture !== "" && price !== "";

   // me fijo si el menu ya esta en el carrito 
   const estaEnCarrito = await Request.findOne({title});

   // si no tengo el menu 
   if(!estaEnMenu){
    res.status(400).json({mensaje: "El menu no se encuentra en nustra base de datos"})
   } 
   // si nos envian algo y no esta en el carrito lo agrego
   else if (noEstaVacio&&!estaEnCarrito) {

   const newMenuInCart = new Request({title,picture,price,amount:1})

   // y actualizo la prop inCart: true en nuestros menus 
   await Menu.findByIdAndUpdate(
    estaEnMenu?._id,
    {inCart: true, title,picture,price},
    {new: true}
   ).then((menu)=>{2
    newMenuInCart.save();
    res.json({mensaje:"El menu fue agregado correctamente", menu})
   }).catch((error)=> console.log(error))
   
   // y si esta avisamos 
   } else if (estaEnCarrito){
   res.status(400).json({mensaje:"El producto ya esta en el carrito"})
   }
  
}


const putMenusCart = async (req, res) => {
    const {menuId} = req.params;
    const {query} = req.query;
    const body = req.body;
    
    // busco el menu en el carrito en
    const menuBuscado = await Request.findById(menuId);

    // si no hay query 'add' o 'del' 
    if (!query) {
    res.status(404).json({mensaje: "Debes enviar una query"});

    // si esta el menu en el carrito y quiero agregar
    }else if (menuBuscado && query==="add"){
        body.amount = body.amount + 1;
        await Request.findByIdAndUpdate(menuId,body,{new:true}).then(
            (menu)=>{res.json({mensaje:`El producto ${menu.title} fue actualizado`, menu})}
            )

        // si esta el menu en el carrito y quiero sacarlo
    } else if(menuBuscado&&query==="del"){
        body.amount = body.amount - 1;
        await Request.findByIdAndUpdate(menuId,body,{new:true}).then(
            (menu)=>{res.json({mensaje:`El producto ${menu.title} fue actualizado`, menu})}
            )
    } else {
        res.status(400).json({mensaje:"Ocurrio un error"})
    }

    


}


const deleteMenusCart = async (req,res) => {
    const {menuId}= req.params;

    //busco el producto en el carrito 
    const menuInCart = await Request.findById(_id);

    //busco el producto en la DB por el nombre del que esta en el carrito 
    const {title,picture,price,_id} = await Menu.findOne({title:menuInCart.title});

    //busco y elimino el menu con la id
    await Request.findByIdAndDelete(menuId);

    await Menu.findbyIdUpdate(_id,{inCart:false, title,picture,price},{new: true}).then(
        (menu)=>{res.json({mensaje:`El producto ${menu.title} fue eliminado del carrito`})}
    ).catch((error)=>{res.json({mensaje:"Hubo un error"})})
}


module.exports = {
    getMenusCart,
    addMenusCart,
    putMenusCart,
    deleteMenusCart,
    
}