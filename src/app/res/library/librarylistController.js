'use strict';

angular.module('app')
	.controller('librarylistController',['$rootScope','$scope','$http','$state','toaster','API',
		function($rootScope,$scope,$http,$state,toaster,API){
		$scope.title="资源管理"+' ('+$state.params.subject_name+' '+$state.params.grade_name+')';


		

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
				url : '/res/library/list',
				data: $scope.param
			}).then(function(result){
				console.log(result)
				$scope.loading = false;
				if(result.httpCode == 200){
					$scope.pageInfo = result.data;

					for (var i = 0; i < $scope.pageInfo.list.length; i++) {
						$scope.get_chapter($scope.pageInfo.list[i]);
						$scope.get_knowledge($scope.pageInfo.list[i]);
					}

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
				url : '/res/library/delete',
				data:{"id":id} 
			}).then(function(result){
				
				$scope.loading=false;
				if(result.httpCode==200){
					toaster.clear('*');
					toaster.pop('success','',"操作成功");
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


		//取得章节 
		$scope.get_chapter= function(obj){
			var success = function(result){
				console.log(result);

				obj.s_chapter = result.data.name;
				//obj.s_knowledgePoints = result.data.knowledgePointlist[0].name;

				// $scope.record.textbookId = result.data.chapterlist[0].textbook.id;
				// $scope.record.schoolType = result.data.knowledgePointlist[0].schoolType;

				$scope.$apply();

			};
			var error = function(){

			}

			API.post("/res/chapter/read/detail",{"id":obj.chapterId},success,error);
		}	

		$scope.get_knowledge= function(obj){

			if(obj.type==1){
				obj.s_knowledgePoints = "--";
			}else{
				var success = function(result){
					console.log(result);

					//obj.s_chapter = result.data.chapterlist[0].name;
					obj.s_knowledgePoints = result.data.name;

					// $scope.record.textbookId = result.data.chapterlist[0].textbook.id;
					// $scope.record.schoolType = result.data.knowledgePointlist[0].schoolType;

					$scope.$apply();

				};
				var error = function(){

				}

				API.post("/res/knowledge/read/detail",{"id":obj.knowledgeId},success,error);	
			}
			
		}	



}])