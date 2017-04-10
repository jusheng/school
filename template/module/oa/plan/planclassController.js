'use strict';

angular.module('app')
	.controller('planclassController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {
		
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

            $scope.search = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    console.log(result);
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('oa/plan/read/PlanTypeList', $scope.param, success, error);

            }

            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            // 翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = page;
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

                    API.post("/oa/plan/deletePlanType", {"id": id}, success, error);

                // } else { //批量删除

                //     var temp = [];
                //     for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                //         $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                //     }


                //     temp.length > 0 && API.post("/oa/plan/deletePlanType", {"id": temp.join(",")}, success, error);
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

                //     API.post("/oa/plan/deletePlanType", {"id": id}, success, error);

                // } else { //批量删除

                //     var temp = [];
                //     for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                //         $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                //     }


                //     temp.length > 0 && API.post("/oa/plan/deletePlanType", {"id": temp.join(",")}, success, error);
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
                    className: 'ngdialog-theme-info',
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


  


} ]);