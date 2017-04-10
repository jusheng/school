'use strict';

angular.module('app')
	.controller('loginController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'toaster', 'API',
		function($rootScope, $scope, $http, $state, Upload, ngDialog, toaster, API) {


			$scope.login = function() {
				$state.go('main.desk');
			}

		
			$scope.isValidateCodeLogin = false;
			$scope.captchaUrl = "";
			$scope.submit = function() {
				toaster.clear("*");
				toaster.pop('wait', "", " 正在登录...");

				var success = function(msg) {
					toaster.clear("*");
					toaster.pop('success', "登录成功", "欢迎进入学习云平台！");
					setTimeout(function(){$state.go('main.desk');},1000);
				};
				var error = function(msg) {
					toaster.clear("*");
					toaster.pop('error', msg.msg, "请重新登录！");
					if(msg.isValidateCodeLogin){
						$scope.isValidateCodeLogin = msg.isValidateCodeLogin;
						$scope.captchaUrl = "/validateCode?time=" + new Date();
						$scope.$apply();
					}
					setTimeout(function(){toaster.clear("*");},1000);
				};

				API.post("/login", $scope.user, success, error);

				/*$.ajax({
				url : '/login',
				data: $scope.user
			}).then(function(result){
				if(result.httpCode==200){
					toaster.clear("*");
	   				toaster.pop('success', "登录成功", "欢迎进入学习云平台！");
	   				setTimeout(function(){$state.go('main.desk');},1000);

				}else{
					toaster.clear("*");
					toaster.pop('error', result.msg, "请重新登录！");
				}	
			})*/

			}

			$scope.changeCaptcha = function(){
				
				$scope.captchaUrl = "/validateCode?time=" + new Date();
				
			}


			$scope.$watch("isValidateCodeLogin",function(){

				if(!$scope.isValidateCodeLogin){
					$("#captcha").rules("remove");
					return false;
				}


				$("#captcha").rules("add",{required:true,messages:{required:"请输入正确验证码"}});

			});


			validate();
			
			function validate() {
				jQuery('#login').validate({
					rules: {
						username: {
							required: true
						},
						passwd: {
							required: true
						}
					},
					messages: {
						username: {
							required: '请添写用户名',
						},
						sortNo: {
							required: '请添写密码'
						}
					},
					submitHandler: function() {
						$scope.submit();
					}
				});
			}

		}
	]);