'use strict';

angular.module('app')
    .controller('mytaskController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'toaster', 'API', '$timeout',
        function($rootScope, $scope, $http, $state, Upload, ngDialog, toaster, API, $timeout) {

            $scope.param = {};


            /*点击分类*/
            if ($state.params.id) {
                $scope.param.oaPlanTypeId = $state.params.id;
            }



            $scope.s_all = 0; //全选标记
            $scope.select_all = function() {
                $scope.s_all = !$scope.s_all;

                for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    $scope.pageInfo.list[i].selected = $scope.s_all;
                }
            };


            $scope.select_per = function(index) {
                $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
            }


            $scope.search = function() {
                $scope.s_all = 0;
              

                var success = function(result) {
                     console.log(result);
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                    console.log(result.data)
                }

                var error = function(result) {
                    console.log(result);
                    if(result==""){
                        $scope.search();
                    }
                   /* toaster.clear('*');
                    toaster.pop('error', '', result.msg);*/
                }

                API.post('/oa/task/read/createList', $scope.param, success, error);
                // console.log($scope.param)

            }



            $scope.search();

            // 翻页
            $scope.pagination = function(page) {

                $scope.param.pageNum = page;
                $scope.search();
            };


            //删除操作
            $scope.del = function(id) {

                var success = function(result) {
                    toaster.clear('*');
                    toaster.pop('success', "", "删除成功");
                    $timeout(function() {
                        $scope.search();
                    }, 1000);
                }
                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                if (id) { //单个删除

                    API.post("/oa/plan/delete", {
                        "id": id
                    }, success, error);

                } else { //批量删除

                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }


                    temp.length > 0 && API.post("/oa/plan/delete", {
                        "id": temp.join(",")
                    }, success, error);
                }
            }

            //编辑操作
            $scope.init = function(id) {
                var success = function(result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/plan/read/detail", {
                    "id": id
                }, success, error);

            }

             // 编辑的默认选项
            //$scope.

            // 状态判断
            $scope.status = function($index) {
                if ($scope.pageInfo.list[$index].status.id == '91') {
                    $scope.pageInfo.list[$index].status.codeText = "未上报";
                } else if ($scope.pageInfo.list[$index].status.id == '92') {
                    $scope.pageInfo.list[$index].status.codeText = "上报中";
                }
            }

            $scope.qx = function($index) {

                $scope.pageInfo.list[$index].status.codeText = "未上报";
                $scope.pageInfo.list[$index].status.id = '91';


            }

        }
    ]);