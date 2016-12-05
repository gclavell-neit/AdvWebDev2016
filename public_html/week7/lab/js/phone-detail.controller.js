(function() {
    
    'use strict';
    angular
        .module('app')
        .controller('PhoneDetailController', PhoneDetailController);
    
    PhoneDetailController.$inject = ['$routeParams', 'PhonesService'];
    //Accepts route parameters and the service.
    function PhoneDetailController($routeParams, PhonesService) {
        var vm = this;
        //declares the empty phone object, then requests a single phone's information by id from the service to fill the object, and make it accessible to the view.
        vm.phone = {};
        var id = $routeParams.phoneId;
        
        activate();
        
        function activate(){
            PhonesService.findPhone(id).then(function(response){
                vm.phone = response;
            });
        }
    }
     
})();