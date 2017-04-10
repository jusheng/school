'use strict';

angular.module('app')
    .controller('manageController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {


     // $scope.param = {};  
    $scope.dorm = $state.params.dorm;
    console.log($state.params);
    $scope.classId = $state.params.classId;
    console.log($scope.classId);
    var data = {
        "id":$state.params.id
        // "id":16
        // "classId":$state.params.classId
    };
    $scope.search = function(){
        console.log($scope.id);
        console.log($scope.param);
        console.log(data);
        var success = function(result){
            $scope.pageInfo = result.data;
            // for (var i = 0; i < $scope.pageInfo.studentInfo.length; i++) {
            //     $scope.ids.push($scope.pageInfo.studentInfo.length.);
            // }
            
            console.log($scope.pageInfo);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/edu/dorm/read/detail",data,success,error);
    }
    $scope.search();
    // if($state.params.id != 0 ){
    //     $scope.param.classId = $state.params.id;
    
    //     // $scope.set_curr($scope.param.classId);


    //     $scope.search();
    // }else{
    //     $scope.$watch("lists",function(){
    //         if(!$scope.lists){
    //             console.log($scope.lists);
    //             return false;
    //         }

    //         // console.log('有值了');
    //         $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].id);
    //         // $scope.set_curr($scope.param.classId);
    //         $scope.search();
    //     })
    // }

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };



    $scope.do_del = function(item){
        var success = function(result) {
            toaster.clear('*');
            toaster.pop('success', "", "删除成功");
            $timeout(function() {
                $scope.search();
            }, 1000);
        }
        var error = function(result) {
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        API.post("/edu/dorm/deleteStudent", {
            "dormId":  data.id,
            "studentId": item.id
        }, success, error);

    } 
    // tab
    $scope.type = 1;
    $scope.change = function(s){
                $scope.type = s;
    
    }
    //   //删除操作
    // $scope.del = function(id) {

    //     var f = function(id){
    //         if(id){
    //             var id = id;
    //         }else{
    //             var temp = [];
    //             for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    //                 $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
    //             }
    //             var id = temp.join(",");
    //         }

    //         if(id.length==0){
    //             return false;
    //         }


    //         ngDialog.open({
    //             template:'template/module/tpl/confirm.html',
    //             controller: 'confirmController',
    //             className: 'ngdialog-theme-green',
    //             data:{
    //                 "id":id,
    //                 scope:$scope,
    //                 "callback":$scope.do_del
    //             },
    //             resolve: {
    //                      deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
    //                         return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
    //                             return $ocLazyLoad.load('toaster');
    //                         });
    //                  }]}
    //         }) 
    //     }
    

    //     $scope.is_authorzie(f,id);
        

    // }


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
    //         toaster.pop('error', '', "您不是该班的班主任,不能进行操作!");
    //     }
        
    //     API.post("/class/validClassTeacher", {
    //         "classId":$scope.param.classId
    //     }, success, error);

    // }
    console.log($state.params);
    $scope.sex = $state.params.sex;
    console.log($scope.sex);
    //添加成员
       $scope.open_te = function(t){

            $scope.cu = t;
            ngDialog.open({
                    template: 'template/module/classmanage/dormitories/user.html',
                    controller: 'userController',
                    scope:$scope,
                    className: 'ngdialog-theme-green',
                    data:{
                        "callback":$scope.search
                    },
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/classmanage/dormitories/userController.js');
                        }]}
                });
       }
       $scope.param = {};  
     //弹出框
    $scope.add_module = function(){
        console.log(item);
        ngDialog.open({
            template:'template/module/classmanage/userules/add.html',
            controller: 'addController',
            className: 'ngdialog-theme-green',
            data:{
                "ids":$scope.ids,
                "classId":$scope.classId,
                "callback":$scope.search
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/classmanage/userules/addController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })
    }        


    //删除确认
    $scope.open_confrim = function(value){
        ngDialog.open({
            template:'template/module/classmanage/committee/confirm.html',
            controller: 'committeeconfirmController',
            className: 'ngdialog-theme-green',
            data:{
                "value":value,

                "callback":$scope.do_del
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/classmanage/committee/committeeconfirmController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })   
    }

} ]);

