var http = require('http');
var fs = require('fs');
var url = require('url');

function htmlTemplate( title, list, body ){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
    </body>
    </html>`;
}

function listTemplate(filelist){
    var list = '<ul>';
    filelist.forEach(item => list+= `<li><a href="/?id=${item}">${item}</a></li>`);
    list += '</ul>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname

    if(pathname === '/'){ // 일치할때만
        if(queryData.id === undefined){
            fs.readdir("./data", (error, filelist) => {
                var title = "Welcome";
                var description = "Hello!!";
                var list = listTemplate(filelist);
                var template = htmlTemplate(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir("./data", (error, filelist) => {
                fs.readFile(`./data/${queryData.id}`, 'utf-8', (err, description) => {
                    var title = queryData.id; // 쿼리스트링 값 추출
                    var list = listTemplate(filelist);
                    var template = htmlTemplate(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }




    } else {
        response.writeHead(404);
        response.end();
    }



    //    response.end(fs.readFileSync(__dirname + _url));
    //    response.end(queryData.id);
});
app.listen(3000);