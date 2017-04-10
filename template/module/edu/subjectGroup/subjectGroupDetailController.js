'use strict';

angular.module('app')
    .controller('subjectGroupDetailController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.record = {};
            $scope.gradeId = $state.params.gradeId;

            // $scope.search=function(){
            //     var success = function(result){
            //         $scope.subjectList = result.data;
            //         $scope.$apply();
            //     }

            //     var error = function(result){
            //         toaster.clear('*');
            //         toaster.pop('error', '', result.msg);
            //     }

            //     API.post('/school/getSchoolSubject',{},success,error);

            // }

            // $scope.search();
            
            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/subjectGroup/read/detail", {"id": id}, success, error);
            }

            $scope.init2 = function (id) {
                var success = function (result) {
                    $scope.detailList = result.data;
                    console.log($scope.detailList);
                    // var temp = [];
                    // var obj = $scope.detailList;
                    // for (var i = 0; i < obj.length; i++) {
                    //     temp.push(obj[i].id);
                    // };

                    // for (var i = 0; i < $scope.subjectList.length; i++) {
                    //     if(temp.indexOf($scope.subjectList[i].id)>-1){
                    //         $scope.subjectList[i].checked = true;
                    //     }else{
                    //         $scope.subjectList[i].checked = false;
                    //     }
                    // };
                    $scope.$apply();

                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                // API.post("/subjectGroup/read/subjectList",{subjectGroupId:id}, success, error);
                API.post("/subjectGroup/read/selectedSubjectList",{subjectGroupId:id}, success, error);
            }

            if ($scope.ngDialogData.subjectGroupId) {
                $scope.app_name = "修改科目组信息";
                $scope.init($scope.ngDialogData.subjectGroupId);
                $scope.init2($scope.ngDialogData.subjectGroupId);
            } else {
                $scope.app_name = "添加科目组信息";
                $scope.init2();
            }

            $scope.submit = function () {
                var temp = [];
                // for(var i in $scope.subjectList){
                //     $scope.subjectList[i].checked && $scope.subjectList[i].checked==true && temp.push($scope.subjectList[i].id);
                // }
                // if(temp.length==0 ){
                //     return false;
                // }
                for(var i in $scope.detailList){
                    $scope.detailList[i]['checked'] && $scope.detailList[i]['checked']==true && temp.push($scope.detailList[i]['subject'].id);
                }
                if(temp.length==0 ){
                    return false;
                }
                var ids = temp.join(",");

                var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $scope.closeThisDialog();
                        $scope.ngDialogData.parent_scope.search();
                    }, 500);
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                $scope.record["basegrade.id"] = $scope.record.basegrade.id;
                $scope.record["ids"] = ids;
                
                delete $scope.record.basegrade;
                delete $scope.record.createTime;
                delete $scope.record.updateTime;
                delete $scope.record.createBy;
                delete $scope.record.updateBy;
                delete $scope.record.school;

                if ($scope.ngDialogData.subjectGroupId) {
                    API.post('/subjectGroup/update', $scope.record, success, error);
                } else {
                    API.post('/subjectGroup/add', $scope.record, success, error);
                }
            }

            //获取基础年级
            $scope.getBaseGrade = function () {
                var success = function (result) {
                    $scope.baseGrade = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/basegrade/read/type", {}, success, error);
            }

            $scope.getBaseGrade();
            

            validate();
            function validate() {

                if(jQuery('#subject_group_form').length==0){
                    setTimeout(function(){
                        validate();
                    },200);
                }

                jQuery('#subject_group_form').validate({
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