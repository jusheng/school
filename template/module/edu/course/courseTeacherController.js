'use strict';

angular.module('app')
    .controller('courseTeacherController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API','toaster',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API,toaster ) {

            $scope.app_name = "排课";
            $scope.param = {};

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

            $scope.getSubjects = function () {

                var success = function (result) {
                    $scope.subjects = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subject/read/all', $scope.param, success, error);

            }
            $scope.getSubjects();

            $scope.getEduClass = function () {

                var success = function (result) {
                    $scope.eduClass = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/class/read/all', $scope.param, success, error);

            }
            $scope.getEduClass();

            $scope.getAllCourseTeacher = function () {

                var success = function (result) {
                    $scope.allCourseTeacher = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/edu/teacher/getAllCourseTeacher', $scope.param, success, error);

            }
            $scope.getAllCourseTeacher();

            $scope.showDialog = function (cid,sid,obj) {
                console.log(cid,sid,obj);
                ngDialog.open({
                    template: 'template/module/edu/course/courseTeacherModal.html',
                    controller: 'courseTeacherModalController',
                    className: 'ngdialog-theme-green',
                    // width:700,
                    data: {obj: obj,cid:cid,sid:sid, "parent_scope": $scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/course/courseTeacherModalController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
            }

        }]);