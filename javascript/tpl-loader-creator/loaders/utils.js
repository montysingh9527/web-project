function tplReplace(template, replaceObject) {
  // 匹配{{}}内的内容
  return template.replace(/\{\{(.*?)\}\}/g, function (node, key) {
    return replaceObject[key];
  });
}

module.exports = {
  tplReplace,
};
