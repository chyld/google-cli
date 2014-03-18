var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');

exports.search = function(q, num, start, cb){
  query = generateQuery(q, num, start);

  request(query, function(err, res, body){
    var $ = cheerio.load(body);
    var $results = $('ol li.g');

    var links = _.map($results, function(v, k){
      var $li = $(v);
      if(isValid($li)){
        var o = {};
        o.url = parseUrl($li);
        o.text = parseText($li);
        return o;
      }
    });

    links = _.compact(links);
    cb(links);
  });
};

function isValid($li){
  var isTitle = $li.find('h3.r > a').length;
  var isUrl = $li.find('div.s cite').length;

  return isTitle && isUrl;
}

function parseText($li){
  var text = $li.find('h3.r > a').text();
  return text;
}

function parseUrl($li){
  var url = $li.find('div.s cite').text();
  var isProtocol = (/^https/).test(url);

  if(!isProtocol){
    url = 'http://' + url;
  }

  return url;
}

function generateQuery(q, num, start){
  num = num || 10;
  start = start || 0;

  return 'https://www.google.com/search?q=' +q+ '&num=' +num+ '&start=' +start;
}
