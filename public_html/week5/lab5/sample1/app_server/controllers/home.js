/* GET 'home info' page */


var Employee = require('../models/employee');;

module.exports.home = function(req, res){
    
    var msg = '';
    function successCB(){
         res.render('index', { 
            title: 'home',
            message : 'Employee Saved'
        });        
    }
    if (req.method === 'POST') {
        console.log(req.body);
        
        Employee.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        },function (err) {           
           // saved!
           successCB();
        });
              
    } else {
         res.render('index', { 
            title: 'home',
            message : msg
        });
    }   
    
 
};

module.exports.view = function(req, res){
    
     var id = req.params.id,
         removed = '';
 
    function finish() {     
       Employee
       .find()
       .exec(function(err, results){

               res.render('view', { 
                   title: 'View Results',
                   results : results,
                   removed : removed
               });
       });
    }
    
     if ( id ) {
         
         var removePromise = new Promise(
            function (resolve, reject) { 
                
                Employee.remove({ _id: id }, function (err) {
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



module.exports.update = function(req, res){
    
    var id = req.params.id;
    if (req.method === 'POST') {
         
         id = req.body._id;
         var query = { '_id': req.body._id };
         var update = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        };
        var options = {};
        var callback = function(){};
        Employee.update(query, update, options, callback);
         
     }
    
    
    Employee
    .findOne({ '_id': id })
    .exec(function(err, results){
    
         if ( results ) {
            res.render('update', { 
                title: 'Update Results',
                results : results
            });
        } else {
             res.render('notfound', { 
                message: 'Sorry ID not found'
            });
        }
           
    });
};


