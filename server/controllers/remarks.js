/**
 * Created by Надежда on 27.03.2016.
 */

const Remarks = require('../models/remarks');
Remarks.preload(
    function (err) {
        if (err != undefined) {
            console.log(err);
        }
    }
);


module.exports.getRemarks = function(req, res) {
    Remarks.getAll(function (err, data) {
        if (err != undefined) {
            console.log(err);
        }
        res.render('remark/remarks', {
            title: 'TODo-хИ' ,
            stylesheets: [
                'remarks',
            ],
            scripts: [
                'remarks'
            ],
            data
        });
    });

};

module.exports.getRemarksJSON = function(req, res) {
    Remarks.getAll(function (err, data) {
        if (err != undefined) {
            console.log(err);
            res.status(500);
            res.send('');
        } else {
            res.send({data})
        }
    })
};

module.exports.newRemark = function(req, res) {
    Remarks.create(req.body.text, function (err, data) {
        if (err != undefined) {
            console.log(err);
            res.status(500);
            res.send();
            return;
        }
        res.send(data);
    });
};

module.exports.redoRemark = function(req, res) {
    Remarks.redo(req.params.id, req.body.text, function (err, data) {
        if (err != undefined) {
            console.log(err);
            res.status(500);
            res.send();
            return;
        }
        res.send(data);
    });
};

module.exports.deleteRemark = function(req, res) {
    Remarks.remove(req.params.id, function (err) {
        if (err != undefined) {
            console.log(err);
        } else {
            res.send({});
        }
    });
};

module .exports.changeNumber = function(req, res, netx) {

};