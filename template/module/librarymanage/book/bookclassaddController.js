'use strict';

angular.module('app')
    .controller('bookclassaddController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster','recordFormat', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster,recordFormat, API) {
       

            $scope.typeCode = $state.params.code;
           /* $scope.param.typeId = $state.params.sorts_id;
            $scope.param.name = $state.params.name;*/


            $scope.set_curr(2);

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/booksClassify/detail", {"id": id}, success, error);
            }

            if ($state.params.id) {
                $scope.app_name = "修改图书分类";
                $scope.init($state.params.id);
            } else {
                $scope.app_name = "添加图书分类";
                $scope.record = {
                     //从列表页 添加 按钮传过来的参数
                    "parentId":$state.params.sorts_id,   
                    "parentIdNameref":$state.params.name  
                };
            }

            $scope.$on("parent_send",function(e,data){
                console.log(data);
                $scope.record.parentId = data.sorts_id;
                $scope.record.parentIdNameref = data.name;
           })


            // 提交保存
        $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");

                $scope.$emit("classupdate","ok");

                if($state.params.id){
                     $timeout(function(){
                        $state.go('main.book.bookclassList',{
                            sorts_id:$scope.record.parentId,
                            code:$scope.typeCode,
                            name:$scope.record.parentIdNameref});
                    },1000);    
                }else{
                    $scope.parentId = $scope.record.parentId;
                    $scope.parentIdNameref = $scope.record.parentIdNameref;

                    $scope.record = {
                        "parentId":$scope.parentId,   
                        "parentIdNameref":$scope.parentIdNameref 
                    }; 
                }

                


               
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            recordFormat.format($scope.record,'.')
            $scope.record.id = $state.params.id

            if ($state.params.id) {
                    API.post('/res/booksClassify/updateClassify', $scope.record, success, error);
                } else {
                    API.post('/res/booksClassify/addClassify', $scope.record, success, error);
                }
        }

        validate();
    function validate(){
            
            jQuery('#bookclassadd_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    code: {
                        required: true
                    },
                    parentId: {
                        required: true
                    },
                    sort: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: '请输入名称'
                    },
                    code: {
                        required: '请输入编号'
                    },
                    parentId: {
                        required: '请选择上级分类'
                    },
                    sort: {
                        required: '请输入排序号'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }


    //选择分类    
    $scope.select_class = function(){
        console.log($scope.sorts);


        ngDialog.open({
                    template: 'template/module/librarymanage/book/bookclasspp.html',
                    controller: 'bookclassppController',
                    className: 'ngdialog-theme-green',
                    scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/librarymanage/book/bookclassppController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    ]);
                            });
                        }]}
                });

        }    


    }])