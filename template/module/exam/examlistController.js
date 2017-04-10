'use strict';

angular.module('app')
    .controller('examlistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {};
            $scope.loading = false;
            $scope["gradeId"] = $state.params.id;
            $scope.gradeId = $state.params.id;

            
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
                // $scope.param["gradeId"] = $state.params.id;
                // console.log($scope.param);
                API.post('/res/exam/read/list', $scope.param, success, error);
            }
            
            //默认显示第一个年级的考试列表
                if($state.params.id != 0 ){
                    $scope.param.gradeId = $state.params.id;
                
                    $scope.set_curr($scope.param.gradeId);

                    $scope.search();
                }else{
                    $scope.$watch("classNameList",function(){
                        if(!$scope.classNameList){
                            return false;
                        }
                        
                        //console.log('有值了');
                        $scope.param.gradeId = ($scope.classNameList.length>0 &&　$scope.classNameList[0].id);
                        //console.log($scope.param.gradeId);
                        $scope.set_curr($scope.param.gradeId);
                        $scope.gradeId=$scope.classNameList[0].id;
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
                API.post("/res/exam/delete", {"id": id}, success, error);
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
                // API.post("/res/exam/delete", {"id": id}, success, error);


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

            $scope.open_confirm = function (id) {

                ngDialog.open({
                    template: 'template/module/edu/activity/confirm.html',
                    controller: 'activityconfirmController',
                    className: 'ngdialog-theme-green',
                    data: {
                        "id": id,
                        "callback": $scope.del
                    },
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                    }
                })

            }

            $scope.showEntryStatus = function (id) {
                ngDialog.open({
                    template: 'template/module/examscore/showEntryStatus.html',
                    controller: 'showEntryStatusController',
                    className: 'ngdialog-theme-green',
                    width:700,
                    data: {"examId": id, "parent_scope": $scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/examscore/showEntryStatusController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
            }
        }]);