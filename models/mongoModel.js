// Create a client 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connect client to mongod instance with uri to mission-ready db
var mongo_url = 'mongodb://localhost:27017/mission-ready';

var mongoDB;

//Connect 
MongoClient.connect(mongo_url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to MongoDB");
  // assign db to global
  mongoDB = db;
});

// create - insert object(data) into mongodb collection 
exports.create = function(collection, data, callback) {
  mongoDB.collection(collection).insertOne(data, function(err, status) {
    if (err) doError(err);
    var success = (status.result.n == 1 ? true : false);
    callback(success);
  });
}

// retrieve - retrieve an array of javascript objects from collection
exports.read = function(collection, query, callback) {
  //find(query) would return a cursor that could be iterated over
  // toArray will return all results from the query as an array
  mongoDB.collection(collection).find(query).toArray(function(err, docs) {
    if (err) doError(err);
    callback(docs);
  });
}


// update - perform update on objects in collection selected by filter
exports.update = function(collection, filter, update, callback) {
  //set upsert to default false to prevent insertion of new objects
  mongoDB.collection(collection).updateMany(filter, update, {
    upsert: true
  }, function(err, status) {
    if (err) doError(err);
    callback('Modified ' + status.modifiedCount + ' and added ' + status.upsertedCount + " documents");
  });
}

// mDelete - delete object selected by filter from collection
exports.mDelete = function(collection, filter, callback) {
  mongoDB.collection(collection).deleteMany(filter, function(err, status) {
    if (err) doError(err);
    callback('Deleted ' + status.deletedCount)
  });
}


//handle errors
var doError = function(e) {
  console.error("ERROR: " + e);
  throw new Error(e);
}