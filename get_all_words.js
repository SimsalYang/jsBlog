
// 引入fs模块
var fs = require('fs');

// 引入file json库
var jsonfile = require('jsonfile');

// 定义要扫描的目标文件夹
var pathString = 'X:/MyProject/words-from-the-heart/';

// 用于存放所有心里话
var writePathString = 'X:/MyProject/jsBlog/data/all_words.json';

// 用于存放格式不正确的json文件名
var errorPathString = 'X:/MyProject/jsBlog/data/error_data.json';

// 调用fs的readdir函数读取所有文件
fs.readdir(pathString, function(err, files) {
  if (err) {
    console.log('读取文件失败');
    return;
  }

  //把含有"json"字符的文件名过滤出来,把所有文件保存在jsonFiles数组中
  var jsonFiles = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].endsWith('.json')) {
      jsonFiles.push(files[i]);
    }
  }

  //循环读取json文件的内容，并都存在jsonList数组内。读取出错的文件名存在errorFiles数组内。
  var jsonList = [];
  var errorFiles = [];
  
  for (var i = 0; i < jsonFiles.length; i++) {
      // 读取json文件
      jsonfile.readFile(pathString+jsonFiles[i], function (err, obj) {
        if (err) {
          console.log(err);
        } else {
          jsonList.push(obj);
          jsonfile.writeFile(writePathString, jsonList, function (err) {
            if (err) {
              console.log("写入文件出错");
            }
          });
        }
      });
  }
  jsonfile.writeFile(errorPathString,errorFiles, function (err) { 
    if (err) {
      console.log('error');
    }              
  });
});
