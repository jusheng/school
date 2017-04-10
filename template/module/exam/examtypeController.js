'use strict';

angular.module('app')
    .controller('examtypeController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
           $scope.app_name = "添加类型";
           //获取考试类型
        $scope.getType = function(){
            var success = function(result){
                $scope.eType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/res/exam/type/read/all',{},success,error);
        }
       //$scope.getType();
           $scope.submit = function () {
                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $scope.closeThisDialog();
                        $scope.ngDialogData.parent_scope.getType();
                        var typeId = result.data.id;
                        if($scope.ngDialogData.parent_scope.record){
                             $scope.ngDialogData.parent_scope.record.type = typeId;
                         }else{
                            $scope.ngDialogData.parent_scope.record = {
                                "type":typeId
                            }
                         }
                       
                        //$scope.ngDialogData.parent_scope.search();
                    }, 500);
                    //location.reload();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                delete $scope.record.createTime;
                delete $scope.record.updateTime;
                delete $scope.record.createBy;
                delete $scope.record.updateBy;

                API.post('/res/exam/type/add', $scope.record, success, error);
                
            }
            validate();
            function validate() {

                if(jQuery('#examtype').length==0){
                    setTimeout(function(){
                        validate();
                    },200);
                }

                jQuery('#examtype').validate({
                    rules: {
                        name: {
                           required: true
                        }
                    },
                    messages: {
                        name: {
                           required: '请填写名称'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }




        }
    ])