'use strict';

angular.module('app')
	.controller('sharefileshowController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {
	
	  $scope.id = $state.params.id;                              	

	  //取得当前目录下文件夹和文件    
      $scope.get_directory = function(){
      		var success = function(result){
	   			$scope.file = result.data;
	   			$scope.$apply();
	   		};

	   		var error = function(){

	   		}	

	   		API.post("/res/directory/getFiles",{"id":$scope.id},success,error);
      }
      $scope.get_directory();

      //双击文件夹 访问下一级
      $scope.go_next = function(index){
      	  $scope.id = index;
      	  $state.go('main.res.teacherfile.sharefileshow',{"id":index});
      }

      //右击标记当前资源项
      $scope.curr_res = null;
      $scope.onShow = function(index){
      	$scope.curr_res = $scope.file[index];
      }

      $scope.onClose = function(index){
      	$scope.curr_res = null;
      } 


      var img = {
      	"jpg":"template/img/teacherfile/jpg.png",
      	"png":"template/img/teacherfile/png.png",
      	"gif":"template/img/teacherfile/gif.png",
      	"doc":"template/img/teacherfile/doc.png",
		"docx":"template/img/teacherfile/doc.png",
		"ppt":"template/img/teacherfile/ppt.png",
		"pptx":"template/img/teacherfile/ppt.png",
		"xls":"template/img/teacherfile/xls.png",
		"xlsx":"template/img/teacherfile/xls.png",
		"txt":"template/img/teacherfile/txt.png",
      }
      $scope.return_url = function(obj){

      		//判断类型
      		var arr = obj.filename.split(".");	
      		var ext = arr[arr.length-1].toLowerCase();


      		return img[ext];
      }


      $scope.return_ext = function(obj){

      		if(obj==null){
      			return false;
      		}
      		//判断类型
      		var arr = obj.filename.split(".");	
      		return arr[arr.length-1].toLowerCase();
      }


      //下载
      $scope.download = function(){
          $('.download_'+$scope.curr_res.id).click();
      }

}])