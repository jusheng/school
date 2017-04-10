'use strict';

angular.module('app')
	.controller('knowledgeshowController',['$rootScope','$scope','$http','$state','toaster','API','recordFormat','ivhTreeviewMgr','$timeout',
		function($rootScope,$scope,$http,$state,toaster,API,recordFormat,ivhTreeviewMgr,$timeout){

		console.log(ivhTreeviewMgr);	


		$scope.record = {};	

		$scope.record.subject = {
			"id": $state.params.subject_id
		};

		$scope.record.schoolType = $state.params.school_type;

		$scope.title = '知识点管理' +' / '+ $state.params.km;



		//根据学校类型取得阶段
		
        $scope.get_type = function(key){
			

			var success = function(result){
				for (var i = 0; i < result.data.list.length; i++) {
				 	if(result.data.list[i].id==$scope.record.schoolType){
				 		$scope.title += '('+result.data.list[i].codeText+')';
				 		break;
				 	}
				 } 

			}
			var error = function(){

			}

			API.post("/dic/read/list",{"key":key},success,error);
        }

        $scope.get_type("GRADE_TYPE");




        $scope.first_init = function(){
        	var obj = {
        		"name":$state.params.km,
        		"subject.id":$scope.record.subject.id,
        		"schoolType":$scope.record.schoolType,
        		"parentId":"0",
        		"sort":'1'
        	}


        	var success = function(result){
				/*toaster.clear('*');
	            toaster.pop('success', '', "添加成功");*/
	            $scope.get_tree();

			};

			var error = function(){

			}

			API.post('/res/knowledge/add',obj,success,error);

        }


		//知识点树
		$scope.get_tree = function(){

			var success = function(result){

				if(result.data){
					$scope.knowledge_tree = result.data;
				}else{

					//没有结点的数据 自动添加顶级结点
					$scope.first_init();

				}

				$scope.$apply();
				
			}
			var error = function(){

			}

			var obj = {
				"schoolType":$scope.record.schoolType,
				"subjectId":$scope.record.subject.id
			};
		
			API.post('/res/knowledge/treelist',obj,success,error);
		}

		$scope.get_tree();



		$scope.select_this = function(obj){
			console.log(obj);
			$scope.record.parentId = obj.id;
			$scope.parentName = obj.label;

			$timeout(function(){
				ivhTreeviewMgr.expandRecursive($scope.knowledge_tree, $scope.knowledge_tree);
			})
			
		}




		$scope.submit = function(){

			recordFormat.format($scope.record,'.');

			var success = function(result){
				toaster.clear('*');
	            toaster.pop('success', '', "添加成功");
	            $scope.record.subject = {
	            	"id":$scope.record["subject.id"]
	            }
	            $scope.get_tree('update');



			};

			var error = function(){

			}

			API.post('/res/knowledge/add',$scope.record,success,error);

		}


		//删除节点
		$scope.del_this = function(obj){
			console.log('删除');
			console.log(obj);

			if(obj.pid=='0'){
				return false;
			}

			var success = function(){
				$scope.get_tree();
			};
			var error = function(){

			};

			API.post('/res/knowledge/delete',{"id":obj.id},success,error);

		}

		//表单验证
        function validate(){
            jQuery('form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    parentId: {
                        required: true
                    },
                    sort: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写知识点名称'
                    },
                    parentId: {
                        required: '请选择右侧节点'
                    },
                    sort: {
                        required: '请填写序号'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }


        validate();	

}])