'use strict';

angular.module('app')
	.controller('useraddController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {
                          
        //判断是修改还是添加
	        $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
                $scope.getType($scope.record.userType);
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            API.post("/user/read/detail",{"id":id},success,error);

         }  

         //获取用户类型
        $scope.getType = function(userType){
            var success = function(result){
                console.log(result);
                $scope.uType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"EDU_ROLETYPE",userType:userType},success,error);
        }
       

       

        if($state.params.id){
            $scope.app_name = "修改账户";
            $scope.init($state.params.id);
        }else{
            $scope.app_name = "添加账户";
            $scope.getType(0);

        }

        
	   $scope.submit = function(){
            
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.usermanage.userlist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            if($scope.record.parentId==null){
                $scope.record.parentId="";
            }

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            delete $scope.record.school;

            recordFormat.format($scope.record,'.');

            if($state.params.id){
                API.post('/user/update',$scope.record,success,error);

            }else{
                API.post('/user/add',$scope.record,success,error);
            }

	   }


	validate();
	function validate(){
            jQuery('#teacheradd_form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    loginName: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    userType: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写姓名'
                    },
                    loginName: {
                        required: '请填写登录名'
                    },
                    password: {
                        required: '请填写密码'
                    },
                    userType: {
                        required: '请填写用户类型'
                    },
                    remark: {
                        required: '请填写备注'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }



	}
])
