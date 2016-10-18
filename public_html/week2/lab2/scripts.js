window.addEventListener('load', loadNavAJAX.bind(null, 'data/users.json'));

function displayList(selector, list) {
   
    var dom = document.querySelector(selector);
    
    var docfrag = document.createDocumentFragment();

    list.users.forEach(function(value) {
       
        var li = document.createElement("li"); 
        li.textContent = value._id;
        /* you can set any attribute using the function below for any Created element */
        li.setAttribute('class', 'link');
        /*you can even attach events to the element */
        li.addEventListener('click', userAJAX.bind(null, 'data/'+value._id+'.json'));
        docfrag.appendChild(li);
    });
    /* after the fragment is completed we can add it to the page */
    dom.appendChild(docfrag);
}

function displayContent(selector, item) {
    var dom = document.querySelector(selector);
    var docfrag = document.createDocumentFragment();
    var domImg = document.querySelector('section.featured figure');
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

    docfrag.appendChild(isActive);
    dom.appendChild(docfrag);
    //if(item.isActive === true){console.log(document.querySelector('article')[0].innerHtml());}else{console.log("");}//document.querySelector("article").setAttribute('class', 'active');}

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


function reqListener() {
    
    displayList('ul.users', JSON.parse(this.responseText));
}

function userListener() {
    
    displayContent('section.featured article', JSON.parse(this.responseText));
}

function loadNavAJAX(url) {
    var xmlhttp = new XMLHttpRequest();               
    xmlhttp.addEventListener('load', reqListener.bind(xmlhttp));
    xmlhttp.addEventListener('error', reqListener.bind(xmlhttp));
    xmlhttp.open('GET', url);
    xmlhttp.send();
}

function userAJAX(url) {
    var xmlhttp = new XMLHttpRequest();               
    xmlhttp.addEventListener('load', userListener.bind(xmlhttp));
    xmlhttp.addEventListener('error', userListener.bind(xmlhttp));
    xmlhttp.open('GET', url);
    xmlhttp.send();
}

//TO DO - Convert the two ajax functions into one function that consumes a context
//TO DO - Implement promises
//TO DO - Figure out the stupid crashing issue. Commented out - the final requirement for the lab.