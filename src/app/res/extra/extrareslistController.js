'use strict';

angular.module('app')
	.controller('extrareslistController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		
		$scope.subjectId = $state.params.subject_id;
		$scope.km = $state.params.km;
		console.log($state.params);

		$scope.title="课外资源管理 - "+$scope.km;

		$scope.param = {
			"subjectId":$scope.subjectId
		};
		$scope.search = function (){
			$scope.loading=true;

			var success = function(result){
				$scope.pageInfo = result.data;
				console.log($scope.pageInfo);
				$scope.loading = false;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/res/extraResource/list',$scope.param,success,error);

		}
		$scope.search();

		$scope.clearSearch = function(){
			$scope.param.keyword=null;
			$scope.search();
		}

		//翻页
		$scope.pagination=function(obj){
			$scope.param.pageNum=obj.page;
			$scope.search();
		}


		$scope.del = function(id){
			var success = function(result){
				toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
				$scope.search();
			}
			var error = function(){
				
			}

			API.post('/res/extraResource/delete',{"id":id},success,error);

		}

}])