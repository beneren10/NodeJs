const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require("url");
const html = fs.readFileSync('./Files/index.html','utf-8');
const port = 8000;
const head = 200;
// exported file from replaceHtml.js
const replaceHtml = require("./Modules/replaceHtml")

let products = JSON.parse(fs.readFileSync("./Data/products.json",'utf-8'));
let productListHtml = fs.readFileSync("./Files/product-list.html",'utf-8');
let productDetailsHtml = fs.readFileSync("./Files/product-details.html",'utf-8');


// const server = http.createServer( (req,res) => {
//     let {query,pathname: path} = url.parse(req.url, true);
    
//     // let path = req.url;
    
//     if (path === "/" || path.toLocaleLowerCase() ==='/home') {
//         res.writeHead(head,{
//             'Content-Type': 'text/html',
//             'my-header': 'Hello World'
//         });
//         res.end(html.replace('{{%CONTENT%}}', 'You are in the Home page'));
//     } else if (path.toLocaleLowerCase() === "/about") {
//         res.writeHead(head);
//         res.end(html.replace('{{%CONTENT%}}', 'You are in the About page'));
//     } else if (path.toLocaleLowerCase() === "/products") {
//         if(!query.id){
//             let productHtmlArray = products.map((prod) => {
//                 return replaceHtml(productListHtml,prod);
//             })
//             let productResponseHtml = html.replace("{{%CONTENT%}}",productHtmlArray.join(","));
//             res.writeHead(head, {'Content-Type': 'text/html'});
//             res.end(productResponseHtml);
//         } else {
//             let prod = products[query.id];
//             let productDetailResponseHtml = replaceHtml(productDetailsHtml,prod);
//             res.end(html.replace("{{%CONTENT%}}",productDetailResponseHtml));
//         }
        
//     } else if (path.toLocaleLowerCase() === "/contact") {
//         res.writeHead(head);
//         res.end(html.replace('{{%CONTENT%}}', 'You are in the Contact page'));
//     } else {
//         res.writeHead(404);
//         res.end("404 Error");
//     }
// });

const server = http.createServer();
    
server.on("request", (req,res) => {
    let { query, pathname: path } = url.parse(req.url, true);

    // let path = req.url;

    if (path === "/" || path.toLocaleLowerCase() === '/home') {
        res.writeHead(head, {
            'Content-Type': 'text/html',
            'my-header': 'Hello World'
        });
        res.end(html.replace('{{%CONTENT%}}', 'You are in the Home page'));
    } else if (path.toLocaleLowerCase() === "/about") {
        res.writeHead(head);
        res.end(html.replace('{{%CONTENT%}}', 'You are in the About page'));
    } else if (path.toLocaleLowerCase() === "/products") {
        if (!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace("{{%CONTENT%}}", productHtmlArray.join(","));
            res.writeHead(head, { 'Content-Type': 'text/html' });
            res.end(productResponseHtml);
        } else {
            let prod = products[query.id];
            let productDetailResponseHtml = replaceHtml(productDetailsHtml, prod);
            res.end(html.replace("{{%CONTENT%}}", productDetailResponseHtml));
        }

    } else if (path.toLocaleLowerCase() === "/contact") {
        res.writeHead(head);
        res.end(html.replace('{{%CONTENT%}}', 'You are in the Contact page'));
    } else {
        res.writeHead(404);
        res.end("404 Error");
    }
});



server.listen( port, '127.0.0.1', () => {
    console.log("server has started");
})
