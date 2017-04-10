'use strict';

angular.module('app')
	.controller('userlistController', [ '$rootScope', '$scope', '$http', '$state','toaster','API',
	                                function($rootScope, $scope, $http, $state,toaster,API) {

	$scope.school_id = $state.params.school_id;   
	$scope.name = $state.params.name;                               	
	$scope.title = $scope.name + " > 教务人员管理";
	

	$scope.param = { 
		"schoolId":$scope.school_id
	};
    
    $scope.loading = false;
        
	$scope.search = function () {
        $scope.loading = true;

		var success = function(result){
			$scope.pageInfo = result.data;
			$scope.loading = false;
			$scope.$apply();
			
		};
		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
            $scope.loading = false;
		};

		API.post('/eduteacher/read/list',$scope.param,success,error);

	}
	
	$scope.search();
	
	$scope.clearSearch = function() {
		$scope.param.keyword= null;
		$scope.search();
	}
	
	$scope.disableItem = function(id, enable) {

		var success = function(result){
			toaster.clear('*');
            toaster.pop('success', '', "操作成功");
            $scope.search();
		};
		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}

		API.post('/eduteacher/delete',{"id":id,'enable':enable},success,error);
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