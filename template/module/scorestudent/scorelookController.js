'use strict';

angular.module('app')
    .controller('scorelookController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API', 'recordFormat',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API, recordFormat) {

            $scope.app_name = "学生成绩";
            $scope.param = {orderBy:"er.total_score desc"};
            $scope.loading = false;
            $scope.classId = $state.params.id;
            $scope.ids = $state.params.ids;
            $scope.examId = $state.params.examId

            $scope.scoresubject = $scope.ids.split(",");

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

            //获取班级学生
            $scope.search = function () {
                var success = function (result) {
                    console.log(result);
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.param["classId"] = $state.params.id;
                $scope.param["examId"] = $state.params.examId;
                API.post('/res/exam/score/read/list', $scope.param, success, error);
            }
            $scope.search();

            //  获取录入成绩的科目

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            //翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };
            //
            $scope.edit = function (index, id) {
                $scope.pageInfo.list[index].edit = true;
                //$scope.getType(subjectId);
            }
            $scope.onFileSelect = function(files){
                angular.forEach(files,function(file){
                    file.upload = Upload.upload({
                        "url":"/res/exam/score/importTemplate?classId="+$scope.classId+"&examId="+$scope.examId,
                        headers: {'Content-Type': 'multipart/form-data'},
                        "data":{file:file},
                    });
                    // file.upload.then(function(response){
                    // })
                })
            };
            $scope.update = function (index, id) {
                $scope.pageInfo.list[index].edit = false;
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

                $scope.record = $scope.pageInfo.list[index];

                //recordFormat.format($scope.record, ".");
                API.jsonpost("/res/exam/score/add", $scope.record, success, error);
            }

        }]);