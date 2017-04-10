'use strict';

angular.module('app')
	.controller('chaptershowController',['$rootScope','$scope','$http','$state','toaster','API','recordFormat','ivhTreeviewMgr','$timeout',
		function($rootScope,$scope,$http,$state,toaster,API,recordFormat,ivhTreeviewMgr,$timeout){

		console.log(ivhTreeviewMgr);	


		$scope.record = {
			"subject":{
				"id": $state.params.subject_id
			},
			"grade":{
				"id":$state.params.basegrade_id
			},
			"textbook":{
				"id":$state.params.textbook_id
			}
		};




		$scope.record.basegradeId = $state.params.basegrade_id;

		$scope.title = '章节管理' +' / '+ $state.params.km;



		
        $scope.get_basegrade = function(){

        	var success = function(result){
				console.log(result);
				for (var i = 0; i < result.data.length; i++) {
					if($scope.record.basegradeId==result.data[i].id){
						$scope.title += '('+result.data[i].name+')'+$state.params.textbook_name;
						$scope.gradeName = result.data[i].name;
						break;
					}
				}

				$scope.get_tree();

				$scope.$apply();
			}
			var error = function(){

			}

        	API.post("/basegrade/read/alllist",{},success,error);	

        }	
        $scope.get_basegrade();




        $scope.first_init = function(){
        	var obj = {
        		"name":$state.params.km+'('+$scope.gradeName+')'+$state.params.textbook_name,
        		"grade.id":$scope.record.grade.id,
        		"textbook.id":$scope.record.textbook.id,
        		"subject.id":$scope.record.subject.id,
        		"parentId":"0",
        		"sort":'1'
        	}
        	console.log(obj);


        	var success = function(result){
				/*toaster.clear('*');
	            toaster.pop('success', '', "添加成功");*/
	            $scope.get_tree();

			};

			var error = function(){

			}

			API.post('/res/chapter/add',obj,success,error);

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
				"gradeId":$scope.record.grade.id,
				"textbookId":$scope.record.textbook.id,
				"subjectId":$scope.record.subject.id
			};
		
			API.post('/res/chapter/treelist',obj,success,error);
		}

		



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
	          
	            $scope.record = {
					"subject":{
						"id": $scope.record["subject.id"]
					},
					"grade":{
						"id":$scope.record["grade.id"]
					},
					"textbook":{
						"id":$scope.record["textbook.id"]
					}
				};

	            $scope.get_tree();

			};

			var error = function(){

			}

			API.post('/res/chapter/add',$scope.record,success,error);

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

			API.post('/res/chapter/delete',{"id":obj.id},success,error);

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
                        required: '请填写章节名称'
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