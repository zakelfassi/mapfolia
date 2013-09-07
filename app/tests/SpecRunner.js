require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: "vendor/jquery/jquery",
    underscore: "vendor/underscore-amd/underscore",
    backbone: "vendor/backbone-amd/backbone",
    text: "vendor/text/text",
    jasmine: '../tests/lib/jasmine-1.3.1/jasmine',
    'jasmine-html': "../tests/lib/jasmine-1.3.1/jasmine-html",
    sinon: "../tests/lib/sinon-1.7.3",
    spec: '../tests/spec/'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    sinon: {
      exports: 'sinon'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();
 
  jasmineEnv.addReporter(htmlReporter);
 
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
 
  var specs = [];

  specs.push('../tests/spec/LocationSpec');
  specs.push('../tests/spec/PictureSpec');
  specs.push('../tests/spec/PicturesSpec');
 
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
 
});