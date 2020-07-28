// 新建目录
const fs = require("fs");
const path = require("path");
exports.mikdirs = function (pathname, callback) {
  // 判断是否是绝对路径
  pathname = path.isAbsolute(pathname)
    ? pathname
    : path.join(__dirname, pathname);
  // 获取相对路径
  pathname = path.relative(__dirname, pathname);
  let floders = pathname.split(path.sep); // 避免平台差异带来的bug
  let pre = "";
  floders.forEach((floder) => {
    try {
      // 没有异常,文件已经创建,提示用户该文件已经创建了
      let _stat = fs.statSync(path.join(__dirname, pre, floder));
      let hasMkdir = _stat && _stat.isDirectory();
      if (hasMkdir) {
        callback;
      }
    } catch (error) {
      try {
        // 避免负文件还没有创建就已经创建了子文件
        fs.mkdirSync(path.join(__dirname, pre, floder))
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    }
    pre = path.join(pre, floder) // 路径拼合
  });
};
