const fs = require('fs'); // fileSystem 모듈

fs.readFile("./sample.txt", 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})