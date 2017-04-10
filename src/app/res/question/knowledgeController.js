'use strict';

angular.module('app')
	.controller('knowledgeController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster','recordFormat','API','Upload','ngDialog','ivhTreeviewMgr',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster,recordFormat,API,Upload,ngDialog,ivhTreeviewMgr) {


	 //学校类型
        $scope.get_type = function(key){
			

			var success = function(result){
				$scope.school_type = result.data.list;
				$scope.$apply();


				//修改试题时
				if($scope.record.id){
					$scope.get_tree($scope.record.schoolType);
				}


			}
			var error = function(){

			}

			API.post("/dic/read/list",{"key":key},success,error);
        }

        $scope.get_type("GRADE_TYPE");



		$scope.get_tree = function(schoolTypeId){
			console.log(schoolTypeId);
			$scope.record.schoolType = schoolTypeId;
			var success = function(result){

				if(result.data){
					$scope.knowledge_tree = result.data;
				}else{
					$scope.knowledge_tree = null;
				}

				$scope.$apply();
				
			}
			var error = function(){

			}

			var obj = {
				"schoolType":schoolTypeId,
				"subjectId":$scope.param.subjectId
			};
		
			API.post('/res/knowledge/treelist',obj,success,error);
		}


	$scope.select_this = function(obj){
			console.log(obj);
			/*$scope.record.parentId = obj.id;
			$scope.parentName = obj.label;
*/			
			$scope.record.s_knowledgePoints = obj.label;
			$scope.record.knowledgePoints = obj.id;

			$timeout(function(){
				ivhTreeviewMgr.expandRecursive($scope.knowledge_tree, $scope.knowledge_tree);
				$scope.validator();
			})
			
		}


	

}])
