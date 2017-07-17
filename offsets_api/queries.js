var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:fhatani@localhost:5432/offsets';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllDevelopments: getAllDevelopments,
  getSingleDevelopment: getSingleDevelopment,
  createDevelopment: createDevelopment,
  updateDevelopment: updateDevelopment,
  removeDevelopment: removeDevelopment
};


//SQL queries

function getAllDevelopments(req, res, next) {
  db.any('select * from development')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL developments'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleDevelopment(req, res, next) {
  var devID = parseInt(req.params.id);
  db.one('select * from development JOIN offset ON development.ID = offset.development_ID  where development.ID = $1', devID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE development'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createDevelopment(req, res, next) {
  req.body.year = parseInt(req.body.year);
  db.none('insert into development(year)' +
      'values(${year})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one development'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateDevelopment(req, res, next) {
  db.none('update development set year=$1 where id=$2',
    [parseInt(req.body.year), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated development'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function removeDevelopment(req, res, next) {
  var devID = parseInt(req.params.id);
  db.result('delete from development where id = $1', devID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} development`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
