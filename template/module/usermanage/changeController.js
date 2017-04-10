'use strict';

angular.module('app')
	.controller('changeController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

		 $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $scope.closeThisDialog();
                },1000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            delete $scope.record.school;
            $scope.record.id = $scope.ngDialogData.id

            API.post('/user/update/password',$scope.record,success,error);

	    }

	    validate();
	function validate(){

		if(jQuery('#teacheradd_form').length==0){
			setTimeout(function(){
				validate();
			},1000);
		}
			
            jQuery('#teacheradd_form').validate({
                rules: {
                	password: {
                        required: true
                    },
                    re_password: {
                        required: true,
                        equalTo:"#password"
                    }
                },
                messages: {
                	password: {
                        required: '请输入新密码'
                    },
                    re_password: {
                        required: '请再次输入新密码',
                        equalTo:"两次输入不一致"
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }


} ]);