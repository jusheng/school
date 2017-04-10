'use strict';

angular.module('app')
	.controller('searchstudentlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "学生管理";
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

     //获取性别
        $scope.getType = function(){
            var success = function(result){
                $scope.sexType = result.data;
                console.log($scope.sexType);
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"SEX"},success,error);
        }
       $scope.getType();
    
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			console.log("sss"+result);
			$scope.pageInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/student/read/list',$scope.param,success,error);

	}

	$scope.search();

   
	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}
	//下导入信息
	$scope.onFileSelect = function(files){
                angular.forEach(files,function(file){
                    file.upload = Upload.upload({
                        "url":"/student/importData",
                        headers: {'Content-Type': 'multipart/form-data'},
                        "data":{file:file},
                    });
                })
            };
	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
    //弹出框绑定
    $scope.bind_module = function(id,eduUserId){
		ngDialog.open({
			template:'template/module/studentmanage/studentbind.html',
			controller: 'studentbindController',
			className: 'ngdialog-theme-green',
			data:{"id":id,"eduUserId":eduUserId},
			resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        	return uiLoad.load('template/module/studentmanage/studentbindController.js').then(function(){
                        		return $ocLazyLoad.load('toaster');
                        	});
                    }]}
		})
	}
	//弹出框解除绑定
$scope.remove_module = function(id,eduUserId){

		 var success = function(result){
            toaster.clear('*');
            toaster.pop('success', '', "保存成功");
            location.reload();
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/user/update/removeBundData",{"eduUserId":eduUserId,"targetId":0},success,error);
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

			API.post("/student/delete",{"id":id},success,error);

		}else{ //批量删除

			var temp = [];
			for (var i = 0; i < $scope.pageInfo.list.length; i++) {
				$scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
			}


			temp.length>0 && API.post("/student/delete",{"id":temp.join(",")},success,error);
		}
    }


} ]);