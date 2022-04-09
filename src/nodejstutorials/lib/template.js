
module.exports = {
    HTML: function (title, list, body, control) {
        return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>`;
    },
    list : function (filelist) {
        var list = '<ul>';
        filelist.forEach(item => list += `<li><a href="/?id=${item}">${item}</a></li>`);
        list += '</ul>';
        return list;
    }
}
