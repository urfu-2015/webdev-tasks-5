/**
 * Created by Надежда on 27.03.2016.
 */
'use strict';

const fs = require('fs');
const fileWithData = './user_data/remarks.json';

class Remark{
    //static memoryStorage = {'remarks': []};
    constructor(params) {
        this.data = new Date().toString();
        this.text = params.text;
    }

    //эти метода снаруже лучше не использовать
    //для этого есть статические методы
    set setNewText(text) {
        this.text = text;
    }

    static save (callback, data) {
        let strMem= JSON.stringify(Remark.memoryStorage);
        fs.writeFile(fileWithData, strMem,(err) => {
            if (err != undefined) {
                callback(err);
            } else {
                callback(undefined, data);
            }
        });
    }

    static preload (callback) {
        fs.readFile(fileWithData, (err, data) => {
                if (err != undefined) {
                    callback(err);
                }
                Remark.memoryStorage = JSON.parse(data);
                //console.log(Remark.memoryStorage);
                callback(undefined);
            }
        );
    };

    static create (text, callback) {
        let id = Remark.memoryStorage.remarks.length;
        Remark.memoryStorage.remarks.push(new Remark({text}));
        Remark.save(callback, {id});
    };

    static redo (id, text, callback) {
        if (id < Remark.memoryStorage.remarks.length) {
            Remark.memoryStorage.remarks[id].setNewText(text);
            Remark.save(callback);
        } else {
            callback('ErrorInRedo');
        }
    };

    static remove (id, callback) {
        if (id < Remark.memoryStorage.remarks.length) {
            //удаление
            Remark.memoryStorage.remarks.splice(id, 1);
            Remark.save(callback);
        } else {
            callback('ErrorInDelete');
        }
    };

    static changeId (id, callback) {
        if (id < Remark.memoryStorage.remarks.length) {
            //удаление
            let element = Remark.memoryStorage.remarks.splice(id, 1);
            Remark.memoryStorage.remarks.splice(id, 0, element);
            Remark.save(callback);
        } else {
            callback('ErrorChangeId');
        }
    };

    static getAll (callback) {

        callback(undefined, Remark.memoryStorage.remarks);
    }
};


module.exports = Remark;