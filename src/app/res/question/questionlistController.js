'use strict';

angular.module('app')
	.controller('questionlistController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		$scope.title="题目管理"+' ('+$state.params.subject_name+' '+$state.params.grade_name+')';


		

		$scope.param = {
			"subjectId" : $state.params.subject_id,  //课目ID
			"gradeId" : $state.params.grade_id,  //年级ID
			"subjectName": $state.params.subject_name,
			"gradeName": $state.params.grade_name
		}


		$scope.loading=false;

		$scope.search = function (){
			$scope.loading=true;
			$.ajax({
				url : '/res/question/list',
				data: $scope.param
			}).then(function(result){
				console.log(result)
				$scope.loading = false;
				if(result.httpCode == 200){
					$scope.pageInfo = result.data;
				}else{
					$scope.msg = result.msg;
				}
				$scope.$apply();
			})
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


		//试题类型 
		$scope.get_type = function(){

			var success = function(result){
				console.log(result);
				$scope.type = result.data.list;
				$scope.type.reverse();
				$scope.$apply();
			};
			var error  = function(){

			}
			API.post('/dic/read/list',{"key":"QUESTION_TYPE"},success,error);
		};
		$scope.get_type();

		$scope.get_typeName = function(id){

			if($scope.type &&　$scope.type.length>0){
				for (var i = 0; i < $scope.type.length; i++) {
					if($scope.type[i].id == id){
						return $scope.type[i].codeText;
						break;
					}
				}
			}
			
		}


		$scope.get_content = function(str){

			return JSON.parse(str).c;
		}


		// 试题难度
		$scope.get_level = function(){

			var success = function(result){
				console.log(result);
				$scope.level = result.data.list;
				$scope.level.reverse();
				$scope.$apply();
			};
			var error  = function(){

			}
			API.post('/dic/read/list',{"key":"QUESTION_LEVEL"},success,error);
		};
		$scope.get_level();

		$scope.get_levelName = function(id){
			if($scope.level && $scope.level.length>0){
				for (var i = 0; i < $scope.level.length; i++) {
					if($scope.level[i].id == id){
						return $scope.level[i].codeText;
						break;
					}
				}
			}
		}




}])