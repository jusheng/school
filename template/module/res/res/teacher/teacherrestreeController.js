'use strict';

angular.module('app')
	.controller('teacherrestreeController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','Dtree','$compile',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,Dtree,$compile) {

	 console.log(Dtree);  
	 //mydtree = new dTree('mydtree','imgmenu/','no','no');

	 $scope.res_left = Dtree.dtreeFactory('res_left','template/js/dtree/img/','no','no');
	 console.log($scope.res_left);


	 $scope.app_name = "资源";

	 $scope.append_item = function(result){
	 	console.log(result);

	 	var temp = [];
	 	var inner = function(obj){
	 		for (var i = 0; i < obj.length; i++) {
	 			temp.push(obj[i]);
	 			if(obj[i].children && obj[i].children.length>0){
	 				inner(obj[i].children);
	 			}
	 		}
	 	}
	 	
	 	if(result.data && result.data.length>0){

	 		//先添加根节点
	 		$scope.res_left.add(
	 				  result.data[0].id, 
					  -1,
					  result.data[0].label,
					  "setvalue('0','"+result.data[0].label+"')",
					  
					  result.data[0].label,
					  "_self",
					  false);

	 		if(result.data[0].children && result.data[0].children.length>0){  //有子项
	 			inner(result.data[0].children);  //把所有节点数据都转成平行的
	 			console.log(temp);

	 			for (var i = 0; i < temp.length; i++) {
	 				$scope.res_left.add(
		 				  temp[i].id, 
						  temp[i].pid,
						  temp[i].label,
						  "setvalue('"+temp[i].id+"','"+temp[i].label+"')",
						  temp[i].label,
						  "_self",
						  false);
	 			}
	 		}
	 	}

	 	$('.res_left').html($scope.res_left.toString());
	 }

	 $scope.get_tree = function(){

	 	var success = function(result){
	 		
	 		$scope.append_item(result);

	 		var scope = angular.element($('.res_left')[0]).scope();
			var link = $compile($('.res_left')[0]);

			link(scope);

			$scope.$apply();


	 	}
	 	var error = function(){

	 	}

	 	API.post("/res/chapter/treelist",{"textbookId":$state.params.textbookId},success,error);

	 }

	 $scope.get_tree();


	 $scope.curr = 0;
	 $scope.setvalue = function(id,name){
	 	$scope.curr = id;

	 	if($state.includes('**.detail')){  //在内容页的点击要返回到列表页
	 		$state.go('main.res.teacherrestree.list',{"textbookId":$state.params.textbookId});
	 	}
	 	
	 }



}])	                                	