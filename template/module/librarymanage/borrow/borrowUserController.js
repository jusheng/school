'use strict';

angular.module('app')
    .controller('borrowUserController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

    $scope.param={
        pageSize:5
     };
    $scope.loading=false;
    $scope.app_name = "选择借阅人";
    // $scope.set_curr(1);
    // console.log($state.params.sorts_id);
    $scope.s_all = 0;  

    //单选标记
    $scope.select_t = function(index){
        
        $scope.set_borrowUser($scope.pageInfo.list[index]);
    }
    //请求数据
    $scope.search=function(){
        var success = function(result){
            $scope.pageInfo = result.data;
            $scope.$apply();
        }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/user/userExtPage',$scope.param,success,error);

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