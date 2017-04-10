'use strict';

angular.module('app')
	.controller('teacherfileController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','Dtree','$compile',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,Dtree,$compile) {

	  
	  $scope.app_name = "我的文件";                              	
	  
	  //当前目录ID
	  $scope.curr = $state.params.parentId;	

	  $scope.set_curr = function(t){
	  	$scope.curr = t;	
	  }


	  $scope.append_item = function(result){
			$scope.directory = Dtree.dtreeFactory('directory','template/js/dtree/img1/','no','no');
	   		$scope.directory.add(
	 				  0, 
					  -1,
					  '<b>所有文件</b>',
					  "setvalue('0','所有文件','0')",
					  '<b>所有文件</b>',
					  "_self",
					  false
					  );  

		   	for (var i = 0; i < result.data.length; i++) {
		   		
		   		$scope.directory.add(
	 				  result.data[i].id, 
					  result.data[i].parentId, 
					  result.data[i].name,
					  "setvalue('"+result.data[i].id+"','"+result.data[i].name+"','"+result.data[i].parentId+"')",
					  result.data[i].name,
					  "_self",
					  false
					  );  	
		   	}

		   	$('.directory').html($scope.directory.toString());
		 	  
	   }

	  //目录树
	  $scope.get_directory = function(){

	   		var success = function(result){
	   			console.log(result.data);

	   			$scope.append_item(result);
	   			


	   			var scope = angular.element($('.directory')[0]).scope();
				var link = $compile($('.directory')[0]);

				link(scope);

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/directory/getList",{},success,error);

	   	}
	  
	   	$scope.get_directory();

	   	$scope.$on("folderadd",function(){
	   		$scope.get_directory();
	   	});

	  $scope.setvalue = function(id,name,pid){
	  		$scope.curr = id;

	  		$state.go("main.res.teacherfile.filemanage",{"parentId":id});
	  }		   	



}])