'use strict';

angular.module('app')
    .controller('instockBookController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {                                    
    $scope.set_curr(1);
    $scope.loading=false;
    $scope.s_all = 0; 
    $scope.record={};
    //单选标记
    $scope.select_per = function(index){
        $scope.list[index].selected = !$scope.list[index].selected;
    }
    // 回车事件
    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search_book();
        }

    }
    $("#isbn").focus();
    // 查询图书信息
    $scope.list = [];
    $scope.search_book=function(){
        var success = function(result){
            var temp=[];
            for(var i=0;i<$scope.list.length;i++){
                temp.push($scope.list[i].isbn);
            };
            var index = temp.indexOf(result.data.isbn);       
            if(index>-1){
                $scope.list[index].inNum +=1;
            }else{
                result.data.inNum=1;
                console.log(result.data.inNum);
                $scope.list.unshift(result.data);
            }
            $scope.record.isbn="";
            $scope.$apply();
        }
        var error = function(result){
            console.log(result.msg);
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/res/books/queryByIsbn',$scope.record,success,error);

    }
    $scope.init = function (id) {
                var success = function (result) {
                    $scope.detail = result.data;
                    $scope.list = [];
                    $scope.record = {"remark":$scope.detail.remark};
                    for(var i=0;i<$scope.detail.dataList.length;i++){
                            //$scope.list.unshift($scope.detail.dataList[i]);
                            $scope.list.push($scope.detail.dataList[i]);
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/booksStorage/detail', {"id":id}, success, error);

            }
    $scope.choosebook = function(){
        var str=[];
        for(var i=0;i<$scope.list.length;i++){
            if(!$scope.list[i].selected){
                var strsub=[];
                strsub.push($scope.list[i].id,$scope.list[i].inNum);
                str.push(strsub);
                console.log(str);
                $scope.record.detailInfo=str.join('|');
            }
        }
    }
    // $scope.choosebook();
    $scope.submit = function(){
        var success = function(result){
            $scope.pageInfo = result.data;
            $timeout(function(){
                    $scope.list = [];
                    $scope.record=[];
                    $state.go('main.instock.instockList');
                },1000);
            $scope.$apply();
            toaster.pop('success', "", "入库成功");
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        // delete $scope.record.isbn;
        $scope.choosebook();
        console.log($state.params.id);
        if($state.params.id){
            $scope.record.id=$state.params.id;
            API.post('/res/booksStorage/update',$scope.record,success,error);
        }else{
           API.post('/res/booksStorage/add',$scope.record,success,error); 
        }
        
    }
    // 暂存
    $scope.submit2 = function(){
        var success = function(result){
            $scope.pageInfo = result.data;
            $timeout(function(){
                    $scope.list = [];
                    $scope.record=[];
                    $state.go('main.instock.instockList');
                },1000);
            $scope.$apply();
            toaster.pop('success', "", "暂存成功");
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        // delete $scope.record.isbn;
        $scope.choosebook();
        if($state.params.id){
            $scope.record.id=$state.params.id;
            API.post('/res/booksStorage/updateZC',$scope.record,success,error);
        }else{
           API.post('/res/booksStorage/addZC',$scope.record,success,error); 
        }
    }
    // 数量
    $scope.add=function(index){
        $scope.list[index].inNum+=1;
    }
    $scope.reduce=function(index){
        if($scope.list[index].inNum==0){
            $scope.list[index].inNum=0;
        }else{
            $scope.list[index].inNum-=1;
        }
    }

    console.log($scope.list);

    // 添加与编辑
    if ($state.params.id) {
            $scope.app_name = "编辑入库";
            $scope.init($state.params.id);
            
        } else {
            $scope.app_name = "添加入库";
        }
    // 翻页
    $scope.pagination = function (obj) {
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

    $scope.open_search = function(){
            ngDialog.open({
                template:'template/module/librarymanage/instock/booktree.html',
                controller: 'booktreeController',
                className: 'ngdialog-theme-green',
                scope:$scope,
                // data:{"isbn":isbn},
                width:700,
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/librarymanage/instock/booktreeController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                     }]}
            })
      
        }
// 接收弹出框数据
    $scope.set_books = function(obj){
        for(var i=0;i<obj.length;i++){
            var flag = false;
            obj[i].selected = !obj[i].selected;
            obj[i].inNum=1;
            var id = obj[i].id;
            for(var j=0;j < $scope.list.length;j++){
                if(id == $scope.list[j].id){
                    $scope.list[j].inNum += 1;
                    flag = true;
                    // continue;
                }
            }
            if(!flag){
                $scope.list.unshift(obj[i]);
            }
        };
        
    } 

       // 删除
       $scope.del = function(id){
        var temp=[]
            for(var i=0;i<$scope.list.length;i++){
                temp.push($scope.list[i].id);
            }
        var index=temp.indexOf(id);
        $scope.list.splice(index,1);
       }

        
} ]);