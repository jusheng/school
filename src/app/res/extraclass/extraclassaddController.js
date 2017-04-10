	'use strict';

	angular.module('app')
		.controller('extraclassaddController',['$rootScope','$scope','$http','$state','toaster','API','$timeout','recordFormat',
			function($rootScope,$scope,$http,$state,toaster,API,$timeout,recordFormat){
			
			$scope.schoolType = $state.params.school_type;
			$scope.schoolName = $state.params.school_name;
			$scope.subjectId = $state.params.subject_id;
			$scope.km = $state.params.km;
			
		
			$scope.title="课外资源分类管理 - " + $scope.schoolName +" - "+ $scope.km;



			$scope.init = function(){
				var success = function(result){

					$scope.record = result.data;
					$scope.$apply();
				}
				var error = function(){

				}

				API.post('/res/extraResourceClassify/detail',{"id":$state.params.id},success,error);


			}

			if($state.params.id != "0"){
				$scope.init();
			}else{
				$scope.record = {
					"schoolType":$scope.schoolType,
					"subjectId":$scope.subjectId
				};
			}

			
			$scope.submit = function(){
				var success = function(){
					toaster.clear('*');
	            	toaster.pop('success', '', "操作成功");
	            	$timeout(function(){
	            		$state.go("main.res.extraclass.classlist",{subject_id: $scope.subjectId,school_type:$scope.schoolType,km:$scope.km,school_name:$scope.schoolName});
	            	},1000);

				};

				var error = function(result){
					toaster.clear('*');
	            	toaster.pop('error', '', result.msg);
				}

				recordFormat.format($scope.record,'.');

				if($state.params.id !="0"){
					API.post("/res/extraResourceClassify/update",$scope.record,success,error);
				}else{
					API.post("/res/extraResourceClassify/add",$scope.record,success,error);
				}
				
			
			}
				
			//表单验证
	        function validate(){
	            jQuery('form').validate({
	                rules: {
	                	title: {
	                        required: true
	                    },
	                    sort: {
	                        required: true
	                    }
	                },
	                messages: {
	                	title: {
	                        required: '请填写分类名称'
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