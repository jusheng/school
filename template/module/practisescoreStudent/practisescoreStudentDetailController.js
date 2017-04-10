'use strict';

angular.module('app')
    .controller('practisescoreStudentDetailController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "学生成绩管理";
            $scope.param = {orderBy:"pr.total_score desc"};
            //$scope.param["classId"] = Number($state.params.id);

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
                $scope.param["practiseId"] = $state.params.id;
                API.post('/res/practise/score/read/list', $scope.param, success, error);

            }
            $scope.search();

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

            // 获取这次测试的科目
            $scope.getSubjects = function () {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.subjects = result.data.details;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/practise/read/detail", {"id": $state.params.id}, success, error);
            }
            $scope.getSubjects();


            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }
            //翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };


        }]);