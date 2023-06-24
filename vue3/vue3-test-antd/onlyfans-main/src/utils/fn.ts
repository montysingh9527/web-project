export const myFn = {
  setGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  setUuid() {
    return "xxx4xx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
  //获取url的参数
  getLoginQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  //多选框
  checkBox(ev, item, data) {
    let array;
    if (item.DefaultValue) {
      array = item.DefaultValue.split(",");
    } else {
      array = [];
    }
    if (ev.target.checked) {
      array.push(data);
    } else {
      const index = array.indexOf(data);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
    if (array.length) {
      item.DefaultValue = array.join(",");
    } else {
      item.DefaultValue = "";
    }
  },
  radioBox(item, data) {
    item.DefaultValue = data;
  },
  formatDecimal(num, dec = 2) {
    return (Math.round(num * 100) / 100).toFixed(dec);
  },
  // 地址http头处理
  httpOrHttps(str) {
    if (!str) {
      return;
    }
    if (!str || /^http:\/\//.test(str) || /^https:\/\//.test(str)) {
      return str;
    } else {
      return "http://" + str;
    }
  },
  // 判断是否是app
  judgeTerminal() {
    //判断是否是AndroidApp
    var browser = {
      versions: (function () {
        var u = navigator.userAgent;
        //移动终端浏览器版本信息
        return {
          trident: u.indexOf("Trident") > -1, //IE内核
          presto: u.indexOf("Presto") > -1, //opera内核
          webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
          gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
          iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf("iPad") > -1, //是否iPad
          webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
          wx: u.indexOf("MicroMessenger") > -1, //是否是微信
          hasVersion: u.indexOf("Version") > -1,
        };
      })(),
    };
    //是否是app
    function isNewApp() {
      var isApp = false;
      if (browser.versions.ios) {
        try {
          isApp = true;
          window["webkit"].messageHandlers.mobileClient.postMessage("");
        } catch (error) {
          isApp = false;
        }
      } else {
        if (window["mobile_client"] != undefined) {
          isApp = true;
        }
      }
      return isApp;
    }
    //判断App
    function judgeApp() {
      let isApp = false;
      // 若window.android_Web不是undefined，则是在安卓app中
      if (browser.versions.android && window["android_Web"] != undefined) {
        isApp = true;
      } else if (browser.versions.ios) {
        try {
          isApp = true;
          window["webkit"].messageHandlers.testAAApp.postMessage("");
        } catch (error) {
          isApp = false;
        }
      }
      return isApp;
    }
    if (judgeApp() || isNewApp()) {
      return true;
    } else {
      return false;
    }
  },
};
