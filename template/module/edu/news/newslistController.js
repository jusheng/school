'use strict';

angular.module('app')
	.controller('newslistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	$scope.param={ };
	$scope.loading=false;
	console.log($state.params.sorts_id);

	if($state.params.sorts_id != 0){
		$scope.param.sortsId = $state.params.sorts_id;
		// alert($scope.param.sortsId);
	}


	$scope.s_all = 0;  //全选标记
    $scope.select_all = function(){
    	$scope.s_all = !$scope.s_all;

    	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    		$scope.pageInfo.list[i].selected = $scope.s_all;
    	}

    };	
    //单选标记
    $scope.select_per = function(index){
    	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }
    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
		
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
		console.log($scope.param);
		API.post('/scl/news/read/list',$scope.param,success,error);

	}

	$scope.search();


	$scope.get_sortName = function(sorts_id){
		var l = $scope.sorts.list.length;
		for (var i = 0; i < l; i++) {
			if($scope.sorts.list[i].id==sorts_id){
				return $scope.sorts.list[i].name;
				break;
			}
		}
	}




	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

    $scope.do_del = function(id){
    	var success = function(result){
				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.search();
            		$scope.$emit('sendParent','删除成功，重新排名')
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		if(id){ //单个删除

			API.post("/scl/news/delete",{"id":id},success,error);

		}else{ //批量删除

			var temp = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
			}


			temp.length>0 && API.post("/scl/news/delete",{"id":temp.join(",")},success,error);
		}
    }
    

		$scope.open_confrim = function(id){

	   		ngDialog.open({
				template:'template/module/edu/activity/confirm.html',
				controller: 'activityconfirmController',
				className: 'ngdialog-theme-green',
				data:{
					"id":id,
					"callback":$scope.do_del
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})
	  
		
		} 
     	


} ]);