var express = require('express');
var cheerio = require('cheerio');
var axios = require('axios');
var cleaner = require('clean-html');
var router = express.Router();

var options = {
  'add-remove-tags': ['section'],
  'remove-attributes': ['id', 'class', 'width', 'height', 'data-backw', 'data-copyright', 'data-ratio', 'data-backh', 'data-cropselx1', 'data-cropselx2', 'data-cropsely1', 'data-cropsely2', 'data-w', 'data-s', 'data-type'],
  'remove-comments': true,
  'remove-empty-tags': []
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/api/', function(req, res, next) {
  const { url } = req.body;

  axios
    .get(url)
    .then(function (response) {
      var $ = cheerio.load(response.data, { decodeEntities: false });

      var content = $('.rich_media_content');

      content.find('img').each(function(idx, ele){
        var src = $(ele).data('src');

        $(ele).attr('src', src);
        $(ele).removeAttr('data-src');
        $(ele).removeAttr('style');
      });

      content.find('p').each(function(idx, ele){
        $(ele).removeAttr('style');
      });

      cleaner.clean(content.html(), options, function(html) {
        res.send({
          html,
        })
      })
    })
    .catch(function (err) {
      console.log(err);
    })
});

module.exports = router;
