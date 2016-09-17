//include the mongo model
var mongoModel = require('../models/mongoModel.js')
var apiRoutes = require('apiRoutes.js')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var crypto = require('crypto');

exports.init = function(app) {

  app.get('/', apiRoutes.sendEmail)

  app.get('/mongo/:collection', doRead); // CRUD Retrieve

  app.put('/mongo/:collection', doCreate); // CRUD Create

  app.post('/mongo/:collection', doUpdate); // CRUD Update

  app.delete('/mongo/:collection', doDelete); //CRUD Delete

}

doCreate = function(req, res) {
  //return if there is nothing to create
  console.log(req.body);
  if (Object.keys(req.body).length == 0) {
    res.send(false);
    return;
  }

  console.log(req.params);
  mongoModel.create(req.params.collection, req.body,
    function(result) {
      res.send(result);
    });
}


doRead = function(req, res) {
  var filter = req.query.find ? JSON.parse(req.query.find) : {};
  mongoModel.read(req.params.collection, filter,
    function(modelData) {
      res.send(modelData);
      return modelData;
    });
}


doUpdate = function(req, res) {
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};

  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.send("No update operation defined");
    return;
  }

  var update = JSON.parse(req.body.update);
  mongoModel.update(req.params.collection, filter, update,
    function(status) {
      res.send(status);
    });
}


doDelete = function(req, res) {
  var filter = req.body.find ? JSON.parse(req.body.find) : {};

  mongoModel.mDelete(req.params.collection, filter,
    function(status) {
      res.send(status);
    });
}