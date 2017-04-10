'use strict';

angular.module('app')
    .controller('borrowBookController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {                                    
    $scope.set_curr(1);
    $scope.loading=false;
    $scope.s_all = 0; 
    $scope.record={};
    var d = new Date();
    $scope.record["startDate"]= d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    $scope.record["endDate"]= d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    //单选标记
    
    $scope.select_per = function(index){
        $scope.list[index].selected = !$scope.list[index].selected;
    }
    // 回车事件
    $scope.enterEvent = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search_book();
            // $scope.record.isbn="";
        }


    }
    $("#isbn").focus();
    // 查询图书信息
    $scope.list=[];

    $scope.search_book=function(){
        var success = function(result){
            var temp=[];
            for(var i=0;i<$scope.list.length;i++){
                temp.push($scope.list[i].isbn);
                console.log(temp);
            };
            var index = temp.indexOf(result.data.isbn);       
            if(index>-1){
                $scope.list[index].inNum +=1;
            }else{
                result.data.inNum=1;
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
        if($scope.record.isbn==""){
                toaster.pop('error', '', "请输入要借阅的图书");
        }else{
            API.post('/res/books/queryByIsbn',$scope.record,success,error);
        }
        

    }
    // $scope.search_book();
    $scope.choosebook = function(){
        var str=[];
        for(var i=0;i<$scope.list.length;i++){
            if(!$scope.list[i].selected){
                var strsub=[];
                strsub.push($scope.list[i].id,$scope.list[i].inNum);
                str.push(strsub);
                console.log(str);
                $scope.record.booksInfo=str.join('|');
            }
        }
    }
    // console.log($scope.list);
    $scope.submit = function(){
        var success = function(result){
            $scope.pageInfo = result.data;
            $timeout(function(){
                    // $scope.list = [];
                    // $scope.record=[];
                    $state.go('main.borrow.borrowOperate');
                },1000);
            $scope.$apply();
            toaster.pop('success', "", "借出成功");
        }

        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        // delete $scope.record.isbn;
        $scope.choosebook();
        API.post('/res/booksBorrowLog/addLog',$scope.record,success,error);
    }
    $scope.add=function(index){
        if($scope.list[index].inNum<$scope.list[index].divNum){
            $scope.list[index].inNum+=1;
            $scope.list[index].iteminNum=false;
        }else{
            $scope.list[index].disabled=true;
        }
    }
    $scope.reduce=function(index){
        if($scope.list[index].inNum>1&&$scope.list[index].inNum<$scope.list[index].divNum){
            $scope.list[index].inNum-=1;
        }else{
            $scope.list[index].iteminNum=true;
        }
    }

    // 翻页
    $scope.pagination = function (obj) {
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
    $scope.open_books = function(){
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
    $scope.open_search = function(){
            ngDialog.open({
                template:'template/module/librarymanage/borrow/borrowUser.html',
                controller: 'borrowUserController',
                className: 'ngdialog-theme-green',
                scope:$scope,
                // data:{"isbn":isbn},
                width:700,
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/librarymanage/borrow/borrowUserController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                     }]}
            })
      
        }

    $scope.set_borrowUser = function(obj){
        $scope.borrow = obj;
        console.log(obj);
        $scope.record["borrowUser"] = $scope.borrow.userId;
        $scope.record["borrowUsername"] = $scope.borrow.name;
        console.log($scope.record.borrowUser);
    }     
    $scope.set_books = function(obj){
        // for(var i=0;i<obj.length;i++){
        //     obj[i].inNum=1;
        //     obj[i].selected = !obj[i].selected;
        //     $scope.list.unshift(obj[i]);
        // };
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

} ]);