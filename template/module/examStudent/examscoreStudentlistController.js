'use strict';

angular.module('app')
    .controller('examscoreStudentlistController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "学生成绩管理";
            $scope.param = {};
            //$scope.param["classId"] = Number($state.params.id);
            // $scope.classId=$state.params.id;
            $scope.getType = function () {
                var success = function (result) {
                    $scope.eType = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/type/read/all/dict', {}, success, error);
            }
            $scope.getType();
            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            //请求数据
            $scope.search = function () {
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.param["isStudent"] = 1
                API.post('/res/exam/read/list', $scope.param, success, error);

            }
            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }
            //翻页
            $scope.pagination = function (obj) {
                $scope.param.pageNum = obj.page;
                $scope.search();
            };

            $scope.viewScore = function(exam){
                $state.go("main.examStudent.examscoreStudentDetail",{id:exam.id});
            }


        }]);