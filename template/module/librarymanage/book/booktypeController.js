'use strict';

angular.module('app')
	.controller('booktypeController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster','API','Dtree','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster,API,Dtree,$compile) {
		
	$scope.app_name = "图书分类";

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


	 $scope.onlinehomework_knowledge = Dtree.dtreeFactory('onlinehomework_knowledge','template/js/dtree/img/','no','no');


	$scope.append_item = function(result){

	   		$scope.onlinehomework_knowledge.add(
	 				  0, 
					  -1,
					  '顶级分类',
					  "setvalue('0','顶级分类')",
					  '全部图书',
					  "_self",
					  false);  

		   	for (var i = 0; i < result.data.length; i++) {
		   		
		   		$scope.onlinehomework_knowledge.add(
	 				  result.data[i].id, 
					  result.data[i].parentId, 
					  "<input type='checkbox' checklist-model=\"record_temp.type\" checklist-value=\""+result.data[i].id+"\"/> "+result.data[i].name
					  // "",
					  // result.data[i].name,
					  // "_self",
					  // false
					  );  	
		   	}

		   	$('.onlinehomework_knowledge').html($scope.onlinehomework_knowledge.toString());
		  
		 	console.log($scope.onlinehomework_knowledge);  	
	  }

	 $scope.get_class = function(){

			 var success = function(result){
			 	$scope.sorts = result.data;

			 	$scope.set_sorts && $scope.set_sorts(result.data);  //给父作用域赋值

			 	$scope.append_item(result);
	   			//$scope.create_dtree_grid();


	   			var scope = angular.element($('.onlinehomework_knowledge')[0]).scope();
				var link = $compile($('.onlinehomework_knowledge')[0]);

				link(scope);


			 	$scope.$apply();
			 }  
			 var error = function(result){
			 	toaster.clear('*');
		        toaster.pop('error', '', result.msg);
			 }

			 //API.post("/res/booksClassify/treeData",{"id":$scope.bookroom},success,error);
			 API.post("/res/booksClassify/list",{},success,error);
	 }
	 $scope.get_class();


	 // $scope.setvalue = function(id,name,index){
	 // 	console.log($scope.onlinehomework_knowledge.aNodes[index]);
	 // 	$scope.onlinehomework_knowledge.aNodes[index]._checked = !$scope.onlinehomework_knowledge.aNodes[index]._checked;
	 // }

	 // $scope.check_click = function(){
	 // 	alert('dddd');
	 // }
	 // 
	 // 
	

	$scope.before_close = function(){
		if($scope.record_temp.type !=undefined){
			$scope.record.types = $scope.record_temp.type.join(',');
		}
		
	}
  

} ]);