'use strict';

angular.module('app')
	.controller('noticelistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	$scope.param={};
	$scope.loading=false;

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
			console.log(result);
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/scl/affiche/read/list',$scope.param,success,error);

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
    //弹出框详情列表
	$scope.notice_detail = function(id){
		ngDialog.open({
			template:'template/module/notice/noticedetail.html',
			controller: 'noticedetailController',
			data:{"id":id},
			width:1000,
			resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/notice/noticedetailController.js').then(function(){
                        		return $ocLazyLoad.load('toaster');
                        	});
                    }]}
		})
	}
	//发布公告
	$scope.sendNotice=function(id){

		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "发布成功");
                $timeout(function(){
                	$scope.search();
                   // $state.go('main.notice.noticelist');
                },2000);
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            API.post('/scl/affiche/publish',{"status":1,"id":id},success,error);

         
	}

	$scope.do_del = function(id){
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

		//if(id){ //单个删除

			API.post("/scl/affiche/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/edu/affiche/delete",{"id":temp.join(",")},success,error);
		// }
	}

    //删除操作
	$scope.del = function(id){

		// var success = function(result){
		// 		toaster.clear('*');
  //           	toaster.pop('success', "", "删除成功");
  //           	$timeout(function(){
  //           		$scope.search();
  //           	},1000);
		// 	}
		// var error = function(result){
		// 	toaster.clear('*');
  //       	toaster.pop('error', '', result.msg);
		// }

		// if(id){ //单个删除

		// 	API.post("/edu/affiche/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/edu/affiche/delete",{"id":temp.join(",")},success,error);
		// }


		if(id){
		    var id = id;
		}else{
		    var temp = [];
		    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		    }
		    var id = temp.join(",");
		}

		if(id.length==0){
		    return false;
		}


		ngDialog.open({
		    template:'template/module/tpl/confirm.html',
		    controller: 'confirmController',
		    className: 'ngdialog-theme-green',
		    data:{
		        "id":id,
		        "callback":$scope.do_del
		    },
		    resolve: {
		             deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
		                return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
		                    return $ocLazyLoad.load('toaster');
		                });
		         }]}
		})


    }    


} ]);