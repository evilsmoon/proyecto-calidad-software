const { response } = require("express")
const jwt = require('jsonwebtoken')

const validarJWT = (req ,res = response, next) => {
    const token = req.header('Authorization');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'el token no ha sido enviado'
        })
    }

    try {
        
        const { uid, name } = jwt.verify( token.replace("Bearer ", ""), process.env.SECRET_JWT_SEED );
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
        
    }

    next();
}

module.exports = {
    validarJWT
}