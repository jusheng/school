'use strict';

angular.module('app')
    .controller('borrowListController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

    $scope.param={ };
    $scope.loading=false;
    $scope.set_curr(2);

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
        // console.log($scope.param);
        API.post('/res/booksBorrowLog/logList',$scope.param,success,error);

    }

    $scope.search();
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

      
        


} ]);