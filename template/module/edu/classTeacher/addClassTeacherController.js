'use strict';

angular.module('app')
    .controller('addClassTeacherController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
            $scope.record = {};
            $scope.app_name = "添加老师";
            $scope.record["eduClass.id"] = Number($state.params.classId);
//获取老师列表
    $scope.search=function(){
        var success = function(result){
            $scope.teacherList = result.data;
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/edu/teacher/selectTeacherBySubjectId',{"subjectId":$scope.ngDialogData.id},success,error);

    }

    $scope.search();

//提交
    $scope.submit = function(){

        var success = function(result){
            toaster.clear('*');
            toaster.pop('success', '', "保存成功");
            $timeout(function(){
                    $scope.closeThisDialog();
                    $scope.ngDialogData.search();
                },1000);
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/class/saveClassTeacherSubject",{"teacher.id":$scope.record.teacherId,"eduClass.id":$scope.ngDialogData.classId,"subject.id":$scope.ngDialogData.id},success,error);

    }

           
        }
    ])