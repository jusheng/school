'use strict';

angular.module('app')
	.controller('activityteacherlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	$scope.param={ };
	$scope.loading=false;

	if($state.params.sorts_id){
		$scope.param.catalogId = $state.params.sorts_id;
	}else{
		//$scope.param.catalogId = {};
		$scope.param = {};
	}

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
			console.log(result);
			$scope.pageInfo = result.data;
			// console.log($scope.pageInfo);
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				// if($scope.pageInfo.list[i].createTime){
				
				// $scope.pageInfo.list[i].starttime = $scope.pageInfo.list[i].starttime.split(" ")[0];
				
				// }
				if($scope.pageInfo.list[i].starttime){
					$scope.pageInfo.list[i].starttime = $scope.pageInfo.list[i].starttime.split(" ")[0];
				}
				if($scope.pageInfo.list[i].endtime){
					$scope.pageInfo.list[i].endtime = $scope.pageInfo.list[i].endtime.split(" ")[0];
				}
			}

			// console.log($scope.pageInfo);
			// $scope.pageInfo.list(#index).id;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/scl/activity/getListByParam',$scope.param,success,error);

	}

	$scope.search();

	

	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
     // 对号符号变化
	   if(!$state.params.catalogId || $state.params.catalogId==0){
	  
	   		$scope.$watch("sorts.list",function(){
				if(!$scope.sorts.list){
					return false;
				}

				console.log('有值了');
		        if($scope.sorts.list.length>0){
		                $scope.set_curr($scope.param.catalogId);
		                $scope.search();
		        }
				
			})


	   }else{
	   		$scope.params.catalogId = $state.params.catalogId;
	   		$scope.set_curr($state.params.catalogId);
	   		$scope.search();
	   }
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

			API.post("/scl/activity/delete",{"id":id},success,error);

		}else{ //批量删除

			var temp = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
			}

			temp.length>0 && API.post("/scl/catalog/delete",{"id":temp.join(",")},success,error);
		}
    }

}])