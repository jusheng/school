'use strict';

angular.module('app')
    .controller('borrowOperateController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {

    $scope.param={ };
    $scope.loading=false;
    $scope.set_curr(3);

    $scope.s_all = 0;
    $scope.select_id = 0;  
    //全选标记
            $scope.select_all = function () {
                $scope.s_all = !$scope.s_all;

                for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    $scope.pageInfo.list[i].selected = $scope.s_all;
                }

                if( $scope.s_all == true){
                    $scope.select_id = $scope.pageInfo.list.length;  
                }else{
                    $scope.select_id = 0;  
                }



            };

            $scope.select_per = function (index) {

                $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;

                if( $scope.pageInfo.list[index].selected){
                    $scope.select_id++;  
                }else{
                    $scope.select_id--;  
                }

                if($scope.select_id <0){
                    $scope.select_id = 0;
                }

            }


    //请求数据
    $scope.search=function(){
        $scope.s_all = 0;
        var success = function(result){
            $scope.pageInfo = result.data;
            $scope.select_id = 0;
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        // console.log($scope.param);
         recordFormat.format($scope.param,".");
        API.post('/res/booksBorrowLog/actionList',$scope.param,success,error);

    }

    $scope.search();
    // 续借
    $scope.renew=function(obj,id){
        var success = function(result){
            for(var i=0;i<$scope.pageInfo.list.length;i++){
                if($scope.pageInfo.list[i].id==result.resBookBorrowLog.id){
                    $scope.pageInfo.list[i].endTime= result.resBookBorrowLog.endTime;
                }
            }
           $scope.search();
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        // console.log($scope.param);
        $scope.param["id"]=id;
        $scope.param["endTime"]=obj;
        var temp= [];
            temp.push(id,obj);
            $scope.param["logInfos"]=temp.join(",");
            console.log($scope.param.logInfos);
        API.post('/res/booksBorrowLog/updateLog',$scope.param,success,error);

    }
    //获取图书状态
    $scope.getType = function(){
            var success = function(result){
                $scope.uType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"BOOK_BORROW_STATUS"},success,error);
        }
    $scope.getType();

    $scope.clearSearch = function() {
            $scope.param.keyword= null;
            $scope.search();
    }

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

    $scope.do_return = function(id){
                 var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', "", "归还成功");
                    $timeout(function () {
                        $scope.search();
                    }, 1000);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/booksBorrowLog/returnBook", {"ids":id}, success, error);


            }

    //弹出框更改时间
    $scope.renewTime= function(id,bookName,bookIsbn,endDate){
        ngDialog.open({
            template:'template/module/librarymanage/borrow/editTime.html',
            controller: 'editTimeController',
            className: 'ngdialog-theme-green',
            scope:$scope,
            data:{"id":id,"bookName":bookName,"bookIsbn":bookIsbn,"endDate":endDate},
            resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/librarymanage/borrow/editTimeController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                    }]}
        })
    }
    // 
    $scope.set_endTime = function(obj,id){
         $scope.pageInfo.endDate = obj;
         $scope.renew(obj,id);
         console.log(id);
    }
    // 归还
    $scope.returnbook = function (id) {


                if(id){
                    var id = id;
                }else{
                    var temp = [];
                    for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                        $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
                    }
                    var id = temp.join(",");
                }

                if(id==undefined || (id.length==0)){
                    toaster.clear('*');
                    toaster.pop('error', '', '请选择要操作的数据行!');
                    
                }else{

                     ngDialog.open({
                            template:'template/module/tpl/return.html',
                            controller: 'returnController',
                            className: 'ngdialog-theme-green',
                            data:{
                                "id":id,
                                "callback":$scope.do_return
                            },
                            resolve: {
                                     deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                                        return uiLoad.load('template/module/tpl/returnController.js').then(function(){
                                            return $ocLazyLoad.load('toaster');
                                        });
                                 }]}
                        })
                }

               

            }

        


} ]);