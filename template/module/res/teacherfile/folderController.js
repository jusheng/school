'use strict';

angular.module('app')
	.controller('folderController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	 $scope.id = $scope.ngDialogData.id;
	 $scope.callback = $scope.ngDialogData.callback;

	 $scope.do = function(){
	 	$scope.callback($scope.id,$scope.folderName);
	 	$scope.closeThisDialog();
	 }

	 $scope.cancel = function(){
	 	$scope.closeThisDialog();
	 }


	 function validate(){

            if(jQuery('#folder_form').length==0){
                $timeout(function(){
                    validate();
                },1000);
            }

	   	
            jQuery('#folder_form').validate({
                rules: {
                	folderName: {
                        required: true
                    }
                },
                messages: {
                	folderName: {
                        required: '请填写文件夹名称'
                    }
                    
                },
                submitHandler: function() {
                    $scope.do();
                }
            });
        }

        validate();
}])