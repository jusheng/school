'use strict';

angular.module('app')
	.controller('chapterController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog','ivhTreeviewMgr',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload,ngDialog,ivhTreeviewMgr) {


	 //取得教材列表
	 $scope.get_textbook = function(subjectId,gradeId){
        	$scope.textbook = null;
        	var success = function(result){
				$scope.textbook = result.data;
				$scope.$apply();


				//修改试题时
				if($scope.record.textbookId){
					$scope.get_tree($scope.record.textbookId);
				}

			}
			var error = function(){

			}

        	API.post("/res/textbook/read/alllist",{"subjectId":$scope.param.subjectId,"gradeId":$scope.param.gradeId},success,error);	
    }
    $scope.get_textbook();

   //知识点树
	$scope.get_tree = function(textbookId){
		$scope.record.textbookId = textbookId;
		var success = function(result){

			if(result.data){
				$scope.treedata = result.data;
			}else{

				//没有结点的数据 自动添加顶级结点
				$scope.first_init();

			}

			$scope.$apply();
			
		}
		var error = function(){

		}

		var obj = {
			"gradeId":$scope.param.gradeId,
			"textbookId":textbookId,
			"subjectId":$scope.param.subjectId
		};
	
		API.post('/res/chapter/treelist',obj,success,error);
	}


	$scope.select_this = function(obj){
			console.log(obj);
			/*$scope.record.parentId = obj.id;
			$scope.parentName = obj.label;
*/			
			$scope.record.s_chapter = obj.label;
			$scope.record.chapterId = obj.id;
			$timeout(function(){
				ivhTreeviewMgr.expandRecursive($scope.treedata, $scope.treedata);

				$scope.validator();
			})

		}

		



	

}])
