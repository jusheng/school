'use strict';

angular.module('app')
    .controller('detailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster) {
    var stuid = {
        "studentId":$state.params.id
    };     

    $scope.search = function(){
        console.log(stuid);
        var success = function(result){
            $scope.pageInfo = result.data;

            $scope.$apply();
            console.log($scope.pageInfo);
        }
        var error = function(){

        }

        API.post("/classes/record/read/detail",stuid,success,error);
    }
    $scope.search();


    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.schoolteachers_list();
    };



    // 民族
    $scope.get_nation = function(key){
        
            var success = function(result){
                 $scope.nation = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"NATIONAL"},success,error);
     }  
     $scope.get_nation();

     $scope.re_nationName = function(code){

        if($scope.nation){
            for (var i = 0; i < $scope.nation.length; i++) {
                    if($scope.nation[i].code==code){
                        return $scope.nation[i].codeText;
                        break;
                    }
                }   
        }
     }


     // 政治面貌
    $scope.get_politics = function(key){
        
            var success = function(result){
                 $scope.politics = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"POLITICS_STATUS"},success,error);
     }  
     $scope.get_politics();

     $scope.re_politicsName = function(code){

        if($scope.politics){
            for (var i = 0; i < $scope.politics.length; i++) {
                    if($scope.politics[i].code==code){
                        return $scope.politics[i].codeText;
                        break;
                    }
                }   
        }
     }


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

        //if (id) { //单个删除

            API.post("/classes/student/deleteClassStudent", {
                "id": id,
                "classId":$scope.param.classId
            }, success, error);

        // } else { //批量删除

        //     var temp = [];
        //     for (var i = 0; i < $scope.pageInfo.list.length; i++) {
        //         $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
        //     }


        //     temp.length > 0 && API.post("/student/delete", {
        //         "id": temp.join(",")
        //     }, success, error);
        // }
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

    //是否可以编辑
    $scope.validModify = function(studentId){
        //console.log("student="+ studentId);
        var f = function() {
            $state.go('main.teacherclass.edit',{id:studentId,classId:$state.params.id});
        };
        $scope.is_authorzie(f);
    };

}])
