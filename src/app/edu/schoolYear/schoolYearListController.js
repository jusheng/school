'use strict';

angular.module('app')
    .controller('schoolYearListController', ['$rootScope', '$scope', '$http', '$state','toaster',
        function ($rootScope, $scope, $http, $state,toaster) {
            $scope.title = '学年管理';
            $scope.param = {};
            $scope.loading = false;

            $scope.search = function () {
                $scope.loading = true;
                $.ajax({
                    url: '/schoolYear/read/list',
                    data: $scope.param
                }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.pageInfo = result.data;
                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
                });
            }
            $scope.search();

            $scope.setCurSchoolYear= function(id) {
                $.ajax({
                    url: '/schoolYear/setCurrentSchoolYear',
                    data: {id:id}
                }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        toaster.clear('*');
                        toaster.pop('success', '', "保存成功");
                        $scope.search();
                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
                });
            }

            function get_menu() {
            }

            get_menu();

            $scope.clearSearch = function () {
                $scope.param.keyword = null;
                $scope.search();
            }

            $scope.disableItem = function (id, enable) {

            }

            // 翻页
            $scope.pagination = function (obj) {
                $scope.param.pageNum = obj.page;
                $scope.search();
            };
        }]);