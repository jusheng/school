'use strict';

angular.module('app')
    .controller('examScoreChartListController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
        function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

            $scope.app_name = "121";
            $scope.id = $state.params.id;
            $scope.param = {};
            //$scope.param["classId"] = Number($state.params.id);

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
            $scope.search=function(){
                var success = function(result){
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }
                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // $scope.param["isStudent"] = 1;
                API.post('/res/exam/read/list',$scope.param,success,error);

            }
            //默认显示第一个年级的考试列表
            if($state.params.id != 0 ){
                $scope.param.classId = $state.params.id;


                $scope.set_curr($scope.param.classId);

                $scope.search();
            }else{
                $scope.$watch("classNameList",function(){
                    if(!$scope.classNameList){
                        return false;
                    }

                    $scope.param.classId = ($scope.classNameList.length>0 &&　$scope.classNameList[0].id);
                    $scope.id = ($scope.classNameList.length>0 &&　$scope.classNameList[0].id);
                    $scope.set_curr($scope.param.classId);
                    $scope.search();
                })
            }

            $scope.clearSearch = function() {
                $scope.param.keyword= null;
                $scope.search();
            }
            //翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum=obj.page;
                $scope.search();
            };
            //选择科目
            $scope.examSubject = function (id) {
                /* ngDialog.open({
                 template: 'templateId',
                 className: 'ngdialog-theme-default',
                 width: 650,
                 plain: true
                 });*/
                ngDialog.open({
                    template: 'template/module/examscore/examsubject.html',
                    controller: 'examsubjectController',
                    className: 'ngdialog-theme-green',
                    // width:700,
                    data:{examsubjectId:id,"parent_scope":$scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/examscore/examsubjectController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
            }



        } ]);