
// Create Server
// const http = require('http');

// http.createServer (function(req,res)
// {
//     res.write('Hello from Node Server')
//     res.end()
// }).listen(4000,()=> console.log('Server running at http://localhost:4000'));

// Json Method
// const http = require("http");

// http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });

//   res.end(JSON.stringify({
//     name: "Mariselvam",
//     role: "Node.js Developer"
//   }));
// }).listen(3000);

// Multiple Route
// const http = require("http");

// http.createServer((req, res) => {

//   if (req.url === "/") {
//     res.end("Home Page");
//   } 
//   else if (req.url === "/about") {
//     res.end("About Page");
//   } 
//   else {
//     res.end("404 Not Found");
//   }

// }).listen(3000);

// Send HTML Response
// const http = require('http');

// http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });

//   res.write("<h1>Hello Sara</h1>");
//   res.write("<p>This is an HTML response!</p>");

//   res.end();
// }).listen(3000);

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {

//     if (req.url === "/" && req.method === "GET") {
//         fs.readFile("form.html", (err, data) => {
//             if (err) {
//                 res.writeHead(500, { "Content-Type": "text/plain" });
//                 res.end("Error loading file");
//             } else {
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.end(data);
//             }
//         });
//     }

//     else if (req.url === "/submit" && req.method === "POST") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end("<h2>Form Submitted Successfully</h2>");
//     }

//     else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Page Not Found");
//     }
// });

// server.listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
// });

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // Serve HTML
    if (req.url === "/" || req.url === "/form.html") {
        fs.readFile("form.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // Serve Image
    else if (req.url === "/R.jpeg") {
        fs.readFile("R.jpeg", (err, data) => {
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        });
    }

    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
