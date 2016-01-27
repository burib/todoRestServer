var express = require('express');
var router = express.Router();
var dataSource = require('./../data');

/* GET items page. */
router
    .get('/', function (req, res) {
        res.type('application/json');
        res.send(dataSource.getItems());
    })
    .post('/', function (req, res) {
        res.type('application/json');
        res.send(dataSource.addItem(req.body.title));
    })
    .get('/:id', function (req, res) {
        res.type('application/json');
        res.send(dataSource.getItem(req.params.id));
    })
    .put('/:id', function (req, res) {
        res.type('application/json');
        res.send(dataSource.updateItem(req.params.id, req.body.item));
    })
    .delete('/:id', function (req, res) {
        res.type('application/json');
        res.send(dataSource.deleteItem(req.params.id));
    });

module.exports = router;
