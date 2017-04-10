'use strict';

angular.module('app')
    .controller('scorerankstudentlistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {};
            $scope.loading = false;

            //获取班级考试列表
            $scope.getexam=function(){
                var success = function(result){
                    $scope.examList = result.data;
                    if($scope.examList.length>0){
                        $scope.param.examId=$scope.examList[0].id;
                    }
                    $scope.search();
                    $scope.$apply();
                }
                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/read/all',{},success,error);
            }
            $scope.getexam();
            
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
                    // alert($scope.param.examId);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                
                // $scope.param["orderBy"] = "er.total_score desc";
                // alert($scope.param.examId);
                API.post('/res/exam/score/read/class/student',{"examId":$scope.param.examId,"orderBy":"er.total_score desc"}, success, error);
            }
            $scope.search();
            //获取考试状态
            $scope.getExamStatus = function(){
                var success = function(result){
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error','',result.msg);
                }
                API.post('/dic/read/key',{key:"EXAM_STATUS"},success,error);
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