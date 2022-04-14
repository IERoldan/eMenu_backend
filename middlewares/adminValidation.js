const adminValidation = (req, res, next) => {
    if(req.user.role !== 'ADMIN_ROLE' || req.user.role !== 'SUPER_ADMIN_ROLE') return res.status(401).send('No tienes el permiso necesario para borrar este usuario');
    next();
}

module.exports = adminValidation;