'use strict';

angular.module('app')
    .controller('classListController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "班级管理";
            $scope.param = {gradeId: $state.params.grade_id,orderBy:"c.sort_no"};
            $scope.loading = false;
            $scope.gradeId = $state.params.grade_id;
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

            $scope.search = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    // console.log("sss" + result);
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/class/read/list', $scope.param, success, error);

            }

            // $scope.search();
            //默认显示第一个年级的考试列表

            if ($state.params.grade_id != 0) {
                $scope.param.gradeId = $state.params.grade_id;
                $scope.set_curr($scope.param.gradeId);

                $scope.search();

            } else {
                $scope.$watch("List", function () {
                    if (!$scope.List) {
                        return false;
                    }

                    console.log('有值了');
                    $scope.param.gradeId = ($scope.List.length > 0 && $scope.List[0].id);
                    $scope.set_curr($scope.param.gradeId);
                    $scope.gradeId = $scope.List[0].id;
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

            $scope.do_del = function(id){
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

                //if (id) { //单个删除

                    API.post("/class/delete", {"id": id}, success, error);

                // } else { //批量删除

                //     var temp = [];
                //     for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                //         $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                //     }

                //     temp.length > 0 && API.post("/class/delete", {"id": temp.join(",")}, success, error);
                // }
            }

            //删除操作
            $scope.del = function (id) {

                // var success = function (result) {
                //     toaster.clear('*');
                //     toaster.pop('success', "", "删除成功");
                //     $timeout(function () {
                //         $scope.search();
                //     }, 1000);
                // }
                // var error = function (result) {
                //     toaster.clear('*');
                //     toaster.pop('error', '', result.msg);
                // }

                // if (id) { //单个删除

                //     API.post("/class/delete", {"id": id}, success, error);

                // } else { //批量删除

                //     var temp = [];
                //     for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                //         $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                //     }

                //     temp.length > 0 && API.post("/class/delete", {"id": temp.join(",")}, success, error);
                // }


                if(id){
                    var id = id;
                }else{
                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }
                    var id = temp.join(",");
                }

                if(id.length==0){
                    return false;
                }


                ngDialog.open({
                    template:'template/module/tpl/confirm.html',
                    controller: 'confirmController',
                    className: 'ngdialog-theme-green',
                    data:{
                        "id":id,
                        "callback":$scope.do_del
                    },
                    resolve: {
                             deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                                return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
                                    return $ocLazyLoad.load('toaster');
                                });
                         }]}
                })

            }

            $scope.open_confirm = function(id){

                ngDialog.open({
                    template:'template/module/edu/activity/confirm.html',
                    controller: 'activityconfirmController',
                    className: 'ngdialog-theme-green',
                    data:{
                        "id":id,
                        "callback":$scope.del
                    },
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                        }]}
                })

            }

        }]);