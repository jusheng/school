'use strict';

angular.module('app')
    .controller('libraryaddController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API','recordFormat',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API,recordFormat) {

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/booksroom/detail", {"id": id}, success, error);
            }

            if ($scope.ngDialogData.id) {
                $scope.app_name = "修改图书室信息";
                $scope.init($scope.ngDialogData.id);
            } else {
                $scope.app_name = "添加图书室";
            }


            $scope.search = function () {
                $scope.s_all = 0;
                var success = function (result) {
                    // console.log("sss" + result);
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/booksroom/pageList', $scope.param, success, error);

            }
            $scope.search();
            
        $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.library.libraryList');
                    $scope.closeThisDialog();
                    location.reload();

                },1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            // delete $scope.record.createTime;
            // delete $scope.record.updateTime;
            // delete $scope.record.school;
            $scope.record.id = $scope.ngDialogData.id;
            recordFormat.format($scope.record,'.');

            if ($state.params.id) {
                    API.post('/res/booksroom/updateRoom', $scope.record, success, error);

                } else {
                    API.post('/res/booksroom/addRoom', $scope.record, success, error);
                }

        }

    validate();
    function validate(){

            if(jQuery('#teacheradd_form').length==0){
                setTimeout(function(){
                    validate();
                },1000);
            }
            
            jQuery('#teacheradd_form').validate({
                rules: {
                    name: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: '请输入名称'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }





    }])