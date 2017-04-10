'use strict';

angular.module('app')
	.controller('selectbjController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,recordFormat) {

	$scope.title = $scope.ngDialogData.title +"-"+ $scope.ngDialogData.km_title;                          	
		
	$scope.record = {
		"homework":{
			"id":$scope.ngDialogData.homeworkId
		},
		"id":$scope.ngDialogData.id
	}


	//取得所教的班级
	$scope.getClass=function(){
		var success = function(result){
			$scope.classInfo = result.data;
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
	
		API.post('/edu/teacher/getTeacherClass',{},success,error);
		//API.post('/oa/addressbook/read/list/class',{},success,error);
	}
	$scope.getClass();


	$scope.submit = function(){

		var success = function(result){
			toaster.clear('*');
            toaster.pop('success', '', "操作成功");
            $scope.closeThisDialog();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}

		$scope.record.classIds = $scope.record.classIds.join(",");
		//$scope.record.endDate = new Date($scope.record.endDate);

		recordFormat.format($scope.record,'.');

	
		API.post('/homework/release',$scope.record,success,error);

	}

	function validate(){
	   	//console.log('form:'+jQuery('#sendbj_form').length);

	   	if(jQuery('#sendbj_form').length==0){
	   		setTimeout(function(){
				validate();
	   		},500)
	   	}

            jQuery('#sendbj_form').validate({
                rules: {
                	bj_s: {
                        required: true
                    },
                    endDateStr: {
                        required: true
                    }
                },
                messages: {
                	bj_s: {
                        required: '请选择班级'
                    },
                    endDateStr: {
                        required: '请选择完成时间'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();


	
}]);

