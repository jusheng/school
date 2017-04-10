'use strict';

angular.module('app')
	.controller('userlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "用户管理";
		$scope.param={ };
		$scope.loading=false;

	$scope.search=function(){

		var success = function(result){
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
        if($scope.param.userType==null){
            delete $scope.param.userType;
        }
		API.post('/user/read/list',$scope.param,success,error);

	}

	$scope.search();

	//获取用户类型
    $scope.getType = function(){
            var success = function(result){
                $scope.uType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"EDU_ROLETYPE"},success,error);
        }
    $scope.getType();


	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	//弹出框修改密码
	$scope.add_module = function(id){
		ngDialog.open({
			template:'template/module/usermanage/change.html',
			controller: 'changeController',
			className: 'ngdialog-theme-green',
			data:{"id":id},
			resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/usermanage/changeController.js').then(function(){
                        		return $ocLazyLoad.load('toaster');
                        	});
                    }]}
		})
	}
//弹出框分配角色
	$scope.assign_module = function(id){
		ngDialog.open({
			template:'template/module/usermanage/assignrole.html',
			controller: 'assignroleController',
			className: 'ngdialog-theme-green',
			data:{"id":id},
			resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/usermanage/assignroleController.js').then(function(){
                        		return $ocLazyLoad.load('toaster');
                        	});
                    }]}
		})
	}
 //弹出框绑定
    $scope.bind_module = function(id,userType){
		ngDialog.open({
			template:'template/module/usermanage/bind.html',
			controller: 'bindController',
			className: 'ngdialog-theme-green',
			data:{"id":id,"userType":userType},
			resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/usermanage/bindController.js').then(function(){
                        		return $ocLazyLoad.load('toaster');
                        	});
                    }]}
		})
	}
	$scope.remove_module = function(id){
    	
		 var success = function(result){
            toaster.clear('*');
            toaster.pop('success', '', "保存成功");
            location.reload();
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/user/update/removeBundData",{"eduUserId":id,"targetId":0},success,error);
	}

	// 翻页
    $scope.pagination = function (obj) {
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

        //取得角色
    $scope.get_role = function(id){

        var success = function(result){
            console.log(result);
            $scope.role = result.data;
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/sys/userrole/read/list",{"userId":id},success,error);

    }   
    // $scope.get_role();
     
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
         API.post("/user/delete",{"id":id},success,error);
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
		// 	API.post("/user/delete",{"id":id},success,error);

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