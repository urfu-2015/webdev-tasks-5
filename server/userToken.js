module.exports = (req, res, next) => {
    if (req.cookies['userToken']) {
        console.log('Returning user');
        next();
    } else {
        console.log('New user');
        require('crypto').randomBytes(40, function(err, buffer) {
            var token = buffer.toString('hex');
            // console.log(token);
            res.cookie('userToken' , token);
            next()
        });
    }
};