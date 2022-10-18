const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/config').secret;
const salt = 10;

async function addUser(req, res){
    try{
        if(!req.body.password || !req.body.fullname || !req.body.email) {
            return res.status(400).send({error:'Falta un campo obligatorio'})
        }
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let newUser = new User(req.body);
        await newUser.save()
        res.send({usuarioNuevo : newUser})
    } catch(error){
        res.status(404).send(error)
    }
};

async function getUsers(req, res) {
    const usuariosDB= await User.find();
    return res.json({usuariosDB})
};

async function getUser(req, res){
    const userId = req.params;
    const user = await User.findById(userId);
    if(!user) return res.status(404).send({msg: 'No se encontro el usuario requerido'});
    return res.json({user})
    };


async function deleteUser(req, res){

    const {_id} = req.params;
    const user = await User.findByIdAndDelete({_id:_id})

    if(user){
        return res.json({message:"User delete succesfully"})
    }else{
        return res.json({message:"Error"})
    }
}

async function updateUser(req, res){
    const {userId} = req.params;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, body, {new:true});
    if (!updatedUser) {
        return res.json({ msg:"We couldn't find the menu you want to edit"})
    }else{
    return res.json({updatedUser});}
};

async function loginUser (req, res){
    try{
       const email = req.body.email;
       const password = req.body.password;
       const userDB = await User.findOne({email});
       if(!userDB) return res.status(404).send({msg:'El usuario referido no existe'})
       const fitPassword = await bcrypt.compare(password, userDB.password);
       if(!fitPassword) return res.status(401).send({msg:'Alguno de los datos ingresados no es correcto'});
       userDB.password = undefined;
       const token = jwt.sign(userDB.toJSON(), secret, {expiresIn:3600});
       return res.status(200).send({
           ok:true,
           msg:'Login correcto',
           user: userDB,
           token
       });
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    addUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    loginUser
}
