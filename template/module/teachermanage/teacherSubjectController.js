'use strict';

angular.module('app')
    .controller('teacherSubjectController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, API) {
            var toaster = $scope.ngDialogData.toaster;
            $scope.init = function () {
                var success = function (result) {
                    console.log(result);
                    $scope.teacher = result.data;
                    var temp = [];
                    var obj = $scope.teacher;
                    for (var i = 0; i < obj.length; i++) {
                        temp.push(obj[i].id);
                    }
                    ;

                    for (var i = 0; i < $scope.subjectList.length; i++) {
                        if (temp.indexOf($scope.subjectList[i].id) > -1) {
                            $scope.subjectList[i].checked = true;
                        } else {
                            $scope.subjectList[i].checked = false;
                        }
                    }
                    ;

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/edu/teacher/getTeacherSubject", {"teacherId": $scope.ngDialogData.id}, success, error);
            }

            //取得科目
            $scope.get_subject = function () {

                var success = function (result) {
                    console.log(result);
                    $scope.init();
                    $scope.subjectList = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/school/getSchoolSubject", {"teacherId": $scope.ngDialogData.id}, success, error);

            }
            $scope.get_subject();


            $scope.submit = function () {

                var temp = [];

                for (var i in $scope.subjectList) {

                    $scope.subjectList[i].checked && $scope.subjectList[i].checked == true && temp.push($scope.subjectList[i].id);
                }

                if (temp.length == 0) {
                    return false;
                }

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $scope.closeThisDialog();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/edu/teacher/updateTeacherSubject", {
                    "teacherId": $scope.ngDialogData.id,
                    "ids": temp.join(",")
                }, success, error);

            }

            $scope.checkSubjectTeacher = function (index) {
                var data = $scope.subjectList[index];
                if (data.checked)return false;

                var success = function (result) {
                    if (result.data.length) {
                        var msg = result.data[0].teacher.name + "老师本学年有";
                        angular.forEach(result.data, function (val) {
                            msg += val.eduClass.name + "(" + val.grade.name + ") "
                        })
                        msg += (result.data[0].subject.name + "授课安排，请先删除授课安排再进行删除。");
                        $scope.subjectList[index].checked = true;
                        toaster.clear('*');
                        toaster.pop('warning', '', msg);
                    }
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/class/getClassTeacherSubject", {
                    "teacherId": $scope.ngDialogData.id,
                    "subjectId": data.id
                }, success, error);

            }


        }]);