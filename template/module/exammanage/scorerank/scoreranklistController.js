'use strict';

angular.module('app')
    .controller('scoreranklistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {"orderBy": "er.total_score desc"};
            $scope.loading = false;

            // $scope["gradeId"] = $state.params.id;
            //获取所带班级列表
            $scope.getClass = function () {

                var success = function (result) {
                    $scope.classNameList = result.data;
                    if ($scope.classNameList.length > 0) {
                        $scope.param.classId = $scope.classNameList[0].id;
                    }
                    $scope.getexam();

                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/oa/addressbook/read/list/class', {}, success, error);

            }
            $scope.getClass();

            //获取班级考试列表
            $scope.getexam = function () {

                var success = function (result) {
                    $scope.examList = result.data;
                    console.log($scope.examList);
                    if ($scope.examList.length > 0) {
                        $scope.param.examId = $scope.examList[0].id;
                        $scope.search();
                    } else {
                        $scope.record = {};
                        $scope.pageInfo = {};
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/read/all', {classId: $scope.param.classId,isStudent:1}, success, error);

            }
            // $scope.getexam();

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
                    $scope.subjects = {};
                    for (var i = 0; i < $scope.record.length; i++) {
                        console.log($scope.record[i])
                        $scope.subjects[$scope.record[i].code] = $scope.record[i].name
                    }
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

                // $scope.param["orderBy"] = "er.total_score desc";
                API.post('/res/exam/score/read/list', $scope.param, success, error);
            }

            $scope.onlysubject = function () {
                if (!$scope.record.code)return;
                var success = function (result) {
                    $scope.subjectrank = result.data;
                    console.info(result.data)
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/subject/ranking', {
                    "classId": $scope.param.classId,
                    "examId": $scope.param.examId,
                    "code": $scope.record.code
                }, success, error);
            }


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