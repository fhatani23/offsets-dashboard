var express = require('express');
var router = express.Router();

var db = require('../queries');



router.get('/api/developments', db.getAllDevelopments);
router.get('/api/developments/:id', db.getSingleDevelopment);
router.post('/api/development', db.createDevelopment);
router.put('/api/development/:id', db.updateDevelopment);
router.delete('/api/development/:id', db.removeDevelopment);


module.exports = router;
