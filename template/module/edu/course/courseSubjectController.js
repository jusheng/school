'use strict';

angular.module('app')
    .controller('courseSubjectController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API','toaster',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API,toaster) {

            $scope.app_name = "排课";
            $scope.param = {};
            //请求数据
            $scope.getSubjectGroup = function () {

                var success = function (result) {
                    $scope.subjectGroup = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subjectGroup/read/all', $scope.param, success, error);

            }

            $scope.getSubjectGroup();

            $scope.getSubject = function () {
                var success = function (result) {
                    $scope.subject = result.data;
                    $scope.$apply();

                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/school/getSchoolSubject",{}, success, error);
            }
            $scope.getSubject();

            $scope.getCourseNum = function () {
                var success = function (result) {
                    $scope.courseNum = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/edu/course/num/read",{}, success, error);
            }
            $scope.getCourseNum();

            $scope.submit = function () {
                var success = function (result) {
                    $scope.courseNum = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.jsonpost("/edu/course/num/update/all",$scope.courseNum, success, error);
            }

            $scope.submit2 = function (key,index,item) {
                if($scope.tmp==item.num){
                    return false;
                }
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "修改成功");
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                    item.num =$scope.tmp;
                }
                API.jsonpost("/edu/course/num/update",item, success, error);
            }

            $scope.focus = function (key,index,item) {
                $scope.tmp = item.num;
            }

        }]);