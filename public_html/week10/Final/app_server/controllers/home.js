/* GET 'home info' page */


var Product = require('../models/product');;

module.exports.add = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('add', { 
            title: 'Add Product',
            message : 'Product Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Product.create({
          product: req.body.product,
          description: req.body.description,
          price: req.body.price
        },function (err) {           
           // saved!
           successCB();
        });
    
              
    } else {
         res.render('add', { 
            title: 'Add Product',
            message : msg
        });
    }   
    
 
};

module.exports.home = function(req, res){
    
     var id = req.params.id,
         removed = '';
 
    function finish() {     
       Product
       .find()
       .exec(function(err, results){

               res.render('index', { 
                   title: 'Viewing All Products',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Product.remove({ _id: id }, function (err) {
                   if (!err) {
                        resolve(' has been removed'); // success
                    } else {
                        reject(' has not been removed'); // failure
                    }
               });                
                
            });
         
         
             removePromise.then(function(result) {
                 removed = id + result;
                 finish(); 
             }, function(result) {
                 removed = id + result;
                 finish();  
             });
           
                
     } else {
      finish();
    }
     
     
    
};



