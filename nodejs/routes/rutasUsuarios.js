var express = require('express');
//Creamos el objeto para definir las rutas
var router = express.Router();
//Importamos el modelo que ejecutara las sentencias sql
var usuariosModel = require('../models/usuarios');
//Coger todos los usuarios
router.get('/admin/usuarios',function(req,res){
	var idToken = req.query.idToken;
	usuariosModel.listAllUsers(idToken, function(data){
		res.status(200).json(data);
	});
});
//Insertar un usuario
router.post('/admin/usuario',function(req,res){
	var idToken = req.body.idToken;
	var user = {
		email : req.body.email,
		password : req.body.password
	};
	usuariosModel.createUser(idToken, user, function(data){
		res.status(200).json(data);
	});
});
//Modificar usuario
router.post('/admin/setAdmin',function(req,res){
	var idToken = req.body.idToken;
	var	uid = req.body.uid;
	var	adminval = req.body.adminval;
	usuariosModel.setAdmin(idToken, uid, adminval, function(data){
		res.status(200).json(data);
	});
});
//Borrar un usuario
router.post('/admin/usuario/remove',function(req,res){
	var idToken = req.body.idToken;
	var uid = req.body.uid;
	usuariosModel.deleteUser(idToken, uid, function(data){
		res.status(200).json(data);
	});
});

module.exports = router;
