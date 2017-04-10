'use strict';

angular.module('app')
    .controller('alllistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {
    $scope.param = {};  
    var data2 = {};
    if($state.params.id != 0 ){
        $scope.classId = $state.params.id;
        data2 = {
                "classId":$scope.classId
        };

    }else{
        $scope.$watch("lists",function(){
            if(!$scope.lists){
                // console.log($scope.lists);
                return false;
            }

            $scope.classId = ($scope.lists.length>0 &&　$scope.lists[0].id);
            // alert($scope.classId);
            data2 = {
                "classId":$scope.classId
            };
           
        })
    }
    
    // 查询全校宿舍
    $scope.idArray = [];
    $scope.loading = false;
    var data = {};
    console.log(data2);
    // 班级宿舍实时显示
    
    $scope.search2 = function(data2){
        console.log($scope.param);
        console.log(data2);
        var success = function(result){
            $scope.class = result.data;
            console.log($scope.class);
            $scope.$apply();

        }
        var error = function(){

        }

        API.post("/edu/dorm/read/getListByClass",data2,success,error);
    }
    // $scope.search2(data2);
    // 获取全校宿舍列表

    $scope.search = function(data){

        var success = function(result){
            $scope.pageInfo = result.data;
            console.log($scope.pageInfo);
            $scope.search2(data2);
            $scope.$apply();
        }
        var error = function(){

        }

        API.post("/edu/dorm/read/list",data,success,error);
    }

 
    
    //获取公寓列表
    $scope.house=function(){
        console.log(data);
        var success = function(result){
            $scope.houseList = result.data;
            $scope.search(data);
            $scope.$apply();
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/edu/house/read/list',{},success,error);
    }
    $scope.house();
    //获取楼层列表
    $scope.getexam=function(){
        if ($scope.param.houseId!=null) {

            data = {
                    "houseId":$scope.param.houseId
            }
            $scope.search(data);
            var success = function(result){
                $scope.examList = result.data;
                console.log($scope.param.floor);
                console.log(data);
            
            $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
                API.post('/edu/house/floor/list',data,success,error);
        }else{

            data ={};
            return $scope.search(data);
        }
         
        
    }

    // 选择楼层的即时搜索
    $scope.sub = function(){
        if ($scope.param.floor&&$scope.param.houseId) {
            data = {
                    "houseId":$scope.param.houseId,
                    "floor":$scope.param.floor
            }
        }else{
            data = {
                    "floor":$scope.param.floor
            }
        }
            
        $scope.search(data);
    
    }
    $scope.search0 = function(){
        if ($scope.param.floor&&$scope.param.houseId) {
            data = {
                    "houseId":$scope.param.houseId,
                    "floor":$scope.param.floor
            }
        }else if($scope.param.floor&&$scope.param.houseId==""){
            data = {
                    "floor":$scope.param.floor
            }
        }else if($scope.param.floor==""&&$scope.param.houseId){
            data = {
                    "houseId":$scope.param.houseId
            }
        }else{
            data ={}
        }
        $scope.search(data);
    }

    // 添加选中的宿舍到本班

    $scope.submit = function(item){
            var data1 = {
                "dormId":item.dormInfo.id,
                "classId":$scope.classId
            }
            console.log(data1);
            console.log(data1.classId);

            var success = function(result){
                $scope.search2(data2);
                $scope.search();
                toaster.clear('*');
                
                console.log(data1.classId);
                console.log(item.classId);
                if (item.classId !='' && data1.classId != item.classId) {
                    toaster.pop('success', '', "请联系该班班主任协商混合宿舍");
                }else if(item.classId==''){
                    
                    console.log(item.classId);
                    toaster.pop('success', '', "添加成功");
                }
                
                // $timeout(function() {
                //     $scope.search();
                // }, 1000); 
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

                API.post('/edu/dormClass/add',data1,success,error);
       }

    // 删除本班宿舍
    $scope.submit1 = function(item){
            var data1 = {
                "dormId":item.id,
                "classId":$scope.classId
            }
            console.log(data1);
            console.log(data1.classId);
            var success = function(result){
                $scope.search2(data2);
                $scope.search();
                toaster.clear('*');
                toaster.pop('success', '', "宿舍删除成功");
                // $timeout(function() {
                //     $scope.search();
                // }, 1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

                API.post('/edu/dormClass/delete',data1,success,error);
    }

    
    
    // 翻页
    $scope.pagination = function (obj) {
        
        data.pageNum=obj.page;
        $scope.search(data);
    };

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
    $scope.open_confrim = function(value,i){
        var xsub;
        if (i==1) {
            xsub=$scope.submit
        }else if (i==0){
            xsub=$scope.submit1
        }else if (i==2){
            xsub=$scope.submit
        }
        // alert(i);
        ngDialog.open({
            template:'template/module/classmanage/dormitories/confirm.html',
            controller: 'committeeconfirmController',
            className: 'ngdialog-theme-green',
            data:{
                "i":i,
                "value":value,
                "callback":xsub
                
            },
            resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                        return uiLoad.load('template/module/classmanage/dormitories/committeeconfirmController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                        });
                 }]}
        })   
    }
}])
