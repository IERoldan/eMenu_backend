const Menu = require('../schemas/menu.schema');


async function addMenu(req, res){
    try{
        if(!req.body.title || !req.body.description || !req.body.price) {
            return res.status(400).send({error:'Falta un campo obligatorio'})
        }
        let newMenu = new Menu(req.body);
        await newMenu.save();
        res.send({menuNuevo : newMenu});
    } catch(error){
        res.status(404).send(error)
    }
};

async function getMenus(req, res) {
    const menusDB= await Menu.find();
   return  res.json({menusDB})
};

async function getMenu(req, res){
    const menuId = req.query.menu_id;
    const menu = await Menu.findById(menuId);
    if(!menu) return res.status(404).send({msg: 'No se encontro el menu requerido'});
    return res.status(200).send({
        menu: menu,
    });
};

async function deleteMenu(req, res){
    const MenuIdDelete = req.query.menu_id_delete;
    const menuDelete = await Menu.findByIdAndDelete(MenuIdDelete);
    if (!menuDelete) return res.status(404).send({msg: 'No se encontro el menú que desea eliminar'})
    return res.status(200).send({ msg:`El menú ${menuDelete.title} ha sido eliminado exitosamente`})
}

async function updateMenu(req, res){
    const id = req.params.upd_id;
    const menuChanges = req.body;
    const updatedMenu = await menu.findbyIdUpdate(id, menuChanges, {new:true});
    if (!updatedMenu) return res.status(404).send({ msg:'No se encuentra el menú que deseas modificar'})
    return res.status(200).send(updatedMenu);
};


module.exports = {
    addMenu,
    getMenu,
    getMenus,
    deleteMenu,
    updateMenu,
}
