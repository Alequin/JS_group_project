var express = require('express');
var apiRouter = new express.Router();
var mongoClient = require("mongodb").MongoClient;
var path = require("path");

mongoClient.connect("mongodb://localhost:27017/solarSystem", function(err, db){
  if(err){
    console.log(err);
    return;
  }

  apiRouter.get("/solar_system", function(req, res) {
    db.collection("solarSystem").find().toArray(function(err, result) {
      res.json(result[0]);
    });
  });

  apiRouter.get("/planets", function(req, res){
    db.collection("solarSystem").find().toArray(function(err, result){
      res.json(result[0].planets);
    });
  });

  apiRouter.get("/planets/:id", function(req, res){
    db.collection("solarSystem").find().toArray(function(err, result){
      res.json(result[0].planets[req.params.id]);
    });
  });

  console.log("Connected to database");
})

module.exports = apiRouter;