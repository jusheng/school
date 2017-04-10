'use strict';

angular.module('app')
	.controller('extraclasslistController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		
		$scope.schoolType = $state.params.school_type;
		$scope.schoolName = $state.params.school_name;
		$scope.subjectId = $state.params.subject_id;
		$scope.km = $state.params.km;
		
	
		$scope.title="课外资源分类管理 - " + $scope.schoolName +" - "+ $scope.km;
		
		$scope.param = {
			"schoolType":$scope.schoolType,
			"subjectId":$scope.subjectId
		};
		$scope.search = function (){
			$scope.loading=true;

			var success = function(result){
				$scope.pageInfo = result.data;
				$scope.loading = false;
				$scope.$apply();
			}
			var error = function(){

			}

			API.post('/res/extraResourceClassify/list',$scope.param,success,error);

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
			var success = function(){
				toaster.clear('*');
	            toaster.pop('success', '', "操作成功");
	            $scope.search();
			};

			var error = function(result){
				toaster.clear('*');
	            toaster.pop('error', '', result.msg);
			}

			API.post('/res/extraResourceClassify/delete',{"id":id},success,error);

		}



}])