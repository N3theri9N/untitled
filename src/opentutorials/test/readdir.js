var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){
    console.log(filelist); // 상위의 ./data/ 의 리스트가 실행
})
