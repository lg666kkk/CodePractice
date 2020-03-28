const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function (req, res) {
  res.render('index.html')
})
router.get('/login', function (req, res) {
  res.render('login.html')
})
router.post('/login', urlencodedParser, function (req, res) {
  console.log(req.body);
})
router.get('/register', function (req, res) {
  res.render('register.html')
})
router.post('/register', urlencodedParser, function (req, res) {
  console.log(req.body);
})
module.exports = router