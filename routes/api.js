/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { schemafindById, schemafind, schemaCreate, schemaUpdate, schemaDelete} = require('./schemaFun');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      let objToFind = {...req.query, ...req.body};
      schemafind(objToFind).then(d => {
        res.json(d);
      })
    })
    
    .post(function (req, res){
      let objToCreate = {...req.query, ...req.body};
      schemaCreate(objToCreate).then(d => {
        res.status(200).json(d);
      })
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      schemaDelete({}).then(d => {
        res.status(200).json(d);
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let objToFind = {_id: req.params.id};
      schemafindById(objToFind).then(d => {
        res.json(d);
      })
    })
    
    .post(function(req, res){
      let objToupdate = {...req.params, ...req.body};
      schemaUpdate(objToupdate).then(d => {
        res.status(200).json(d);
      })
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      schemaDelete({_id: bookid}).then(d => {
        res.status(200).json(d);
      })
    });
  
};
