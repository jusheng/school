'use strict';

angular.module('app')
    .controller('courseTeacherModalController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API', 'recordFormat', 'toaster',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API, recordFormat, toaster) {
            $scope.cid = $scope.ngDialogData.cid;
            $scope.sid = $scope.ngDialogData.sid;
            console.info($scope.cid, $scope.sid);
            $scope.record = {eduClass: {id: $scope.cid}, subject: {id: $scope.sid}};
            if ($scope.ngDialogData.obj) {
                $scope.record = $scope.ngDialogData.obj;
            }

            //获取老师列表
            $scope.getTeacherList = function () {
                var success = function (result) {
                    $scope.teacherList = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/edu/teacher/selectTeacherBySubjectId', {"subjectId": $scope.sid}, success, error);
            }

            $scope.getTeacherList()

            $scope.submit = function () {

                var success = function (result) {
                    console.log(result);
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $scope.ngDialogData.parent_scope.getAllCourseTeacher();
                    $scope.closeThisDialog();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record["eduClass.id"] = $scope.record.eduClass.id;
                $scope.record["subject.id"] = $scope.record.subject.id;
                recordFormat.format($scope.record, ".");

                API.post("/class/saveClassTeacherSubject", $scope.record, success, error);

            }
        }]);