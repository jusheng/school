'use strict';

angular.module('app')
    .controller('listController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
    $scope.param = {};  

    // /student/read/classStudent/page      


    $scope.search = function(){
        console.log($scope.param);
        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/classes/record/read/list",$scope.param,success,error);
    }
    


    

    if($state.params.id != 0 ){
        $scope.param.classId = $state.params.id;
    
        $scope.set_curr($scope.param.classId);


        $scope.search();
    }else{
        $scope.$watch("lists",function(){
            if(!$scope.lists){
                console.log($scope.lists);
                return false;
            }

            console.log('有值了');
            $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].id);
            $scope.set_curr($scope.param.classId);
            $scope.search();
        })
    }



    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };



    $scope.do_del = function(id){
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

        API.post("/classes/student/deleteClassStudent", {
            "id": id,
            "classId":$scope.param.classId
        }, success, error);

    } 
    // tab
    $scope.type = 1;
    $scope.change = function(s){
                $scope.type = s;
    
    }
      //删除操作
    $scope.del = function(id) {

        var f = function(id){
            if(id){
                var id = id;
            }else{
                var temp = [];
                for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                }
                var id = temp.join(",");
            }

            if(id.length==0){
                return false;
            }


            ngDialog.open({
                template:'template/module/tpl/confirm.html',
                controller: 'confirmController',
                className: 'ngdialog-theme-green',
                data:{
                    "id":id,
                    "callback":$scope.do_del
                },
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/tpl/confirmController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                     }]}
            }) 
        }
    

        $scope.is_authorzie(f,id);
        

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


    $scope.is_authorzie = function(callback,id){

        var success = function(result) {
            if(id){
                callback(id);
            }else{
                callback();  
            }
            
           //$state.go('main.teacherclass.edit',{id:studentId,classId:$state.params.id});
        }
        var error = function(result) {
            toaster.clear('*');
            toaster.pop('error', '', "您不是该班的班主任,不能进行操作!");
        }
        
        API.post("/class/validClassTeacher", {
            "classId":$scope.param.classId
        }, success, error);

    }



     //弹出框
    $scope.add_module = function(item){
        console.log(item);
        ngDialog.open({
            template:'template/module/classmanage/userules/add.html',
            controller: 'addController',
            className: 'ngdialog-theme-green',
            data:{
                "item":item,
                "userid":$scope.user_data.id,
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
}])
