'use strict';

angular.module('app')
	.controller('pwdController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API) {
       	
	  $scope.menu.curr=2;   
	  

	  $scope.submit = function(){
	  		var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "修改成功");

                $timeout(function(){

                    $state.go('login');
                },1000);


            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/user/update/changePassword",$scope.record,success,error);
	  };


	  validate();
	  function validate() {
      
                jQuery('#pwd_form').validate({
                    rules: {
                        oldPassword: {
                            required: true,
                        },
                        newPassword: {
                            required: true,
                        },
                        confirmnewpassword: {
                            required: true,
                            equalTo: "#newPassword"
                        }
                    },
                    messages: {
                        oldPassword: {
                            required: "请输入当前密码！",
                        },
                        newPassword: {
                            required: "请输入新密码！",
                        },
                        confirmnewpassword: {
                            required: "请重复输入新密码！",
                            equalTo: "两次输入的新密码不同，请重新输入！"
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }	


}])