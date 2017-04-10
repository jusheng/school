'use strict';

angular.module('app')
    .controller('ourdormlistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {
    $scope.param = {};  
    
    $scope.idlist = [];
    $scope.ids = {};

    $scope.params1 = {};
    $scope.search = function(){
        console.log($scope.param);
        var success = function(result){
            $scope.pageInfo = result.data;
            for (var i = 0; i < $scope.pageInfo.list.length ; i++) {
                // alert($scope.pageInfo.list[i].id);
                $scope.idlist.push($scope.pageInfo.list[i].id)
            }
            $scope.ids = $scope.idlist.join(",");
            console.log($scope.ids);
            $scope.$apply();

        }
        var error = function(){

        }

        API.post("/edu/dorm/check/read/list",$scope.param,success,error);
    }
    
    if($state.params.id != 0 ){
        $scope.param.classId = $state.params.id;
        $scope.params1 = $state.params.id;
        console.log($scope.params1);
        $scope.set_curr($scope.param.classId);


        $scope.search();
    }else{
        $scope.$watch("lists",function(){
            if(!$scope.lists){
                // console.log($scope.lists);
                return false;
            }

            // console.log('有值了');
            $scope.param.classId = ($scope.lists.length>0 &&　$scope.lists[0].id);
            $scope.params1 = $state.params.id;
            $scope.set_curr($scope.param.classId);
            $scope.search();
        })
    }


    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };


    // 删除本班宿舍
    $scope.del = function(item){
            $scope.is_authorzie();
            var data = {
                "dormId":item.id,
                "classId":$scope.param.classId
            }
            console.log(data);
            console.log(data.classId);
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout($scope.search(),1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

                API.post('/edu/dormClass/delete',data,success,error);
       }



    $scope.is_authorzie = function(callback,id){

        var success = function(result) {

            if(id){
                callback(id);
                // alert(1);
            }else{
                // alert(2);
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

    //分数折线图弹出
    $scope.add_module1 = function(value){
        ngDialog.open({
            template:'template/module/edu/adddormscore/checked.html',
            controller: 'checkedController',
            className: 'ngdialog-theme-green-big',
            data:{
                "value":value,
                "callback":$scope.search
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/edu/adddormscore/checkedController.js').then(function(){
                            return $ocLazyLoad.load(['toaster','angular-echarts']);
                        });
                 }]}
        })
    }   
}])
