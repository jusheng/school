'use strict';

angular.module('app')
    .controller('manageController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {
    $scope.param = {};  
    
    // 查询全校宿舍

    $scope.search = function(){
        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/edu/house/read/list",$scope.param,success,error);
    }
    
    $scope.search();
    console.log($state.params);

    console.log($scope.param);

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
    // 设置对勾
    if ($scope.param != 0) {
                //$scope.selected = 4;
                // alert(1);
                $scope.set_curr(2);

    }
    // // 解决初始传参数问题     
    // if($state.params.id != 0 ){
    //     $scope.param.classId = $state.params.id;
    //     $scope.params1 = $state.params.id;
    //     console.log($state.params.id);
    //     console.log($scope.params1);
    //     // $scope.set_curr($scope.param.classId);
    //     alert(1);

    //     $scope.search();
    // }else{
    //     $scope.$watch("lists",function(){
    //         if(!$scope.lists){
    //             // console.log($scope.lists);
    //             return false;
    //         }

    //         // console.log('有值了');
    //         $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].id);
    //         $scope.params1 = $state.params.id;
    //         // $scope.set_curr($scope.param.classId);
    //         $scope.search();
    //     })
    // }
       // 删除

    $scope.del = function(value){

        var data={
            "id":value,
            
        };

        var success = function(result){

                toaster.clear('*');
                toaster.pop('success', "", "删除成功");
                $timeout(
                    $scope.search(),500);
            }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

         //单个删除

        API.post("/edu/house/delete",data,success,error);

        }


    $scope.s_all = 0; //全选标记
    $scope.select_all = function() {
        $scope.s_all = !$scope.s_all;

        for (var i = 0; i < $scope.pageInfo.list.length; i++) {
            $scope.pageInfo.list[i].selected = $scope.s_all;
        }
    };


    $scope.select_per = function(index) {
        $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    }


    // $scope.is_authorzie = function(callback,id){

    //     var success = function(result) {
    //         if(id){
    //             callback(id);
    //         }else{
    //             callback();  
    //         }
            
    //        //$state.go('main.teacherclass.edit',{id:studentId,classId:$state.params.id});
    //     }
    //     var error = function(result) {
    //         toaster.clear('*');
    //         toaster.pop('error', '', "您不是管理员,不能进行操作!");
    //     }
        
    //     API.post("/edu/house/delete", {
    //         "classId":$scope.param.classId
    //     }, success, error);

    // }

     //弹出成员选择框  
       $scope.open_te = function(t){

            $scope.curr = t;
            ngDialog.open({
                    template: 'template/module/classmanage/dormitories/user.html',
                    controller: 'userController',
                    scope:$scope,
                    className: 'ngdialog-theme-green',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/classmanage/dormitories/userController.js');
                        }]}
                });
       }
       $scope.param = {}; 




    //删除确认
    $scope.open_confrim = function(value){
        ngDialog.open({
            template:'template/module/classmanage/committee/confirm.html',
            controller: 'committeeconfirmController',
            className: 'ngdialog-theme-green',
            data:{
                "value":value,
                "callback":$scope.del
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/classmanage/committee/committeeconfirmController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })   
    }

               //弹出框
    $scope.add_module = function(){
        ngDialog.open({
            template:'template/module/edu/dormitory/add.html',
            controller: 'addController',
            className: 'ngdialog-theme-green',
            data:{
                "callback":$scope.search
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/edu/dormitory/addController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })
    }   
}])
