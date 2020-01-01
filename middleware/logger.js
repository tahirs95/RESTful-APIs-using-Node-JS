function log(req, res, next){
    console.log(req.body)
    console.log("logging....");
    next();
}

module.exports = log;