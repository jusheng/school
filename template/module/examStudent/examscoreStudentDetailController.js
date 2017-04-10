'use strict';

angular.module('app')
    .controller('examscoreStudentDetailController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {"orderBy":"er.total_score desc"};
            $scope.loading = false;
            $scope.param["classId"] = $state.params.classId;
            $scope.param["examId"] = $state.params.id;
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
                API.post("/res/exam/score/getExamSubjects", {"examId": id}, success, error);
            }
            // 获取班级学生成绩
            $scope.search = function () {
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    $scope.getexamsubject($scope.param.examId);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                
                API.post('/res/exam/score/read/class/student',$scope.param, success, error);
            }
            $scope.search();
          
               

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            // 翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };
           
        }]);