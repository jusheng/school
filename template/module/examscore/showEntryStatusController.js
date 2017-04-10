'use strict';

angular.module('app')
    .controller('showEntryStatusController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.classId = $scope.ngDialogData.parent_scope.param.classId;

            // 获取这次考试 的科目
            $scope.getExamData = function (id) {
                var success = function (result) {
                    $scope.examData = result.data;
                    $scope.app_name = result.data.name + "成绩录入状态";
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }
            $scope.getExamData($scope.ngDialogData.examId);

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

            //获取成绩录入状态
            $scope.getEntryStatus = function () {
                var success = function (result) {
                    $scope.entryStatus = result.data;
                    console.info($scope.entryStatus);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/score/getExamEntryStatus', {
                    examId: $scope.ngDialogData.examId,
                    isAll: 1
                }, success, error);
            }
            $scope.getEntryStatus();

            $scope.do = function () {
                var success = function (result) {
                    $scope.entryStatus = result.data;
                    $scope.closeThisDialog();
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/publish', {
                    examId: $scope.ngDialogData.examId
                }, success, error);
            }

            $scope.cancel = function () {
                $scope.closeThisDialog();
            }
        }])