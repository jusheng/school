'use strict';

angular.module('app')
	.controller('editorController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {
    
    $scope.$watch("edit_jsfinished",function(){
    	console.log($scope.edit_jsfinished);
    	if($scope.edit_jsfinished == 120){
   
   
    		$('#include_editor').addClass('ueditor');
    		var scope = angular.element($('#include_editor')[0]).scope();
			var link = $compile($('#include_editor')[0]);

			link(scope);

    	}

    })



}])