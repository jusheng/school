'use strict';

angular.module('app')
	.controller('rulesController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API) {

    $scope.app_name = "奖惩管理"; 
	$scope.curr = 0;
	       

	$scope.set_curr = function(t){
		 	$scope.curr = t
	}
       
       //弹出框
    $scope.add_module = function(t){

        $scope.status = t;
        console.log($scope.status);
        ngDialog.open({
            template:'template/module/edu/rules/add.html',
            controller: 'addController',
            className: 'ngdialog-theme-green',
            scope:$scope,
            // data:{
            //     "callback":$scope.selected = 0
            // },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/edu/rules/addController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })
    }           
	}])                                	