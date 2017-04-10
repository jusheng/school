'use strict';

angular.module('app')
    .controller('examTeacherdetailController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {
           
            $scope.param = {};
            $scope.param = {"classId": $state.params.id};
            $scope.id = $state.params.id;
            $scope.title = "测验详情";

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                     $scope.$apply();
                }
                
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/practise/read/detail_new", {"id": id,"classId":$scope.id}, success, error);

            }

            $scope.init($state.params.practiseId);
            

        }])
    