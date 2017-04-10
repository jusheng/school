'use strict';

angular.module('app')
	.controller('notelistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',"recordFormat",
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {
	
	$scope.param={ };
	$scope.loading=false;

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
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}

		recordFormat.format($scope.param,".");
	
		API.post('/reminder/read/list',$scope.param,success,error);
		

	}

	$scope.search();

	$scope.clearSearch = function() {
			$scope.param.key= null;
			$scope.search();
	}
	$scope.$watch("param.key",function(){
		
		if($scope.param.key==""){
			$scope.param.key= null;
		}
	})

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
            	},1000);
			}
		var error = function(result){
			toaster.clear('*');
        	toaster.pop('error', '', result.msg);
		}

		//if(id){ //单个删除

			API.post("/reminder/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/reminder/delete",{"id":temp.join(",")},success,error);
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

		// 	API.post("/reminder/delete",{"id":id},success,error);

		// }else{ //批量删除

		// 	var temp = [];
		// 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
		// 		$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
		// 	}


		// 	temp.length>0 && API.post("/reminder/delete",{"id":temp.join(",")},success,error);
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
		    className: 'ngdialog-theme-red',
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


    function validate(){
    	$('#search_form').validate({
    		/*rules:{
    			key: {
                        required: true
                    },
    		},
    		messages: {
            	key: {
                    required: '请添写关键字'
                }
            },*/
            submitHandler: function() {
                $scope.search();
            }
    	})
    }

    validate();





} ]);