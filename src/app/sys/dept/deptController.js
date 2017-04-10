'use strict';

angular.module('app')
	.controller('deptController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = '部门管理';
        $scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
			$.ajax({
				url : '/dept/read/list',
				data: $scope.param
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.pageInfo = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
		};
		
		$scope.search();
		
		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
		};
		
		$scope.disableItem = function(id, enable) {
			
		};
		
		// 翻页
        $scope.pagination = function (obj) {
            $scope.param.pageNum=obj.page;
            $scope.search();
        };

        $scope.treedata=[
		         {dept_name: "部门一",  "id":1, children: [
		             {dept_name: "下级部门一", "id":2},
		             {dept_name: "下级部门二", "id":3,children: [
			             {dept_name: "下下级部门一", "id":4},
			             {dept_name: "下下级部门二", "id":5}
			         ]}
		         ]},
		         {dept_name: "部门二", "id":1, children: [
		             {dept_name: "下级部门一", "id":2},
		             {dept_name: "下级部门二", "id":3,children: [
			             {dept_name: "下下级部门一", "id":4},
			             {dept_name: "下下级部门二", "id":5}
			         ]}
		         ]},

		     ];

		$scope.get_dept = function(){

			var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.treedata = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/dept/read/tree'
			}).then(callback);

		}     

		$scope.get_dept();


	     $scope.showSelected = function(sel) {
	     	 console.log(sel);
	         $scope.selectedNode = sel;
	     };	


} ]);