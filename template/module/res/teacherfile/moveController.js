'use strict';

angular.module('app')
	.controller('moveController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','Dtree','$compile',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,Dtree,$compile) {
	 
	   $scope.dirId = $scope.ngDialogData.dirId;
	   $scope.callback = $scope.ngDialogData.callback;   

	   $scope.curr = 0;

	   $scope.$parent.myScrollOptions = {
            snap: false,
            hScrollbar:true,
            vScrollbar:true,
            scrollbars:true,
            fadeScrollbars:true,
            click: !0,
           /* onScrollEnd: function ()
            {
                alert('finshed scrolling');
            }*/
    	};    

	   $scope.append_item = function(result){
			$scope.target_tree = Dtree.dtreeFactory('target_tree','template/js/dtree/img1/','no','no');
	   		$scope.target_tree.add(
	 				  0, 
					  -1,
					  "所有文件",
					  "setvalue('0','所有文件','0')",
					  '所有文件',
					  "_self",
					  false
					  );  

		   	for (var i = 0; i < result.data.length; i++) {
		   		
		   		$scope.target_tree.add(
	 				  result.data[i].id, 
					  result.data[i].parentId, 
					  result.data[i].name,
					  "setvalue('"+result.data[i].id+"','"+result.data[i].name+"','"+result.data[i].parentId+"')",
					  result.data[i].name,
					  "_self",
					  false
					  );  	
		   	}

		   	$('.target_tree').html($scope.target_tree.toString());
		   	
		   	$timeout(function(){
				$scope.$parent.myScrollOptions.myScroll.refresh();
			});
		 	  
	   }

	  //目录树
	  $scope.get_directory = function(){

	   		var success = function(result){
	   			console.log(result.data);

	   			$scope.append_item(result);
	   			


	   			var scope = angular.element($('.target_tree')[0]).scope();
				var link = $compile($('.target_tree')[0]);

				link(scope);

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/directory/getList",{},success,error);

	   	}
	  
	   	$scope.get_directory();

	   	$scope.setvalue = function(id,name,pid){
		  		$scope.curr = id;

		 }



		 $scope.submit = function(){
		 	$scope.callback($scope.dirId,$scope.curr);
		 	$scope.closeThisDialog();
		 }		                               	


	}])