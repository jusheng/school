'use strict';

angular.module('app')
	.controller('planreviewController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {
		
	   	$scope.param={ };
	   	
	$scope.s_all = 0;  //全选标记
    $scope.select_all = function(){
    	$scope.s_all = !$scope.s_all;

    	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    		$scope.pageInfo.list[i].selected = $scope.s_all;
    	}
    };	

    $scope.select_per = function(index){
    	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }


	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			// console.log(result);
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			/*toaster.clear('*');
            toaster.pop('error', '', result.msg);*/
		}
	
		API.post('/oa/plan/read/list',$scope.param,success,error);

	}

	$scope.search();

	//翻页
	$scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
   

         //删除操作
	$scope.del = function(id){

		var success = function(result){
				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.search();
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		if(id){ //单个删除

			API.post("/oa/plan/delete",{"id":id},success,error);

		}else{ //批量删除

			var temp = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
			}

			temp.length>0 && API.post("/oa/plan/delete",{"id":temp.join(",")},success,error);
		}
    }
    $scope.allow = function($index){

    	var success = function(result){
    		toaster.clear('*');
            toaster.pop('success', "", "审核完成");
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

    	var newStatus='94';
    	

    	
    	var success = function(result){
    		toaster.clear('*');
            toaster.pop('success', "", "审核完成");
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}
    	if($index){

    	var id = $scope.pageInfo.list[$index].id;
    	$scope.pageInfo.list[$index].status.codeText = "已通过" ;
    	API.post("/oa/plan/updateStatus",{"id":id,"status":newStatus},success,error);

    	}else{

    		var temp = [];
    		var index = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id) && index.push(i);
			}

			for (var i = 0; i < index.length; i++) {
				$scope.pageInfo.list[index[i]].status.codeText = "已通过" ;
			}
			
			temp.length>0 && API.post("/oa/plan/updateStatus",{"id":temp.join(","),"status":newStatus},success,error);
    	}
    }


    $scope.refuse = function($index){
    	
    	
    	var success = function(result){
            	toaster.pop('success', "", "审核完成");
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}
		var newStatus='93';

		if($index){
			var id = $scope.pageInfo.list[$index].id;
			
    		$scope.pageInfo.list[$index].status.codeText = "未通过" ;

    		API.post("/oa/plan/updateStatus",{"id":id,"status":newStatus},success,error);

       	}else{
    		
    		var temp = [];
    		var index = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id) && index.push(i);
			}

			for (var i = 0; i < index.length; i++) {
				$scope.pageInfo.list[index[i]].status.codeText = "未通过" ;
			}

			temp.length>0 && API.post("/oa/plan/updateStatus",{"id":temp.join(","),"status":newStatus},success,error);
    	}
	}

} ]);