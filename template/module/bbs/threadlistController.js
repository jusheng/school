'use strict';

angular.module('app')
	.controller('threadlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		
	$scope.loading=false;
 
    $scope.param={};

    $scope.search_btn = $state.params.id;
    console.log($scope.search_btn);
    if($state.params.id!=0){
    	$scope.param.sectorId = $state.params.id;
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

 

 	
 	// 按键标记
 	if ($state.params.id == 0) {
 		$scope.set_curr1(2);
 	}else{
 		$scope.set_curr1(0);
 	}


 	// 查询
	$scope.search=function(){
		

		var success = function(result){
			//result.data.list.reverse();
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
		}
	
		API.post('/scl/bbs/read/list',$scope.param,success,error);

	}

	$scope.search();
	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search1();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
   //  // 打开标记;
	   if(!$state.params.sectorId || $state.params.sectorId==0){

	   		//$scope.schoolteachers_list();

	   		$scope.$watch("sorts.list",function(){
				if(!$scope.sorts.list){
					return false;
				}

				console.log('有值了');
		        if($scope.sorts.list.length>0){
		                // $scope.param.catalogId = $scope.sorts.list[0].id;
		                $scope.set_curr($scope.param.sectorId);
		                $scope.search();
		        }
				
			})


	   }else{
	   		$scope.params.sectorId = $state.params.sectorId;
	   		$scope.set_curr($state.params.sectorId);
	   		$scope.search();
	   }

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


			temp.length>0 && API.post("/scl/bbs/delete",{"id":temp.join(",")},success,error);
		}
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

	$scope.search1=function(){
        var success = function(result){
            // console.log("sss"+result);
            $scope.pageInfo = result.data;
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
    
        API.post('/scl/bbs/read/list',$scope.param1,success,error);
        // API.post('/scl/bbs/read/list',$scope.param,success,error);

    }



}])