const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image/png')) {
      cb(new Error('Seuls les .png sont autorisés'))
    }
    cb(null, true);
  },
  limits: {
    fileSize : 3 * 1024 * 1024  // 3Mo max
  },
  dest: 'tmp/'
});
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploaddufichier', upload.array('monfichier', 3), (req, res, next) => {
  req.files.forEach(e => {
    fs.rename(e.path, 'public/images/' + e.originalname, err => {
      if(err) throw err;
    });
  });
  res.end();
});


module.exports = router;

