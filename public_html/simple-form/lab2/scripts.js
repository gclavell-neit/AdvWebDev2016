window.addEventListener('load', makeRequest('data/users.json'));

function displayList(selector, list) {
   
    var dom = document.querySelector(selector);
    
    var docfrag = document.createDocumentFragment();

    list.users.forEach(function(value) {
       
        var li = document.createElement("li"); 
        li.textContent = value._id;
        /* you can set any attribute using the function below for any Created element */
        li.setAttribute('class', 'link');
        /*you can even attach events to the element */
        li.addEventListener('click', makeRequest.bind(null, 'data/'+value._id+'.json'));
        docfrag.appendChild(li);
    });
    /* after the fragment is completed we can add it to the page */
    dom.appendChild(docfrag);
}

function displayContent(selector, item) {
    var dom = document.querySelector(selector);
    var docfrag = document.createDocumentFragment();
    var domImg = document.querySelector('section.featured figure');
    var domFeatured = document.querySelector('section.featured article');
    /* remove any child elements */
    while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }   
    while (domImg.firstChild){
        domImg.removeChild(domImg.firstChild);
    }
    
    var userImage = document.createElement("img");
    userImage.src = "img/"+item.picture;
    domImg.appendChild(userImage);
    docfrag.appendChild( createParagraphElement('Name: ', item.name.first + " " + item.name.last) );
    docfrag.appendChild( createParagraphElement('Company: ', item.company) );
    docfrag.appendChild( createParagraphElement('Email: ', item.email) );
    docfrag.appendChild( createParagraphElement('Phone: ', item.phone) );
    docfrag.appendChild( createParagraphElement('Address: ', item.address) );
    docfrag.appendChild( createParagraphElement('Registered: ', item.registered) );
    docfrag.appendChild( createParagraphElement('Age: ', item.age) );
    docfrag.appendChild( createParagraphElement('Eye Color: ', item.eyeColor) );
    docfrag.appendChild( createParagraphElement('Greeting: ', item.greeting) );
    docfrag.appendChild( createParagraphElement('Favorite Fruit: ', item.favoriteFruit) );
    docfrag.appendChild( createParagraphElement('Balance: ', item.balance) );
    docfrag.appendChild( createParagraphElement('About: ', item.about) );
    var isActive = createParagraphElement('Is Active: ', item.isActive);
    isActive.setAttribute('class', 'link');
    isActive.addEventListener('click', function(){
         item.isActive = !item.isActive;
         displayContent(selector, item);
     });
     if(item.isActive === true){
         domFeatured.setAttribute('class','active');
     }
     else{domFeatured.setAttribute('class','inactive');}
     
    docfrag.appendChild(isActive);
    dom.appendChild(docfrag);   
}

/* custom function to generate a template for our view */
function createParagraphElement(label, text) {
    var pTag = document.createElement('p'),
        strongTag = document.createElement('strong'),
        strongText = document.createTextNode(label),
        pText = document.createTextNode(text);

        strongTag.appendChild(strongText);
        pTag.appendChild(strongTag);  
        pTag.appendChild(pText);  
        return pTag;
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
                    displayList('ul.users', JSON.parse(this.responseText));
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
