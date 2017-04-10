'use strict';

angular.module('app')
    .controller('bookListController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
                                    function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

    $scope.param={ };
    $scope.loading=false;

    $scope.set_curr(1);

    // console.log($state.params.sorts_id);
    //if($state.params.sorts_id != 0){
        $scope.param.typeCode = $state.params.code;
        $scope.param.typeId = $state.params.sorts_id;
        $scope.name = $state.params.name;
   // }
   // 
   // 
   
   $scope.$on("parent_send",function(e,data){
        console.log(data);
        $scope.param.typeCode = data.code;
        $scope.param.typeId = data.sorts_id;
        $scope.name = data.name;
        $scope.search();
   })

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
        API.post('/res/books/pageList',$scope.param,success,error);

    }

    $scope.search();


    $scope.get_sortName = function(typeCode){
        var l = $scope.sorts.length;
        for (var i = 0; i < l; i++) {
            if($scope.sorts[i].id==typeCode){
                return $scope.sorts[i].name;
                break;
            }
        }
    }
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

    $scope.do_del = function(id){
        var success = function(result){
                toaster.clear('*');
                toaster.pop('success', "", "删除成功");
                $timeout(function(){
                    $scope.search();
                    $scope.$emit('sendParent','删除成功，重新排名')
                },1000);
            }
        var error = function(result){
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }

        if(id){ //单个删除

            API.post("/res/books/delete",{"id":id},success,error);

        }else{ //批量删除

            var temp = [];
            for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                $scope.pageInfo.list[i].selected && temp.push($scope.pageInfo.list[i].id);
            }


            temp.length>0 && API.post("/res/books/delete",{"id":temp.join(",")},success,error);
        }
    }
    

        $scope.open_confrim = function(id){

            ngDialog.open({
                template:'template/module/edu/activity/confirm.html',
                controller: 'activityconfirmController',
                className: 'ngdialog-theme-green',
                data:{
                    "id":id,
                    "callback":$scope.do_del
                },
                resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
                                return $ocLazyLoad.load('toaster');
                            });
                     }]}
            })
      
        
        } 
        
        var upload_type1 = [
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ];
       //导入信息
        $scope.onFileSelect = function (files) {
            angular.forEach(files, function (file) {


                if (upload_type1.join(",").indexOf(file.type) < 0) {
                    toaster.clear('*');
                    toaster.pop('error', '', "只允许上传xls,xlsx类型文件");
                    return false;
                }
                toaster.clear("*");
                toaster.pop(
                    {
                        "type": "wait",
                        "title": "",
                        "body": "正在导入..."
                    }
                );

                file.upload = Upload.upload({
                    "url": "/res/books/importData",
                    headers: {'Content-Type': 'multipart/form-data'},
                    "data": {file: file},
                }).progress(function (evt) {
                    //进度条
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total) + '%';
                    // console.log('progess:' + $scope.progress + '%');

                    if ($scope.progress == '100%') {
                        $scope.progress = '【上传完成】';
                        $timeout(function () {
                            $scope.progress = '';
                        }, 2000)

                        $timeout(function () {

                        })
                    }

                });

                file.upload.then(function (response) {

                    if (response.data.httpCode == 200) {
                        $timeout(function () {
                            toaster.clear('*');
                            $scope.search();
                            toaster.pop('success', '', response.data.msg);
                        })

                    } else {
                        $timeout(function () {
                            toaster.clear('*');
                            toaster.pop('error', '', response.data.msg);
                        })

                    }

                })

            })
        };

} ]);