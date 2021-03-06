var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

// import passport and passport-jwt modules
const passport = require('passport')
const passportJWT = require('passport-jwt')
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'wowwow'
router.use(bodyParser.json());
router.use(passport.initialize())
router.post('/', function (req, res, next) {
    // console.log(req.body)
    let token = req.body.token
    let IDEmp = jwt.decode(token)
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")

    
    //  console.log(req.body.KKS4_Equip_Withdraw)
    //  console.log(req.body.Count_withdraw)
    //  console.log(req.body.Date_Withdraw)
    //  var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('1379900073717', 'AA',' 1','2020-02-07')`;
    // var check = `SELECT * FROM withdraw WHERE IDEmp = '1409800338149'AND KKS1 = '10'AND KKS4 = 'AA'`
    var check = `SELECT * FROM broke_equipment WHERE KKS1 = '${req.body.KKS1}'AND KKS4 = '${req.body.KKS4}'`
    db.query(check, function (err, rows, fields){
        if(rows[0]===undefined){
            var sql = `INSERT INTO broke_equipment(KKS1,KKS4,CountBroke) VALUES('${req.body.KKS1}','${req.body.KKS4}', '${req.body.CountBroke}')`;
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                    err : console.error()
                })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "create"
        })
    })
        }else{
            let Count_Broke = rows[0].CountBroke + req.body.CountBroke
            var sql = `UPDATE broke_equipment SET CountBroke = '${Count_Broke}' WHERE KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`;
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                    err : console.error()
                })
            }

            res.send({
                suscess: "update"
            })
        
    })
    }
    })
});

module.exports = router;