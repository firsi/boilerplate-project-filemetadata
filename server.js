'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});





app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
    const file = req.file;
    
    if(!file){
      const error = new Error('please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
  
    res.json({name:file.originalname,
              type: file.mimetype,
              size:file.size
             });
})
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
