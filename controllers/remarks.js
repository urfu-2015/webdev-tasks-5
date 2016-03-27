/**
 * Created by Надежда on 27.03.2016.
 */

module.exports.getRemarks = function(req, res, next) {
    res.render('remarks', {
        title: 'TODo-хИ' ,
        stylesheets: [
            {filename: 'layout'},
            {filename: 'remarks'}
        ]
    });
};

module.exports.newRemark = function(req, res, next) {

};

module.exports.redoRemark = function(req, res, next) {

};

module.exports.deleteRemark = function(req, res, next) {

};