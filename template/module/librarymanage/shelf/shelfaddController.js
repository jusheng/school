'use strict';

angular.module('app')
    .controller('shelfaddController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster','recordFormat','API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster,recordFormat, API) {

            
            $scope.bookroom=$state.params.roomId;
            console.log($scope.bookroom);

            $scope.sorts = [];

            $scope.set_sorts = function(v){
                $scope.sorts = v;
            }

            $scope.myfilter = function(item){
              if($scope.record_temp.type){

                  for (var i = 0; i < $scope.record_temp.type.length; i++) {
                        if($scope.record_temp.type[i] == item.id){
                            return true;
                            break;
                        }
                    }  

                 
                 return false;

              }else{
                  return false;
              }
                
            }

            $scope.del = function(id){

                var index = 0;
                for (var i = 0; i < $scope.record_temp.type.length; i++) {
                    if($scope.record_temp.type[i]==id){
                        index = i;
                        break;
                    }
                }
                $scope.record_temp.type.splice(index,1);


                $scope.record.types = $scope.record_temp.type.join(',');
            }

            // $scope.$watch("record_temp.type",function(){
            //     console.log('dd');
            //     if($scope.record_temp.type != undefined){
            //       $scope.record.types = $scope.record_temp.type.join(',');  
            //     }
                
            // });


            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;

                    $scope.record_temp.type = $scope.record.types.split(",")
                    

                    for (var i = 0; i < $scope.record_temp.type.length; i++) {
                          //生成sorts
                            $scope.sorts.push({
                                id:$scope.record_temp.type[i]-0,
                                name:$scope.record.typeNames.split(",")[i]
                            });

                         $scope.record_temp.type[i] = $scope.record_temp.type[i]-0;
                    }                 

                   




                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/booksShelf/detailShelf",{"id":id}, success, error);
            }

             $scope.search = function () {
                var success = function (result) {
                    $scope.pageInfo = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/booksroom/list',{}, success, error);

            }
        $scope.record_temp = {};
        if ($state.params.id) {
            $scope.app_name = "修改书架信息";
            $scope.search();
            $scope.init($state.params.id);
        } else {
            $scope.record = {};
            
            $scope.record.library =  $scope.bookroom - 0;
            $scope.app_name = "添加书架";
            $scope.search();
        }

          
            
        $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.shelf.shelfList',{library:$scope.bookroom});
          

                },1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            // delete $scope.record.createTime;
            // delete $scope.record.updateTime;
            // delete $scope.record.school;
            recordFormat.format($scope.record,'.')
            //$scope.record.id = $state.params.id;

            var temp = [];
          
            for (var j = 0; j < $scope.record_temp.type.length; j++) {
                for (var i = 0; i < $scope.sorts.length; i++) {

                    if($scope.sorts[i].id == $scope.record_temp.type[j]){
                        temp.push($scope.sorts[i].name);
                    }


                }
            }

            $scope.record.typeNames = temp.join(',');
            $scope.record.types = $scope.record_temp.type.join(',');  
            

            console.log($scope.record);

            if ($state.params.id) {
                API.post('/res/booksShelf/updateShelf', $scope.record, success, error);

            } else {
                API.post('/res/booksShelf/addShelf', $scope.record, success, error);
            }

        }


    //弹出框选择分类
    $scope.select_type = function(id){
        ngDialog.open({
            template:'template/module/librarymanage/book/booktype.html',
            controller: 'booktypeController',
            className: 'ngdialog-theme-green',
            //data:{"id":$scope.bookroom},
            scope:$scope,
            resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/librarymanage/book/booktypeController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    'checklist-model',
                                    ]);
                            });
                    }]}
        })
    }


    validate();
    function validate(){

            
            jQuery('#teacheradd_form').validate({
                rules: {
                    number: {
                        required: true
                    },
                    types: {
                        required: true
                    }
                },
                messages: {
                    number: {
                        required: '请输入书架编号'
                    },
                    types: {
                        required: '请选择分类'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }





}])