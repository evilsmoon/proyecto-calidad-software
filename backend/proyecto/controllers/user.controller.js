const { response } = require('express');
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req,res = response) => {
    const { email, name, password } = req.body;
    try {
        //verificar email
        const usuario = await Usuario.findOne({ email });
        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }
        //crear usuario modelo
        const Dbusuario = new Usuario ( req.body )

        //hash de la contraseña
        const salt = bcrypt.genSaltSync();
        Dbusuario.password = bcrypt.hashSync( password, salt );

        //jsonwebtoken
        const token = await generarJWT( Dbusuario.id, Dbusuario.name, Dbusuario.role );

        //crear usuario de DB
        await Dbusuario.save();
        
        //respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: Dbusuario.id,
            name,
            token,
            acceso: Dbusuario.role
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const getUser = async(req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
}

const updateUser = async( req, res ) => {
    const { id } = req.params;
    // const { email, name, phone, ci, password, role, image } = req.body;
    // const Dbusuario = {
    //     name,
    //     email,
    //     phone,
    //     ci,
    //     password,
    //     role,
    //     image
    // }

    const Dbusuario = req.body

    //jsonwebtoken
    const token = await generarJWT( id, Dbusuario.name, Dbusuario.role );
    //actualizar usuario de DB
    await Usuario.findByIdAndUpdate(id,{$set:Dbusuario},{new: true})
    //respuesta exitosa
    res.status(201).json({
        ok: true,
        uid: id,
        name: Dbusuario.name,
        token,
        acceso: Dbusuario.role
    })
}

const updatePassword = async( req, res ) => {
    const { id } = req.params;
    // const { email, name, phone, ci, password, role, image } = req.body;
    // const Dbusuario = {
    //     name,
    //     email,
    //     phone,
    //     ci,
    //     password,
    //     role,
    //     image
    // }
    const Dbusuario = req.body

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    Dbusuario.password = bcrypt.hashSync( Dbusuario.password, salt );

    //jsonwebtoken
    const token = await generarJWT( id, Dbusuario.name, Dbusuario.role );

    //actualizar usuario de DB
    await Usuario.findByIdAndUpdate(id,{$set:Dbusuario},{new: true})

    //respuesta exitosa
    res.status(201).json({
        ok: true,
        uid: id,
        name: Dbusuario.name,
        token,
        acceso: Dbusuario.role
    })
}

const loginUser =  async (req,res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email }); 
        if ( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no Válidas'
            })
        }

        //verificar password
        const validar = bcrypt.compareSync( password, usuario.password )
        if ( !validar ){
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no Válidas'
            })
        }

        //generar jwt
        const token = await generarJWT( usuario.id, usuario.name, usuario.role );
        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
            acceso: usuario.role
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async (req,res = response) => {
    const { uid, name, role } = req;
    const token = await generarJWT( uid, name, role );
    return res.json({
        ok: true,
        uid,
        acceso: role,
        name,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
    getUser,
    updateUser,
    updatePassword
}