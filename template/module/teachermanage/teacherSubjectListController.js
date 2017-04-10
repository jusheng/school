'use strict';

angular.module('app')
    .controller('teacherSubjectListController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "任课教师名册";
            $scope.param = {};
            $scope.loading = false;

            $scope.s_all = 0;  //全选标记

            $scope.select_all = function () {
                $scope.s_all = !$scope.s_all;

                for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    $scope.pageInfo.list[i].selected = $scope.s_all;
                }

            };


            $scope.select_per = function (index) {
                $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
            }

            //获取性别类型
            $scope.getType = function () {
                var success = function (result) {
                    $scope.sexType = result.data;
                    console.log($scope.sexType);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "SEX"}, success, error);
            }
            $scope.getType();

            $scope.search = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/teacher/getTeacherBean', $scope.param, success, error);

            }

            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }
            //导入信息
            $scope.onFileSelect = function (files) {
                angular.forEach(files, function (file) {
                    file.upload = Upload.upload({
                        "url": "/edu/teacher/importData",
                        headers: {'Content-Type': 'multipart/form-data'},
                        "data": {file: file},
                    });
                    // file.upload.then(function(response){
                    // })
                })
            };

            // 翻页
            $scope.pagination = function (obj) {
                $scope.param.pageNum = obj.page;
                $scope.search();
            };
        }]);