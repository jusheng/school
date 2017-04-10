'use strict';

angular.module('app')
    .controller('roleController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster', 'API',
        function($rootScope, $scope, $timeout, $http, $state, toaster, API) {
            $scope.loading = false;
            $scope.school_id = $state.params.school_id;
            $scope.name = $state.params.name;


            //编辑页初始化数据	
            $scope.init = function(id) {


                var success = function(result) {
                    $scope.record = result.data;
                    $scope.$apply();
                };

                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };

                API.post('/edu/read/detail', {
                    "id": id
                }, success, error);



            };



            if ($state.params.role_id) {
                $scope.title = $scope.name + " > 编辑教务角色";

                $scope.init($state.params.role_id);
            } else {
                $scope.title = $scope.name + " > 添加教务角色";

                $scope.record = {
                    "schoolId": $scope.school_id
                };

                //$scope.get_all_dept();     
            }



            $scope.submit = function() {
               
                delete $scope.record.updateTime;
                delete $scope.record.createTime;

                var success = function(msg) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function() {
                        $state.go('main.edu.role.rolelist',{"school_id":$scope.school_id,"name":$scope.name});
                    }, 2000);
                };

                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };

                var url = $state.params.role_id ? '/edu/update' : '/edu/add';
                API.post(url, $scope.record, success, error);



            }


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



                //表单验证
            function validate() {
                jQuery('form').validate({
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
                            required: "请添写角色名称"
                        },
                        roleType: {
                            required: "请选择角色类型"
                        },
                        remark: {
                            required: "请添写角色简介"
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();



        }
    ])