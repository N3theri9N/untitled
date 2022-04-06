var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');

const sanitizeHtml = require('sanitize-html');
const template = require("./lib/template.js");

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname
    if (pathname === '/') { // 일치할때만
        if (queryData.id === undefined) {
            fs.readdir("./data", (error, filelist) => {
                var title = "Welcome";
                var description = "Hello!!";

                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>`
                );

                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir("./data", (error, filelist) => {
                var filtered_id = path.parse(queryData.id).base; // ../ 를 차단한다.
                fs.readFile(`./data/${filtered_id}`, 'utf-8', (err, description) => {
                    var title = queryData.id; // 쿼리스트링 값 추출

                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description, { allowedTags:['h1'] });

                    var list = template.list(filelist);
                    var html = template.HTML(sanitizedTitle, list,
                        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
                        `<a href="/create">create</a> 
                                <a href="/update?id=${sanitizedTitle}">update</a> 
                                <form action="./delete_process" method="POST" >
                                    <input type="hidden" name="id" value="${sanitizedTitle}">
                                    <input type="submit" value="delete">
                                </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }

    } else if (pathname === "/create") {
        fs.readdir("./data", (error, filelist) => {
            var title = "FORM";
            var list = template.list(filelist);
            var html = template.HTML(title, list,
                `<form action="http://localhost:3000/process_create" method="post">
                <p>
                   <input type="text" name="title" placeholder="title">
                </p>
                <p>
                    <textarea name="description"></textarea>
                </p>
                <input type="submit">
            </form>
            `
                , ""
            );
            response.writeHead(200);
            response.end(html);
        });

    } else if (pathname === "/process_create") {

        var body = '';
        request.on('data', (data) => {
            // node js 에서 포스트방식의 데이터가 너무 많이 올경우를 대비해서 사용방법을 정의.
            //서버쪽에서 수신할때마다 이 콜백함수 호출 ( 인자는 data )
            body += data;
        });
        request.on('end', () => { // 더이상 들어올 것이 없을 경우 실행
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var filteredTitle = path.parse(title).base;
            fs.writeFile(`./data/${filteredTitle}`, description, 'utf8', (err) => { // 파일생성후 콜백함수 실행
                response.writeHead(301, {Location: `/?id=${filteredTitle}`}); // 리다이렉션
                response.end();
            });
        });
    } else if (pathname === "/update") {

        fs.readdir("./data", (error, filelist) => {
            var filteredId = path.parse(queryData.id).base;
            fs.readFile(`./data/${filteredId}`, 'utf-8', (err, description) => {
                var title = queryData.id; // 쿼리스트링 값 추출
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    ` <form action="http://localhost:3000/update_process" method="post">
                            <input type="hidden" name="id" placeholder="title" value="${title}">
                            <p>
                               <input type="text" name="title" placeholder="title" value="${title}">
                            </p>
                            <p>
                                <textarea name="description" value="">${description}</textarea>
                            </p>
                            <input type="submit">
                        </form>`,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if (pathname === "/update_process") {
        var body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            var filteredId = path.parse(id).base;
            var filteredTitle = path.parse(title).base;

            fs.rename(`./data/${filteredId}`, `./data/${filteredTitle}`, (err) => {
                fs.writeFile(`./data/${filteredTitle}`, description, 'utf8', (err) => { // 파일생성후 콜백함수 실행
                    response.writeHead(302, {Location: `/?id=${title}`}); // 리다이렉션
                    response.end();
                });
            });
        })
    } else if (pathname === "/delete_process") {
        var body = '';
        request.on('data', (data) => {
            body += data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`./data/${filteredId}`, (err) => {
                console.log(err);
                response.writeHead(302, {Location: `/`}); // 리다이렉션
                response.end();
            });
        })
    } else {
        response.writeHead(404);
        response.end();
    }


    //    response.end(fs.readFileSync(__dirname + _url));
    //    response.end(queryData.id);
});

app.listen(3000);