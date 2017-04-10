'use strict';

angular.module('app')
    .controller('practiseranklistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {orderBy:"pr.total_score desc"};
            $scope.loading = false;
            //获取所带班级列表
            $scope.getClass=function(){

                var success = function(result){
                    $scope.classNameList = result.data;
                    if($scope.classNameList.length>0){
                        $scope.param.classId=$scope.classNameList[0].id;
                    }
                    $scope.getexam();    

                    $scope.$apply();
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/oa/addressbook/read/list/class',$scope.param,success,error);

            }
            $scope.getClass();

            //获取班级测试列表
            $scope.getexam=function(){

                var success = function(result){
                    $scope.examList = result.data;
                    if($scope.examList.list.length>0){
                        $scope.param.practiseId=$scope.examList.list[0].id;
                    }
                    $scope.search();
                    $scope.$apply();
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/practise/read/list',{classId:$scope.param.classId},success,error);

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
                    $scope.allsubject= result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/practise/read/detail", {"id": id}, success, error);
            }
            
            // 获取班级学生成绩
            $scope.search = function () {
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    $scope.getexamsubject($scope.param.practiseId);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                
                // $scope.param["orderBy"] = "er.total_score desc";
                API.post('/res/practise/score/read/list',$scope.param, success, error);
            }
            // $scope.onlysubject = function(){
            //     var success = function (result) {
            //         $scope.subjectrank = result.data;
            //         $scope.$apply();
            //     }
            //     var error = function (result) {
            //         toaster.clear('*');
            //         toaster.pop('error', '', result.msg);
            //     }
                
            //     API.post('/res/exam/score/read/subject/ranking',{"classId":$scope.param.classId,"examId":$scope.param.examId,"code":$scope.record.code}, success, error);
            // }


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