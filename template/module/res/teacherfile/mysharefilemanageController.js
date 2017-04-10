'use strict';

angular.module('app')
	.controller('mysharefilemanageController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
	 
	//取得当前目录下文件夹和文件    
      $scope.get_directory = function(){
      		var success = function(result){
	   			$scope.file = result.data;
	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/directory/myshareDir",{},success,error);
      }
      $scope.get_directory();





      //右击标记当前资源项
      $scope.curr_res = null;
      $scope.onShow = function(index){
      	$scope.curr_res = $scope.file[index];
      }

      $scope.onClose = function(index){
      	$scope.curr_res = null;
      } 
      

       //取消分享
      $scope.cancel_share = function(){
      	var success = function(result){
			toaster.clear('*');
        	toaster.pop('success', '', "操作成功！");

        	$scope.get_directory();

		}	
		var error = function(){


		}
		
		API.post("/res/directory/unbindshareDir",{"dirId":$scope.curr_res.id},success,error);	
      }


      //双击文件夹 访问下一级
      $scope.go_next = function(index){
      	  $scope.set_curr(index);
      	  $state.go('main.res.teacherfile.filemanage',{"parentId":index});
      }


      //删除文件
      $scope.del = function(){
		var success = function(result){
			toaster.clear('*');
        	toaster.pop('success', '', "删除成功！");

        	$scope.get_directory();

		}	
		var error = function(){


		}
		
		API.post("/res/directory/delete",{"id":$scope.curr_res.id},success,error);	
      }                               	

}])