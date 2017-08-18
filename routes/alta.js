var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('alta');
});

router.post('/', function (req, res, next) {
  var db = req.db;
  var usuarios = db.get('usuarios');
  usuarios.count({ /*query de MongoDB*/ }).then((cuenta) => {
if(cuenta>0){

}else{
  
}
  })
});

module.exports = router;