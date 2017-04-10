'use strict';

angular.module('app')
	.controller('extraclassController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		$scope.title="课外资源分类管理";

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


		//学校类型
        $scope.get_type = function(key){
			

			var success = function(result){
				$scope.school_type = result.data.list;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post("/dic/read/list",{"key":key},success,error);
        }

        $scope.get_type("GRADE_TYPE");



}])