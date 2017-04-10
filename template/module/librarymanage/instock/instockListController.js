'use strict';

angular.module('app')
    .controller('instockListController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {

    $scope.param={ };
    $scope.loading=false;
    $scope.set_curr(2);
    $scope.s_all = 0; 
    $scope.record={};
    //全选标记
        $scope.select_all = function () {
                $scope.s_all = !$scope.s_all;

                for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    $scope.pageInfo.list[i].selected = $scope.s_all;
                }

            };
    $scope.select_per = function (index) {
                $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
            }
    //请求数据
    $scope.search=function(){
        $scope.s_all = 0;
        var success = function(result){
            $scope.pageInfo = result.data;
            $scope.$apply();
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        recordFormat.format($scope.param,".");
        API.post('/res/booksStorage/pageList',$scope.param,success,error);

    }

    $scope.search();

// 更新暂存
    $scope.to_submit = function(id){
        if(id.length ==0){
            toaster.pop('error', "", "请选择要入库的数据!");
            return false;
        }
        ngDialog.open({
                    template:'template/module/tpl/return.html',
                    controller: 'returnController',
                    className: 'ngdialog-theme-green',
                    data:{
                        "id":id,
                        "callback":$scope.submit,
                        "title":"入库提示",
                        "confirm_msg":"您确定要执行入库操作吗?"
                    },
                    resolve: {
                             deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                                return uiLoad.load('template/module/tpl/returnController.js').then(function(){
                                    return $ocLazyLoad.load('toaster');
                                });
                         }]}
                });
    }
    
    $scope.submit=function(id){
        var success = function(){
            toaster.clear('*');
            toaster.pop('success', "", "入库成功");
            $timeout(function () {
                $scope.search();
            }, 1000);
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/res/booksStorage/storage',{"id":id},success,error);

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
            API.post('/dic/read/key',{key:"BOOK_STORAGE_STATUS"},success,error);
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
    // 删除
    $scope.do_del = function(id){
                 var success = function (result) {
                    toaster.clear('*');
                    toaster.pop('success', "", "删除成功");
                    $timeout(function () {
                        $scope.search();
                    }, 1000);
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/booksStorage/delete", {"ids": id}, success, error);
            }

            //删除操作
            $scope.del = function (id) {

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


      
        


} ]);