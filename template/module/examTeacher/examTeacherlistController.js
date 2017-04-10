'use strict';

angular.module('app')
    .controller('examTeacherlistController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {};

            if ($state.params.id != 0) {
                $scope.param["classId"] = $state.params.id;
            }

            $scope.loading = false;

            $scope["id"] = $state.params.id;
            $scope.param["classId"] = $state.params.id;

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

                API.post('/res/practise/read/list', $scope.param, success, error);

            }
            //默认显示第一个年级的考试列表
            if ($state.params.id != 0) {
                $scope.param.classId = $state.params.id;

                $scope.set_curr($scope.param.classId);

                $scope.search();
            } else {
                $scope.$watch("className", function () {
                    if (!$scope.className) {
                        return false;
                    }

                    console.log('有值了');
                    $scope.param.classId = ($scope.className.length > 0 && $scope.className[0].id);
                    $scope.set_curr($scope.param.classId);
                    $scope.id = $scope.className[0].id;
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
            //选择科目
            $scope.examSubject = function (id) {
                /* ngDialog.open({
                 template: 'templateId',
                 className: 'ngdialog-theme-default',
                 width: 650,
                 plain: true
                 });*/
                var record = "";
                var getexamsubject = function (id) {
                    var success = function (result) {
                        record = result.data;
                        $state.go("main.scoreClass.scoreClassInput",{id:$scope.param["classId"],ids:record.details[0].subject.id,practiseId:id})
                    }
                    var error = function (result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }
                    API.post("/res/practise/read/detail", {"id": id}, success, error);
                }
                getexamsubject(id);
// return;
//
//
//                 ngDialog.open({
//                     template: 'template/module/practisescore/practisesubject.html',
//                     controller: 'practisesubjectController',
//                     className: 'ngdialog-theme-green',
//                     // width:700,
//                     data: {examsubjectId: id, "parent_scope": $scope},
//                     resolve: {
//                         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
//                             return uiLoad.load('template/module/practisescore/practisesubjectController.js').then(function () {
//                                 return $ocLazyLoad.load([
//                                     'toaster'
//                                 ]);
//                             });
//                         }]
//                     }
//                 });
            }

            $scope.do_del = function (id) {
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
                API.post("/res/practise/delete", {"id": id}, success, error);
            }
            //删除操作
            $scope.del = function (id) {

                // var success = function(result){
                // 		toaster.clear('*');
                //           	toaster.pop('success', "", "删除成功");
                //           	$timeout(function(){
                //           		$scope.search();
                //           	},1000);
                // 	}
                // var error = function(result){
                // 	toaster.clear('*');
                //       	toaster.pop('error', '', result.msg);
                // }
                // 	API.post("/res/practise/delete",{"id":id},success,error);

                if (id) {
                    var id = id;
                } else {
                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }
                    var id = temp.join(",");
                }

                if (id.length == 0) {
                    return false;
                }


                ngDialog.open({
                    template: 'template/module/tpl/confirm.html',
                    controller: 'confirmController',
                    className: 'ngdialog-theme-green',
                    data: {
                        "id": id,
                        "callback": $scope.do_del
                    },
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/tpl/confirmController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                    }
                })


            }


        }]);