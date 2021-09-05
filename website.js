const http = require("http");

module.exports = () =>{
  
  http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');  
  }).listen(25575);

  console.log('Server running at http://194.163.171.228:25575/');
}