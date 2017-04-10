'use strict';

angular.module('app')
    .controller('editTimeController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
         $scope.record={ };   
        $scope.record["bookIsbn"]=$scope.ngDialogData.bookIsbn;
        $scope.record["bookName"]=$scope.ngDialogData.bookName;
        $scope.record["endDate"]=$scope.ngDialogData.endDate;
        console.log($scope.ngDialogData.bookName)
                $scope.app_name = "续借";
                $scope.submit=function(){
                    $scope.set_endTime($scope.record.endDate,$scope.ngDialogData.id);

                }

}])