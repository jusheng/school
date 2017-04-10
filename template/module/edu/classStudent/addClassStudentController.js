'use strict';

angular.module('app')
    .controller('addClassStudentController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.record = {};
            $scope.app_name = "添加班级学生";
            $scope.record["eduClass.id"] = Number($state.params.classId);

            $scope.submit = function () {
                var success =function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $scope.closeThisDialog();
                        $scope.ngDialogData.parent_scope.search();
                    }, 700);
                };

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.record["student.code"] = $scope.record.code;
                API.post('/edu/student/divide', $scope.record, success, error);
            }

            validate();
            function validate() {

                if(jQuery('#class_form').length==0){
                    setTimeout(function(){
                        validate();
                    },200);
                }

                jQuery('#class_form').validate({
                    rules: {
                        code: {
                            required: true
                        }
                    },
                    messages: {
                        code: {
                            required: '请填写学号'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }

        }
    ])