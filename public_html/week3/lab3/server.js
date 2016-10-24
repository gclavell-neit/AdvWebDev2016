var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {
    
   
    var pathName = url.parse(request.url).pathname;
    var fileName = pathName.substr(1); /* lets remove the "/" from the name */
    if(fileName === "todo"){
    fileName += ".json";
    }else{fileName += ".html";}
    /* lets try to read the html page found */
    fileSystem.readFile(fileName , callback);

    function callback(err, data) {
        if (err) {
            console.error(err);
            /* Send the HTTP header 
             * HTTP Status: 400 : NOT FOUND
             * Content Type: text/html 
             */
            response.writeHead(400, {'Content-Type': 'text/html'});   
            response.write('<!DOCTYPE html><html><body><div>Page Not Found</div></body></html>');
        } else {
            /* Send the HTTP header 
             * HTTP Status: 200 : OK
             * Content Type: text/html 
             */
            if(fileName === "todo.json"){
                console.log('HI TODO!!');
                response.writeHead(200, {'Content-Type': 'application/json'}); 
                response.write(data.toString());
            }if(fileName === "index.html"){
                console.log('HI INDEX!!');
                loadAJAX.bind(null, 'http://localhost:3000/todo');
                response.writeHead(200, {'Content-Type': 'text/html'}); 
                response.write('<!DOCTYPE html><html><body><div>You suck at this</div></body></html>');
                response.write(data.toString());
            }
           
        }     
        
        /* the response is complete */
        response.end();
    }


   
}).listen(3000);

// Console will print the message
console.log('Server running at http://localhost:3000/index.html');

function reqListener() {
    console.log(JSON.parse(this.responseText));
    //displayList('ul.users', JSON.parse(this.responseText));
}
function loadAJAX(url) {
    var xmlhttp = new XMLHttpRequest();               
    xmlhttp.addEventListener('load', reqListener.bind(xmlhttp));
    xmlhttp.addEventListener('error', reqListener.bind(xmlhttp));
    xmlhttp.open('GET', url);
    xmlhttp.send();
}

function makeRequest(url) {
            
    var promise = new Promise( httpPromise );

    function httpPromise(resolve, reject) {
        var httpRequest = new XMLHttpRequest();

         if ( !httpRequest ) {
           reject('Cannot create an XMLHTTP instance');
         }

         httpRequest.open('GET', url);
         httpRequest.send();

         httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
         httpRequest.addEventListener('error', httpReject.bind(httpRequest));

         function httpResolve() {                        
            if ( this.status >= 200 && this.status < 300 ) {
                // Performs the function "resolve" when this.status is equal to 2xx
                if(url === 'data/users.json'){ 
                    resolve(JSON.parse(this.response));
                    //displayList('ul.users', JSON.parse(this.responseText));
                }
                else{displayContent('section.featured article', JSON.parse(this.responseText));}
            } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
            }                          
         }

         function httpReject() {
             reject(this.statusText);
         }

    }
    // Return the promise
    return promise;
    }
    
