'use strict';

var transform = require('transform-pouch').transform;
var triplesec = require('triplesec');

function cryptoInit(password) {

  function generateTriplesecEncryptor(password) {

      const key = new triplesec.Buffer(password);
      return triplesec.Encryptor({key: key});
  }

  function generateTriplesecDecryptor(password) {

      var key = new triplesec.Buffer(password);
      return triplesec.Decryptor({key: key});
  }

  var db = this;
  var turnedOff = false;
  var ignore = ['_id', '_rev', '_deleted'];
  var encryptor = generateTriplesecEncryptor(password);
  var decryptor = generateTriplesecDecryptor(password);


  db.transform({
    incoming: function (doc) {

        if(turnedOff) {
          return doc;
        }

        var doc_json = JSON.parse(doc);

        var new_doc = {
            _id: doc._id,
            _rev: doc._rev
        };

        if(typeof doc._deleted !== "undefined") {

          new_doc._deleted = doc._deleted;

        }

        encryptor.run({
            data: doc_json
        }, function(err, buff) {

            new_doc.doc_json = "{}";

            if(!err) {
                new_doc.doc_json = buff.toString("hex");
            }
        });

        return new_doc;

    },
    outgoing: function (doc) {

        if(turnedOff) {
            return doc;
        }

        var new_doc = doc;

        decryptor.run({
            data: doc.doc_json

        }, function(err, buff) {

            if(!err) {
                new_doc = buff.toString();
            }

        });

        return new_doc;
    }
  });
}

exports.transform = transform;
exports.enableCrypto = cryptoInit;

if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(module.exports);
}