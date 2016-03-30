/**
 * Created by Надежда on 27.03.2016.
 */

const Remarks = require('../models/remarks');
Remarks.preload(
    function (err) {
        if (err != undefined) {
            console.log(err);
        };
    }
);


module.exports.getRemarks = function(req, res, next) {
    Remarks.getAll(function (err, data) {
        if (err != undefined) {
            console.log(err);
        }
        res.render('remarks', {
            title: 'TODo-хИ' ,
            stylesheets: [
                'layout',
                'remarks'
            ],
            scripts: [
                'remarks'
            ],
            data
        });
    });

};

module.exports.newRemark = function(req, res, next) {

};

module.exports.redoRemark = function(req, res, next) {

};

module.exports.deleteRemark = function(req, res, next) {

};

module .exports.changeNumber = function(req, res, netx) {

};