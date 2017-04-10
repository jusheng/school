'use strict';

angular.module('app')
    .controller('classStudentListController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {

            $scope.app_name = "班级学生管理";
            $scope.classId = $state.params.classId;
            $scope.param = {classId: $scope.classId};
            $scope.gradeId = $state.params.gradeId;
            $scope.teacherId = $state.params.teacherId;
            $scope.loading = false;
            $scope.s_all = 0;  //全选标记
            //$scope.is_modify = $scope.user_data.id == $state.params.teacherId;
            console.log($scope.is_modify);
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
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/classes/student/read/classStudent/page', $scope.param, success, error);

            }

            $scope.search();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }
			//导入信息
			$scope.onFileSelect = function(files,classId){
						angular.forEach(files,function(file){
							file.upload = Upload.upload({
								"url":"/edu/student/importClassStudentData?classId="+classId,
								headers: {'Content-Type': 'multipart/form-data'},
								"data":{file:file},
							});
						})
					};
            // 翻页
            $scope.pagination = function (obj) {

                $scope.param.pageNum = obj.page;
                $scope.search();
            };


            //删除操作
            $scope.del = function (sid,cid) {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', "", "删除成功");
                    $timeout(function () {
                        $scope.search();
                    }, 700);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                if (sid) { //单个删除

                    API.post("/edu/student/deleteClassStudent", {"id": sid,classId:$state.params.classId}, success, error);

                } else { //批量删除

                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }

                    temp.length > 0 && API.post("/edu/student/deleteClassStudent", {"id": temp.join(","),classId:$state.params.classId}, success, error);
                }
            }

            //获取性别
            $scope.getType = function(){
                var success = function(result){
                    $scope.sexType = result.data;
                    console.log($scope.sexType);
                    $scope.$apply();
                }
                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error','',result.msg);
                }
                API.post('/dic/read/key',{key:"SEX"},success,error);
            }
            $scope.getType();

            $scope.addClassStudent = function (id) {
                ngDialog.open({
                    template: 'template/module/edu/classStudent/addClassStudent.html',
                    controller: 'addClassStudentController',
                    className: 'ngdialog-theme-green',
                    //width:700,
                    data:{classId:id,"parent_scope":$scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/classStudent/addClassStudentController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
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


        }]);