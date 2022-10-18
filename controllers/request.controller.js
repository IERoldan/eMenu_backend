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


    const estaEnMenu = await Menu.findOne({
        title
    });


    const noEstaVacio = title !== "" && picture !== "" && price !== "";


    const estaEnCarrito = await Request.findOne({
        title
    });


    if (noEstaVacio && !estaEnCarrito) {

        const newMenuInCart = new Request({
            title,
            picture,
            price,
            amount: 1
        })

  
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


    const menuBuscado = await Request.findById(menuId);

    if (!query) {
        res.status(404).json({
            mensaje: "Debes enviar una query"
        });

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