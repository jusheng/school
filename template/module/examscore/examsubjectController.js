'use strict';

angular.module('app')
    .controller('examsubjectController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.app_name = "选择科目";
            $scope.classId = $scope.ngDialogData.parent_scope.param.classId;

            // 获取这次考试 的科目
            $scope.getexamsubject = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }
            $scope.getexamsubject($scope.ngDialogData.examsubjectId);

            //获取科目字典
            $scope.dict = function () {

                var success = function (result) {
                    $scope.sDict = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/subject/read/dict', {}, success, error);
            }
            $scope.dict();

            $scope.submit = function () {
                var temp = [];
                for (var i in $scope.record.details) {
                    $scope.record.details[i]['checked'] && $scope.record.details[i]['checked'] == true && temp.push($scope.record.details[i].subject.id);
                }
                if ($scope.record.details.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = ids;
                $scope.examId = $scope.record.id;
                // console.log(ids);

                $timeout(function () {
                    $scope.closeThisDialog();
                    $scope.ngDialogData.parent_scope.search();
                }, 500);

            }

        }
    ])