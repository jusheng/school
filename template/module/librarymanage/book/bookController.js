'use strict';
angular.module('app')
	.controller('bookController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','Dtree','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,Dtree,$compile) {
		
		$scope.app_name = "图书管理";
		
 		$scope.selected = 1;
 		$scope.curr=-1;

	   	$scope.set_curr = function(t){
		 	$scope.selected = t;
	   }

	   $scope.bookclasstree = Dtree.dtreeFactory('bookclasstree','template/js/dtree/img/','no','no');

	   $scope.append_item = function(result){

	   		$scope.bookclasstree.add(
	 				  0, 
					  -1,
					  "顶级分类",
					  "setvalue('0','顶级分类','0')",
					  '顶级分类',
					  "_self",
					  false
					  );  

		   	for (var i = 0; i < result.data.length; i++) {
		   		
		   		$scope.bookclasstree.add(
	 				  result.data[i].id, 
					  result.data[i].parentId, 
					  result.data[i].name,
					  "setvalue('"+result.data[i].id+"','"+result.data[i].name+"','"+result.data[i].code+"')",
					  result.data[i].name,
					  "_self",
					  false
					  );  	
		   	}

		   	$('.bookclasstree').html($scope.bookclasstree.toString());
		 	  
	   }


		// 分类列表
	   	$scope.get_class = function(){

	   		var success = function(result){
	   			$scope.sorts = result.data;

	   			$scope.append_item(result);
	   			


	   			var scope = angular.element($('.bookclasstree')[0]).scope();
				var link = $compile($('.bookclasstree')[0]);

				link(scope);

	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/booksClassify/list",{},success,error);

	   	}

	   	$scope.get_class();

	   	$scope.$on("classupdate",function(){
	   		$scope.get_class();
	   	})






	  // 列表选中样式改变所需函数
	   	$scope.selectedWhich = function (row) {
          	$scope.selectedRow = row;
        }

        $scope.curr = $state.params.sorts_id;

        $scope.paramsobj = {  //
        	sorts_id: $state.params.sorts_id,
        	code:$state.params.code,
        	name:$state.params.name
        }

        $scope.setvalue = function(id,name,code){
        	$scope.curr = id;

        	$scope.paramsobj.sorts_id = id;
        	$scope.paramsobj.code = code;
        	$scope.paramsobj.name = name;


        	if($state.includes("main.book.bookList")   //图书列表
        	 || $state.includes("main.book.bookclassList")   //分类列表
        	 || $state.includes("main.book.bookadd")   //图书添加
        	 || $state.includes("main.book.bookedit")   //图书编辑
        	 || $state.includes("main.book.bookclassadd")   //分类添加	
        	 || $state.includes("main.book.bookclassedit")){  //分类编辑		
        		//$state.go("main.book.bookList",$scope.paramsobj);

        		$scope.$broadcast("parent_send",$scope.paramsobj);

        	}


        }

} ]);