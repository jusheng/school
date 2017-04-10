'use strict';

angular.module('app')
    .controller('teacherlistController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {
            $scope.app_name = "老师管理";
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

                API.post('/edu/teacher/read/list', $scope.param, success, error);

            }

            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            // 翻页
            $scope.pagination = function (obj) {
                $scope.param.pageNum = obj.page;
                $scope.search();
            };

            //弹出框
            $scope.add_module = function (id) {
                ngDialog.open({
                    template: 'template/module/teachermanage/teacherSubject.html',
                    controller: 'teacherSubjectController',
                    className: 'ngdialog-theme-green',
                    data: {"id": id, "toaster": toaster},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/teachermanage/teacherSubjectController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                    }
                })
            }
            //弹出框绑定
            $scope.bind_module = function (id, eduUserId) {
                ngDialog.open({
                    template: 'template/module/teachermanage/teacherbind.html',
                    controller: 'teacherbindController',
                    className: 'ngdialog-theme-green',
                    data: {"id": id, "eduUserId": eduUserId},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/teachermanage/teacherbindController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                    }
                })
            }
            //弹出框解除绑定
            $scope.remove_module = function (id, eduUserId) {

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    location.reload();
                    // $timeout(function(){
                    //         $scope.closeThisDialog();
                    //     },1000);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/user/update/removeBundData", {"eduUserId": eduUserId, "targetId": 0}, success, error);
            }

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

                if (id) { //单个删除

                    API.post("/edu/teacher/delete", {"id": id}, success, error);

                } else { //批量删除

                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }

                    temp.length > 0 && API.post("/edu/teacher/delete", {"id": temp.join(",")}, success, error);
                }
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

            var upload_type1 = [
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ];
            //导入信息
            $scope.onFileSelect = function (files) {
                angular.forEach(files, function (file) {


                    if (upload_type1.join(",").indexOf(file.type) < 0) {
                        toaster.clear('*');
                        toaster.pop('error', '', "只允许上传xls,xlsx类型文件");
                        return false;
                    }
                    toaster.clear("*");
                    toaster.pop(
                        {
                            "type": "wait",
                            "title": "",
                            "body": "正在导入..."
                        }
                    );

                    file.upload = Upload.upload({
                        "url": "/edu/teacher/importData",
                        headers: {'Content-Type': 'multipart/form-data'},
                        "data": {file: file},
                    }).progress(function (evt) {
                        //进度条
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total) + '%';
                        // console.log('progess:' + $scope.progress + '%');

                        if ($scope.progress == '100%') {
                            $scope.progress = '【上传完成】';
                            $timeout(function () {
                                $scope.progress = '';
                            }, 2000)

                            $timeout(function () {

                            })
                        }

                    });

                    file.upload.then(function (response) {

                        if (response.data.httpCode == 200) {
                            $timeout(function () {
                                toaster.clear('*');
                                $scope.search();
                                toaster.pop('success', '', response.data.msg);
                            })

                        } else {
                            $timeout(function () {
                                toaster.clear('*');
                                toaster.pop('error', '', response.data.msg);
                            })

                        }

                    })

                })
            };
        }]);