'use strict';

angular.module('app')
    .controller('schoolSilvController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API','recordFormat',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API,recordFormat) {
            $scope.app_name = "修改学校四率";

            $scope.school = {};
            $scope.init = function () {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.record.unpassb=100-$scope.record.unpass2;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/scoreRate/read/detail/school",{}, success, error);
            }
            $scope.init();

            $scope.submit = function () {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $state.go('main.schooldesk');
                    }, 2000);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                delete $scope.record.updateTime;
                delete $scope.record.createTime;
                delete $scope.record.region;
                delete $scope.record.user;
                recordFormat.format($scope.record,'.');
                API.post('/scoreRate/update', $scope.record, success, error);

            }

            validate();
            function validate() {
                jQuery('#school_silv_form').validate({
                    rules: {
                        excellent: {
                            required: true
                        },
                        good: {
                            required: true
                        },
                        pass: {
                            required: true
                        },
                        unpass: {
                            required: true
                        }
                    },
                    messages: {
                        excellent: {
                            required: '请填写优秀分数线'
                        },
                        good: {
                            required: '请填写良好分数线'
                        },
                        pass: {
                            required: '请填写及格分数线'
                        },
                        unass: {
                            required: '请填写低分分数线'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }
        }
    ])