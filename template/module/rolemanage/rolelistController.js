'use strict';

angular.module('app')
	.controller('rolelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		//$scope.app_name = "角色管理";
		$scope.param={ };
		$scope.loading=false;

	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			//console.log("sssss"+result);
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
		API.post('/sys/role/read/list',$scope.param,success,error);

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

    //获取角色类型
        $scope.getType = function(){
            var success = function(result){
                $scope.rType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"EDU_ROLETYPE"},success,error);
        }
    $scope.getType();


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
		 //单个删除
			API.post("/sys/role/delete",{"id":id},success,error);
    }

    //单个删除
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
		//  //单个删除
		// 	API.post("/sys/role/delete",{"id":id},success,error);

	   
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