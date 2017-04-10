'use strict';

angular.module('app')
    .controller('gradeDetailController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/grade/read/detail", {"id": id}, success, error);
            }

            if ($state.params.id) {
                $scope.app_name = "修改年级信息";
                $scope.init($state.params.id);
            } else {
                $scope.app_name = "添加年级信息";
            }

            $scope.submit = function () {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $state.go('main.gradeManage.gradeList');
                    }, 2000);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record["basegrade.id"] = $scope.record.basegrade.id;
                delete $scope.record.createTime;
                delete $scope.record.updateTime;
                delete $scope.record.basegrade;
                delete $scope.record.school;

                if ($state.params.id) {
                    $scope.record["schoolYear.id"] = $scope.record.schoolYear.id;
                    delete $scope.record.schoolYear;
                    API.post('/grade/update', $scope.record, success, error);

                } else {
                    API.post('/grade/add', $scope.record, success, error);
                }

            }

            //获取学年
            $scope.getSchoolYear = function () {
                var success = function (result) {
                    $scope.schoolYear = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/schoolYear/read/all", {}, success, error);
            }

            $scope.getSchoolYear();

            //获取基础年级
            $scope.getBaseGrade = function () {
                var success = function (result) {
                    $scope.baseGrade = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/basegrade/read/type", {}, success, error);
            }

            $scope.getBaseGrade();

            //学校类型
            $scope.get_type = function(key){
                var callback = function(result){
                    console.log(result);
                    if(result.httpCode ==200){//成功

                        $scope.schoolType = result.data.list;
                        $scope.$apply();
                    }else{
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                };

                $.ajax({
                    url : '/dic/read/list',
                    data: {"key":key}
                }).then(callback);
            }

            $scope.get_type("GRADE_TYPE");

            validate();
            function validate() {
                jQuery('#grade_form').validate({
                    rules: {
                        name: {
                            required: true
                        }
                    },
                    messages: {
                        name: {
                            required: '请填写名称'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }

        }
    ])