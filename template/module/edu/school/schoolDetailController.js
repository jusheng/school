'use strict';

angular.module('app')
    .controller('schoolDetailController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API','recordFormat',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API,recordFormat) {
            $scope.app_name = "修改学校信息";

            $scope.school = {};
            $scope.init = function () {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/school/read/detail",{}, success, error);
            }
            $scope.init();

            $scope.submit = function () {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $state.go('main.desk');
                    }, 2000);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                // delete $scope.record.updateTime;
                // delete $scope.record.createTime;
                // delete $scope.record.region;
                // delete $scope.record.user;


                recordFormat.format($scope.record,'.');
                console.log($scope.record)
                API.post('/school/update', $scope.record, success, error);

            }


            //学校规模
            $scope.get_scope = function(key){
                var callback = function(result){
                    console.log(result);
                    if(result.httpCode ==200){//成功

                        $scope.school.scope = result.data.list;
                        $scope.$apply();
                    }else{
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                };

                API.post('/dic/read/list', {"key":key}, callback);
            }

            $scope.get_scope("SCHOOL_SCOPE");

            //学校类型
            $scope.get_type = function(key){
                var callback = function(result){
                    console.log(result);
                    if(result.httpCode ==200){//成功

                        $scope.school.type = result.data.list;
                        $scope.$apply();
                    }else{
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                };

                API.post('/dic/read/list', {"key":key}, callback);
            }

            $scope.get_type("GRADE_TYPE");


            //学校性质
            $scope.get_nature = function(key){
                var callback = function(result){
                    console.log(result);
                    if(result.httpCode ==200){//成功

                        $scope.school.nature = result.data.list;
                        $scope.$apply();
                    }else{
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    }

                };
                API.post('/dic/read/list', {"key":key}, callback);
            }

            $scope.get_nature("SCHOOL_NATURE");


            validate();
            function validate() {
                jQuery('#school_detail_form').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        nature: {
                            required: true
                        },
                        scope: {
                            required: true
                        },
                        type: {
                            required: true
                        }
                    },
                    messages: {
                        name: {
                            required: '请填写学校名称'
                        },
                        nature: {
                            required: '请填写学校性质'
                        },
                        scope: {
                            required: '请填写学校规模'
                        },
                        type: {
                            required: '请填写学校类型'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }
        }
    ])