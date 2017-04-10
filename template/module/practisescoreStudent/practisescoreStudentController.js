'use strict';

angular.module('app')
    .controller('practisescoreStudentController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API) {

            $scope.app_name = "班级测试成绩排名";
            $scope.param = {};

        }]);