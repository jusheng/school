'use strict';

angular.module('app')
    .controller('practisescoreStudentlistController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "学生成绩管理";
            $scope.param = {};
            //$scope.param["classId"] = Number($state.params.id);


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
                $scope.param["classId"] = $state.params.id;
                API.post('/res/practise/read/list', $scope.param, success, error);

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


        }]);