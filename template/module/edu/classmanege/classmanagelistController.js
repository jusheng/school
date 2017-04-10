'use strict';

angular.module('app')
    .controller('classmanagelistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {};
            $scope.loading = false;
            $scope["gradeId"] = $state.params.id;

            //获取考试类型
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
            //请求数据
            $scope.search = function () {
                var success = function (result) {
                    $scope.exam = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // $scope.param["gradeId"] = $state.params.id;
                API.post('/res/exam/read/list', $scope.param, success, error);

            }
            
            //默认显示第一个年级的考试列表
                if($state.params.id != 0 ){
                    $scope.param.gradeId = $state.params.id;
                
                    $scope.set_curr($scope.param.gradeId);

                    $scope.search();
                }else{
                    $scope.$watch("pageInfo",function(){
                        if(!$scope.pageInfo){
                            return false;
                        }
                        
                        console.log('有值了');
                        $scope.param.gradeId = ($scope.pageInfo.length>0 &&　$scope.pageInfo[0].id);
                        console.log($scope.param.gradeId);
                        $scope.set_curr($scope.param.gradeId);
                        $scope.search();
                    })
                }

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            // 翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };
            //删除操作
            $scope.del = function (id) {

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', "", "删除成功");
                    $timeout(function () {
                        $scope.search();
                    }, 1000);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/exam/delete", {"id": id}, success, error);
            }
        }]);