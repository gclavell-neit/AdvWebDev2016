(function() {
    
    'use strict';
    angular
        .module('app')
        .controller('PhoneListController', PhoneListController);

    PhoneListController.$inject = ['PhonesService'];
    
    function PhoneListController(PhonesService) {
        var vm = this;
        //declares the empty array, then requests the list of phone objects from the service to fill the array and make it accessible to the view.
        vm.phones = [];
        
        activate();
        
        function activate(){
            PhonesService.getPhones().then(function(response){
                vm.phones = response;
            });
        }
    }
     
})();
