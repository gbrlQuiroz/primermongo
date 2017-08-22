var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('alta');
});

router.post('/', function (req, res, next) {
  var db = req.db;
  var usuarios = db.get('usuarios');
  usuarios.count({
    usuario: req.body.txtUsuario,
    clave: req.body.txtClave
  }).then((cuenta) => {
    console.log('--->' + cuenta);
    if (cuenta > 0) {
      res.render('alta', {
        mensaje: 'Error!: Datos duplicados'
      });
    } else {
      usuarios.insert({
        clave: req.body.txtClave,
        usuario: req.body.txtUsuario,
        nomCompleto: req.body.txtNombreC
      }).then((error) => {
        res.redirect('/');
        //res.render('index');
      }).catch((error) => {
        console.log(error);
      });
    }
  });
  //db.close();
});

module.exports = router;