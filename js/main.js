jQuery(document).ready(function() {

    Handlebars.registerHelper('chain', function () {
        var helpers = [], value;
        $.each(arguments, function (i, arg) {
            if (Handlebars.helpers[arg]) {
                helpers.push(Handlebars.helpers[arg]);
            } else {
                value = arg;
                $.each(helpers, function (j, helper) {
                    value = helper(value, arguments[i + 1]);
                });
                return false;
            }
        });
        return value;
    });

    Handlebars.registerHelper('sectid', function(path) {
        return "section-" + path;
    });

    Handlebars.registerHelper('naCheck', function(str) {
        return (str.length == 0 ? 'NA' : str );
    });

    Handlebars.registerHelper('commalist', function(items, options) {
      var out = '';

      for(var i=0, l=items.length; i<l; i++) {
        out = out + options.fn(items[i]) + (i!==(l-1) ? ",":"");
      }
      return out;
    });

    Handlebars.registerHelper('toUpperCase', function(str) {
      return str.toUpperCase();
    });

    Handlebars.registerHelper('link', function(url) {
      url  = Handlebars.Utils.escapeExpression(url);

      var result = '<a href="' + url + '">' + "Register Here" + '</a>';

      return new Handlebars.SafeString(result);
    });

    function renderData(data) {
        var source    = jQuery('#data-template').html();
        var template  = Handlebars.compile(source);
        var container = jQuery('.featured-datasets');

        // cycle over array of data and render each cat
        data.map(function(cat) {
            var html = template(cat);
            container.append(html)
        });
    };

    function renderNav(data) {
        var source    = jQuery('#data-nav').html();
        var template  = Handlebars.compile(source);
        var container = jQuery('.featured-nav');

        // cycle over array of data and render each cat
        data.map(function(cat) {
            var html = template(cat);
            container.append(html)
        });
    };

    function onDataSuccess(dataResult) {
        var data       = dataResult.data;        // loaded from JSON
        var dataMap     = {}

        // cycle over data to build map
        data.map(function(cat) {
            dataMap[cat.uid] = cat;
        });

        // fill it
        renderNav(data);
        renderData(data);
    };

    $.getJSON('cda_courses.json', function(data){ onDataSuccess(data); });


});

// Affix Sidebar
(function($){

$(document).ready(function(){
var $window = $(window),
        $body = $(document.body),
        $doc = $('.doc-container'),
        $nav = $doc.find ('.doc-nav');

    // make the document navigation affix when scroll
    $('#featured-nav').affix({
      offset: {
        top: function () {
          return 156; // replace with your top position to start affix
        }
      }
    });

    // change navigation active according to scroll
    $body.scrollspy({
      target: '.doc-sidebar'
    });

});

})(jQuery);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("app.home").controller("HomeCtrl",["$scope",function(o){o.version="0"}]);
},{}],2:[function(require,module,exports){
module.exports=angular.module("app.home",[]),require("./HomeCtrl");
},{"./HomeCtrl":1}],3:[function(require,module,exports){
angular.module("app",[require("./home").name]);
},{"./home":2}]},{},[3])
