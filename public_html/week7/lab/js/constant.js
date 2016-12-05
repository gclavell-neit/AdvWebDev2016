(function() {
    'use strict';
    //sets REQUEST.Phones to the phones json
    angular
        .module('app')
        .constant('REQUEST', {
           'Phones': './data/phones.json'    
    });
    
})();

