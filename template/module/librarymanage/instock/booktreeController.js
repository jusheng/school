'use strict';

angular.module('app')
    .controller('booktreeController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

    $scope.param={
        pageSize:5
     };
    $scope.loading=false;
    $scope.app_name = "选择图书";

    $scope.s_all = 0;  //全选标记
    $scope.select_all = function(){
        $scope.s_all = !$scope.s_all;

        for (var i = 0; i < $scope.pageInfo.list.length; i++) {
            $scope.pageInfo.list[i].selected = $scope.s_all;
        }

    }; 

    //单选标记
    
    $scope.select_per = function(index){
        $scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;   
    }

    $scope.choose_book=function(){
        var temp=[];
        for (var i = 0; i < $scope.pageInfo.list.length; i++) {
            $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i]);
        }
        // console.log(temp);
        $scope.set_books(temp);
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
        API.post('/res/books/pageList',$scope.param,success,error);

    }

    $scope.search();


// $scope.get_sortName();
    $scope.clearSearch = function() {
            $scope.param.keyword= null;
            $scope.search();
    }

    // 翻页
    $scope.pagination = function (obj) {
        
        $scope.param.pageNum=obj.page;
        $scope.search();
    };

} ]);