'use strict';

angular.module('app')
	.controller('roleaddController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',"recordFormat",
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {
        
	       $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            API.post("/sys/role/read/detail",{"id":id},success,error);

         }  

         //获取角色类型
       /* $scope.getType = function(){
            var success = function(result){
                $scope.rType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"EDU_ROLETYPE"},success,error);
        }
       $scope.getType();*/

       //角色类型
       $scope.roleType = [
                    {
                        "id":1,
                        "name":"学生"
                    },
                    {
                        "id":2,
                        "name":"老师"
                    },
                    {
                        "id":3,
                        "name":"管理员"
                    }
            ]




        if($state.params.id){
            $scope.app_name = "修改角色";
            $scope.init($state.params.id);
        }else{
            $scope.app_name = "添加角色";
        }

	   $scope.submit = function(){
            
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.rolemanage.rolelist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            if($scope.record.owner){
                $scope.record["owner.id"] = $scope.record.owner.id;//后台解析的一种方式
            }
            if($scope.record.school){
                $scope.record["school.id"] = $scope.record.school.id;
            }
            delete $scope.record.school;
            delete $scope.record.owner;

            recordFormat.format($scope.record,".");


            if($state.params.id){
                API.post('/sys/role/update',$scope.record,success,error);

            }else{
                API.post('/sys/role/add',$scope.record,success,error);
            }

	   }


	validate();
	function validate(){
            jQuery('#roleadd_form').validate({
                rules: {
                	roleName: {
                        required: true
                    },
                    roleType: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	roleName: {
                        required: '请填写角色'
                    },
                    roleType: {
                        required: '请选择角色类型'
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