// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var str = localStorage.getItem('x');
var xObject = JSON.parse(str);
console.log(str);
var hashMap = xObject || [{
  "logo": "A",
  "url": "https://www.acfun.cn"
}, {
  "logo": "B",
  "url": "https://www.bilibili.com"
}];
var $last = $('.lastLi');

var simpleUrl = function simpleUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除以/结尾的字符串
}; // 存网站的思路 1.网站离开的时候存 2.重新加载读取


var render = function render() {
  $('.siteList').find('li:not(.lastLi)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n                \n                    <div class=\"site\">\n                        <div class=\"logo\">\n                            ".concat(node.logo[0], "\n                        </div>\n                        <div class=\"link\">").concat(simpleUrl(node.url), "</div>\n                        <div class=\"close\">\n                        <svg class=\"icon\" >\n                        <use xlink:href=\"#icon-wrong\"></use>\n                        </svg>\n                        </div>\n                    </div>\n            </li>")).insertBefore($last);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation(); //阻止冒泡事件

      hashMap.splice(index, 1); //删除对应的

      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入新增网站');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log(url);
  hashMap.push({
    "logo": simpleUrl(url)[0].toUpperCase(),
    "url": url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$('.searchInput').on('input', function (e) {
  e.stopPropagation(); //阻止input输入框的查询内容影响到按键事件
});
$(document).on('keypress', function (e) {
  var key = e.key; //console.log(key)

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase === key) {
      window.open(hashMap[i].url);
      break;
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6cfc7019.js.map