var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    var db = req.db;
    var usuarios = db.get('usuarios');
    /* usuarios.count({
        nombre: req.body.txtUser,
        clave: req.body.txtClave
    }).then(function (cuenta) {
        if (cuenta > 0) {
            console.log(usuario);
            res.render('bienvenido', {
                usuario: usuario
            });
        } else {
            res.render('index', {
                mensaje: 'Error!: usuario no encontrado'
            });
        }
        db.close();
    }); */
    usuarios.find({
        usuario: req.body.txtUsuario,
        clave: req.body.txtClave
    }).then(function (docs) {
        if (Object.keys(docs).length > 0) {
            res.render('bienvenido', {
                datos: docs
            });
        } else {
            res.render('index', {
                mensaje: 'Error!: Usuario no encontrado',
                validado: false
            });
        }
    })
});


module.exports = router;