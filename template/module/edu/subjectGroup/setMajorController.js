'use strict';

angular.module('app')
    .controller('setMajorController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.gradeId = $state.params.gradeId;

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.detailList = result.data;
                    console.log($scope.detailList);
                    $scope.$apply();

                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // API.post("/subjectGroup/read/subjectList",{subjectGroupId:id}, success, error);
                API.post("/subjectGroup/read/getMajorOfSubjectGroup", {subjectGroupId: id}, success, error);
            }

            $scope.init($scope.ngDialogData.subjectGroupId);

            $scope.submit = function () {
                var temp = [];

                function SubjectGroupFk(subjectId,subjectGroupId,isMajor){
                    this.subject = {"id":subjectId};
                    this.subjectGroup = {"id":subjectGroupId};
                    this.isMajor = isMajor;
                }

                for (var i in $scope.detailList) {
                    var obj = new SubjectGroupFk($scope.detailList[i]['subject'].id,$scope.ngDialogData.subjectGroupId,$scope.detailList[i]['checked']?1:0);
                    temp.push(obj);
                }
                if (temp.length == 0) {
                    return false;
                }

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    // $timeout(function () {
                        $scope.closeThisDialog();
                        $scope.ngDialogData.parent_scope.search();
                    // }, 500);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.jsonpost('/subjectGroup/update/major', temp, success, error);
            }


            validate();
            function validate() {

                if (jQuery('#subject_group_form').length == 0) {
                    setTimeout(function () {
                        validate();
                    }, 200);
                }

                jQuery('#subject_group_form').validate({
                    rules: {
                        //name: {
                        //    required: true
                        //}
                    },
                    messages: {
                        //name: {
                        //    required: '请填写名称'
                        //}
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                })
            }


        }
    ])