'use strict';

angular.module('app')
    .controller('examScoreCountTableController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API','toaster',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API,toaster) {

            $scope.app_name = "考试成绩";
            $scope.examId = $state.params.examId;
            $scope.classId = $state.params.classId;
            $scope.param = {classId:$scope.classId,examId:$scope.examId};
            $scope.select = "1";
            $scope.subjectIndex = "0";
            $scope.a = 0;

            $scope.getStageData = function () {

                var success = function (result) {
                    $scope.stageData = result.data.scoreStage;
                    // $scope.buildChartData($scope.classData, $scope.subject);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/getScoreStage', $scope.param, success, error);

            }
            $scope.getStageData();

            $scope.getData = function (isClass) {
                if(Number(isClass)){
                    $scope.param["classId"] = $scope.classId;
                }else{
                    delete $scope.param["classId"];
                }
                $scope.getFourRate();
                $scope.getscore();
                $scope.getdev();                
                $scope.getavg();
                $scope.getStageData();
            }

            $scope.getexamClass2 = function () {
                var success = function (result) {
                    $scope.examclassInfograde = result.data;

                    //if ($scope.examclassInfograde.length > 0) {
                    //    $scope.getexamlist2($scope.examclassInfograde[0].id);
                    //}

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getexamClass2();

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
            $scope.getexamsubject2 = function (id) {
                var success = function (result) {
                    $scope.examSubject2 = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }
            $scope.getexamsubject2($scope.examId);

            $scope.getFourRate = function () {

                var success = function (result) {
                    $scope.fourRate = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/score/read/fourRate', $scope.param, success, error);

            }
            $scope.getFourRate();
            $scope.getscore = function () {

                var success = function (result) {
                    $scope.scoreData = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/getMaxMinScore', $scope.param, success, error);

            }
            $scope.getscore();

            $scope.getavg = function () {

                var success = function (result) {
                    $scope.avgData = result.data;
                    // $scope.buildChartData($scope.classData, $scope.subject);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/score/avg',$scope.param, success, error);

            }
            $scope.getavg();
            $scope.getdev = function () {

                var success = function (result) {
                    $scope.devData = result.data;
                    // $scope.buildChartData($scope.classData, $scope.subject);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/getStandardDeviation', $scope.param, success, error);

            }
            $scope.getdev();

            $scope.getTeacher = function () {

                var success = function (result) {
                    $scope.teacherData = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/getClassTeacherByClassId', {classId:$scope.classId}, success, error);

            }
            $scope.getTeacher();

            $scope.getSchool = function () {

                var success = function (result) {
                    $scope.schoolData = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/school/read/detail', {}, success, error);

            }
            $scope.getSchool();



        }]);