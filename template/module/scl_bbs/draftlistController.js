'use strict';

angular.module('app')
	.controller('draftlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	$scope.param={ };
	$scope.loading=false;

	if($state.params.sorts_id){
		$scope.param.catalogId = $state.params.sorts_id;
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
			console.log($scope.pageInfo);
		
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/scl/bbs/read/draftMessages',{},success,error);

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
    //删除操作
	$scope.del = function(id){
		var success = function(result){
				toaster.clear('*');
            	toaster.pop('success', "", "删除成功");
            	$timeout(function(){
            		$scope.search();
            	},500);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		if(id){ //单个删除
            console.log({"id":id});
			API.post("/scl/bbs/delete",{"id":id},success,error);

		}else{ //批量删除

			var temp = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
			}


			temp.length>0 && API.post("/bbs/delete",{"id":temp.join(",")},success,error);
		}
    }



     // $scope.committee_list();
	   if(!$state.params.catalogId || $state.params.catalogId==0){

	   		//$scope.schoolteachers_list();

	   		$scope.$watch("sorts",function(){
				if(!$scope.sorts){
					return false;
				}

				console.log('有值了');
		        if($scope.sorts.list.length>0){
		                // $scope.param.catalogId = $scope.sorts.list[0].id;
		                $scope.set_curr($scope.param.catalogId);
		                $scope.search();
		        }
				
			})


	   }else{
	   		$scope.params.catalogId = $state.params.catalogId;
	   		$scope.set_curr($state.params.catalogId);
	   		$scope.search();
	   }




	   $scope.open_confrim = function(id){

	   		ngDialog.open({
				template:'template/module/edu/activity/confirm.html',
				controller: 'activityconfirmController',
				className: 'ngdialog-theme-green',
				data:{
					"id":id,
					"callback":$scope.del
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})


	   }

	   // 搜索文字
	   // $scope.search_in=function(){
	   // 		$scope.arr1=$filter("filter")(arr,document.getElementById("wei").value);  
	   // }

	   $scope.submit = function(id,obj){

	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");

                $timeout(function(){

                	$scope.search();

                },200);

	   		}
	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

	   		API.post("/scl/bbs/publish",{"bbsId":id},success,error);

	   }



}])