'use strict';

angular.module('app')
	.controller('rolelistController', [ '$rootScope', '$scope', '$http', '$state','toaster',
	                                function($rootScope, $scope, $http, $state,toaster) {

	$scope.school_id = $state.params.school_id;   
	$scope.name = $state.params.name;                               	
	$scope.title = $scope.name + " > 教务角色管理";
	

	$scope.param = { };
        $scope.loading = false;
        
		$scope.search = function () {
	        $scope.loading = true;
	        $scope.param.schoolId = $scope.school_id;
			$.ajax({
				url : '/edu/read/list',
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
		}
		
		$scope.search();
		
		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
		}
		
		$scope.disableItem = function(id, enable) {

			$.ajax({
				url : '/edu/delete',
				data: {"id":id,'enable':enable}
			}).then(function(result) {
				console.log(result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					toaster.clear('*');
	                toaster.pop('success', '', "操作成功");
	                $scope.search();
				} else {
					toaster.clear('*');
	                toaster.pop('error', '', result.msg);
				}
				$scope.$apply();
			});

		}
		
		// 翻页
        $scope.pagination = function (obj) {
            $scope.param.pageNum=obj.page;
            $scope.search();
        };

	
	$scope.treedata=[
		         {dept_name: "河北省",  "id":1, children: [
		             {dept_name: "石家庄", "id":2},
		             {dept_name: "下级部门二", "id":3,children: [
			             {dept_name: "下下级部门一", "id":4},
			             {dept_name: "下下级部门二", "id":5}
			         ]}
		         ]},
		         {dept_name: "河南省", "id":1, children: [
		             {dept_name: "下级部门一", "id":2},
		             {dept_name: "下级部门二", "id":3,children: [
			             {dept_name: "下下级部门一", "id":4},
			             {dept_name: "下下级部门二", "id":5}
			         ]}
		         ]},

		     ];



	     $scope.showSelected = function(sel) {
	     	 console.log(sel);
	         $scope.selectedNode = sel;
	     };	    
	                            	
}]);