'use strict';

angular.module('app')
	.controller('kmlistController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		$scope.title="试题管理";

		$scope.loading=false;
		$scope.param = {};
		$scope.search = function (){
			$scope.loading=true;

			var success = function(result){
				$scope.pageInfo = result.data;
				$scope.loading = false;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/subject/read/list',$scope.param,success,error);

		}
		$scope.search();

		$scope.clearSearch = function(){
			$scope.param.keyword=null;
			$scope.search();
		}

		$scope.disableItem = function(id,enable){
			$.ajax({
				url : 'question/delete',
				data:{"id":id,'enable':enable} 
			}).then(function(result){
				
				$scope.loading=false;
				if(result.httpCode==200){
					toaster.clear('*');
					toaster.php('success','',"操作成功");
					$scope.search();
				}else{
					toaster.clear('*');
					toaster.pop('error','',result.msg);
				}
				$scope.$apply();
			});
		}

		//翻页
		$scope.pagination=function(obj){
			$scope.param.pageNum=obj.page;
			$scope.search();
		}


		$scope.get_basegrade = function(){

        	var success = function(result){
				$scope.basegrade = result.data;
				$scope.$apply();
			}
			var error = function(){

			}

        	API.post("/basegrade/read/alllist",{},success,error);	

        }	
        $scope.get_basegrade();

        $scope.get_textbook = function(subjectId,gradeId){
        	$scope.textbook = null;
        	var success = function(result){
				$scope.textbook = result.data;
				$scope.$apply();
			}
			var error = function(){

			}

        	API.post("/res/textbook/read/alllist",{"subjectId":subjectId,"gradeId":gradeId},success,error);	

        }	
        //$scope.get_textbook();



}])