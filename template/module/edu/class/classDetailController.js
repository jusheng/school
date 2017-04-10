'use strict';

angular.module('app')
    .controller('classDetailController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API','recordFormat',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API,recordFormat) {
            $scope.record = {};
            console.log($state.params);
            console.table($state.params);
            $scope.gradeId = $state.params.gradeId;
            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/class/read/detail", {"id": id}, success, error);
            }

            if ($state.params.id) {
                $scope.app_name = "修改班级信息";
                $scope.init($state.params.id);
            } else {
                $scope.app_name = "添加班级信息";
                $scope.record.grade = {};
                $scope.record.grade.id = Number($scope.gradeId);
            }

            $scope.submit = function () {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $state.go('main.class.classList', {grade_id: $state.params.gradeId});
                    }, 2000);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record["teacher.id"] = $scope.record.teacher.id;
                if ($scope.record.subjectGroup) {
                    $scope.record["subjectGroup.id"] = $scope.record.subjectGroup.id;
                    delete $scope.record.subjectGroup;
                }
                $scope.record["grade.id"] = $scope.record.grade.id;
                // $scope.record["school.id"] = $scope.record.school.id;
                // delete $scope.record.teacher;
                // delete $scope.record.grade;
                // delete $scope.record.school;
                // delete $scope.record.createTime;
                // delete $scope.record.updateTime;
                recordFormat.format($scope.record,'.')

                if ($state.params.id) {
                    API.post('/class/update', $scope.record, success, error);
                } else {
                    API.post('/class/add', $scope.record, success, error);
                }
            }

            $scope.getGrade = function () {
                var success = function (result) {
                    $scope.grade = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/grade/read/all", {}, success, error);
            }

            $scope.getGrade();

            $scope.getTeacher = function () {
                var success = function (result) {
                    $scope.teacher = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/edu/teacher/read/all", {}, success, error);
            }

            $scope.getTeacher();

            $scope.getSubjectGroup = function () {
                var success = function (result) {
                    $scope.subjectGroup = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/subjectGroup/read/all", {gradeId: $state.params.gradeId}, success, error);
            }

            $scope.getSubjectGroup();

            validate();
            function validate() {
                jQuery('#class_form').validate({
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