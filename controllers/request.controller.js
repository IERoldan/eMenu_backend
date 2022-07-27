const Request = require('../schemas/request.schema');
const Menu = require('../schemas/menu.schema');

const getMenusCart = async (req, res) => {
    const menusCart = await Request.find();
    if (menusCart) {
        res.json({
            menusCart
        })
    } else {
        res.json({
            mensaje: "No hay productos en el carrito"
        })
    }
}


const addMenusCart = async (req, res) => {
    const {
        title,
        picture,
        price
    } = req.body;

    // Me fijo si esta el producto
    const estaEnMenu = await Menu.findOne({
        title
    });

    // Me fijo si todos los campos vienen con info
    const noEstaVacio = title !== "" && picture !== "" && price !== "";

    // me fijo si el menu ya esta en el carrito 
    const estaEnCarrito = await Request.findOne({
        title
    });


    // si nos envian algo y no esta en el carrito lo agrego
    if (noEstaVacio && !estaEnCarrito) {

        const newMenuInCart = new Request({
            title,
            picture,
            price,
            amount: 1
        })

        // y actualizo la prop inCart: true en nuestros menus 
        await Menu.findByIdAndUpdate(
            estaEnMenu?._id, {
                inCart: true,
                title,
                picture,
                price
            }, {
                new: true
            }
        ).then((menusCart) => {
            2
            newMenuInCart.save();
            res.json({
                mensaje: "El menu fue agregado correctamente",
                menusCart
            })
        }).catch((error) => console.log(error))

        // y si esta avisamos 
    } else if (estaEnCarrito) {
        res.status(400).json({
            mensaje: "El producto ya esta en el carrito"
        })
    }

}


const putMenusCart = async (req, res) => {
    const {
        menuId
    } = req.params;
    const {query} = req.query;
    const body = req.body;

    // busco el menu en el carrito en
    const menuBuscado = await Request.findById(menuId);

    // si no hay query 'add' o 'del' 
    if (!query) {
        res.status(404).json({
            mensaje: "Debes enviar una query"
        });

    // si esta el menu en el carrito y quiero agregar
    } else if (menuBuscado && query === "add") {
        body.amount = body.amount + 1;
        await Request.findByIdAndUpdate(menuId, body, {
            new: true
        }).then(
            (menusCart) => {
                res.json({
                    mensaje: `El producto ${menusCart.title} fue actualizado`,
                    menusCart
                })
            }
        )

        // si esta el menu en el carrito y quiero sacarlo
    } else if (menuBuscado && query === "del") {
        body.amount = body.amount - 1;
        await Request.findByIdAndUpdate(menuId, body, {
            new: true
        }).then(
            (menusCart) => {
                res.json({
                    mensaje: `El producto ${menusCart.title} fue actualizado`,
                    menusCart
                })
            }
        )
    } else {
        res.status(400).json({
            mensaje: "Ocurrio un error"
        })
    }




}


const deleteMenusCart = async (req, res) => {
    const {
        menuId
    } = req.params;

    //busco y elimino el menu con la id
    const menuBorrado = await Request.findByIdAndDelete(menuId);

    if (menuBorrado) {
        return res.json({
            message: `Product ${menuBorrado.title} delete succesfully`
        })
    } else {
        return res.json({
            message: "Product not found"
        })
    }
}




module.exports = {
    getMenusCart,
    addMenusCart,
    putMenusCart,
    deleteMenusCart,

}