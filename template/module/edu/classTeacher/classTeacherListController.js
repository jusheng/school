'use strict';

angular.module('app')
    .controller('classTeacherListController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API', 'recordFormat',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API, recordFormat) {

            $scope.app_name = "班级老师管理";
            $scope.classId = $state.params.classId;
            $scope.subjectId = $state.params.subjectId;
            $scope.param = {classId: $scope.classId};
            $scope.gradeId = $state.params.gradeId;
            $scope.loading = false;

            $scope.search = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    //$scope.getType();

                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/class/getClassTeacherSubject', $scope.param, success, error);

            }

            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            //获取老师列表
            $scope.getType = function () {
                var success = function (result) {
                    console.log(result);
                    $scope.teacherList = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/edu/teacher/selectTeacherBySubjectId', {"subjectId": $scope.subjectId}, success, error);
            }


            //提交
            $scope.edit = function (index, subjectId) {
                console.log(subjectId);


                for (var i = 0; i < $scope.pageInfo.length; i++) {
                    $scope.pageInfo[i].edit = false;
                }
                ;

                $scope.pageInfo[index].edit = true;

                $scope.subjectId = subjectId;
                $scope.getType();

            }
            $scope.update = function (index) {
                $scope.pageInfo[index].edit = false;

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $scope.search();
                    }, 1000);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record = $scope.pageInfo[index];
                $scope.record["eduClass.id"] = Number($state.params.classId);
                recordFormat.format($scope.record, ".");

                API.post("/class/saveClassTeacherSubject", $scope.record, success, error);

                // API.post("/class/saveClassTeacherSubject",{"teacher.id":$scope.record.teacherId,"eduClass.id":$scope.classId,"subject.id":$scope.id},success,error);

            }

            // 翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };


        }]);