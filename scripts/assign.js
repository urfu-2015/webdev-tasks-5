module.exports = Object.assign || function (obj1, obj2) {
        var obj3 = {},
            attrname;
        for (attrname in obj1) {
            if (obj1.hasOwnProperty(attrname)) {
                obj3[attrname] = obj1[attrname];
            }
        }
        for (attrname in obj2) {
            if (obj2.hasOwnProperty(attrname)) {
                obj3[attrname] = obj2[attrname];
            }
        }
        return obj3;
    };
