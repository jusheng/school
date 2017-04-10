'use strict';

angular.module('app')
	.controller('teachrehomeworklistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

	 
	$scope.param={
	 		"homeworkType":0
	 	 };
	$scope.loading=false;


	$scope.set_curr(2);


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
	
		API.post('/homework/read/list',$scope.param,success,error);

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


    //发放作业
    $scope.send_bj = function(homeworkId,id,title,km_title){

    	ngDialog.open({
				template:'template/module/homework/teacherhomework/selectbj.html',
				controller: 'selectbjController',
				className: 'ngdialog-theme-primary',
				data:{
					"homeworkId":homeworkId,
					"id":id,
					"title":title,
					"km_title":km_title
				},
				resolve: {
   	                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
   	                     	return uiLoad.load('template/module/homework/teacherhomework/selectbjController.js').then(function(){
   	                     		return $ocLazyLoad.load('toaster');
   	                     	});
   	                 }]}
			})

    }


    //取得所教的班级
	$scope.getClass=function(){
		var success = function(result){
			$scope.classInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/edu/teacher/getTeacherClass',{},success,error);
		//API.post('/oa/addressbook/read/list/class',{},success,error);

	}
	//$scope.getClass();

	$scope.do_del = function(id){
		var success = function(result){
			toaster.clear('*');
            toaster.pop('success', '', "操作成功！");
            $timeout(function(){
            	$scope.search();
            },500);
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/homework/delete',{"id":id},success,error);
	}

	$scope.del_one = function(id){
		// var success = function(result){
		// 	toaster.clear('*');
  //           toaster.pop('success', '', "操作成功！");
  //           $timeout(function(){
  //           	$scope.search();
  //           },500);
		// }

		// var error = function(result){
		// 	toaster.clear('*');
  //           toaster.pop('error', '', result.msg);
		// }
	
		// API.post('/homework/delete',{"id":id},success,error);


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
		    className: 'ngdialog-theme-primary',
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




}])	                                	