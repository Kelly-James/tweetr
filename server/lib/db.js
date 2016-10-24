"use strict";

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/tweetr';

module.exports = {
  connect: function(onConnect){
    MongoClient.connect(MONGODB_URI, (err, rawDbConnection) => {
      if (err) {
        console.log("OH MY GOD, DB couldn't connect");
        throw err;
      } else {
        const dbMethods = {
          saveTweet: (data) => {
            rawDbConnection.collection('tweets').save(data);
          },
          getTweets: (callback) => {
            console.log("in DB.getTweets");
            rawDbConnection.collection('tweets').find().toArray(callback);
          }
        }
        onConnect(dbMethods);
      }
    })
  }
}






// console.log('Connecting to Mongo DB running at: ${MONGODB_URI}');

// MongoClient.connect(MONGODB_URI, (err, db) => {

//   if(err) {
//     console.log('Could not connect! Unexpected error. Details below.');
//   }

//   console.log('Connected to the database!');
//   let collection = db.collection('tweets');

//   console.log('Retrieving documents for the "tweets" collection...');
//   collection.find().toArray((err, results) => {
//     console.log('results: ', results);

//     console.log('Disconnecting from Mongo!');
//     db.close();
//   });
// });
