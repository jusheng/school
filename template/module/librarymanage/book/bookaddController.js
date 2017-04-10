'use strict';

angular.module('app')
    .controller('bookaddController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {
        





        $scope.init = function (id) {
            var success = function (result) {
                $scope.record = result.data;
                $scope.$apply();
            }
            var error = function (result) {
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            API.post("/res/books/detail", {"id": id}, success, error);
        }

        $scope.get_class = function(){

            var success = function(result){
                $scope.sorts = result.data;
                $scope.$apply();
            };

            var error = function(){

            }   

            API.post("/res/booksClassify/list",{},success,error);
        }

        $scope.get_class();



        $scope.code = $state.params.code;

        if ($state.params.id) {
            $scope.app_name = "修改图书信息";
            $scope.init($state.params.id);
        } else {
            $scope.app_name = "添加图书";
            
            $scope.record = {
                //从列表页 添加 按钮传过来的参数
                "typeCode":$state.params.sorts_id,   
                "typeCodeNameref":$state.params.name  
            };
        }

        $scope.$on("parent_send",function(e,data){
            console.log(data);
            $scope.record.typeCode = data.sorts_id;
            $scope.record.typeCodeNameref = data.name;
       })




        $("#isbn").focus();
        /*$scope.search = function () {
            $scope.s_all = 0;
            var success = function (result) {
                $scope.pageInfo = result.data;
                $scope.$apply();
            }

            var error = function (result) {
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/res/booksroom/pageList', $scope.param, success, error);

        }
        $scope.search();*/
        $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");


                if($state.params.id){
                    $timeout(function(){
                        $state.go('main.book.bookList',{
                            sorts_id:$scope.record.typeCode,
                            code:$scope.code,
                            name:$scope.record.typeCodeNameref
                        });
                       

                    },1000);                         
                }else{

                    $scope.typeCode = $scope.record.typeCode;
                    $scope.typeCodeNameref = $scope.record.typeCodeNameref;

                    $scope.record = {
                        "typeCode":$scope.typeCode,   
                        "typeCodeNameref":$scope.typeCodeNameref  
                    };

                }

            }


            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            delete $scope.record.school;
            $scope.record.id = $state.params.id

            if ($state.params.id) {
                    API.post('/res/books/updateBook', $scope.record, success, error);

                } else {
                    API.post('/res/books/addBook', $scope.record, success, error);
                }

        }

        // 图片上传
        var upload_type1 = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/gif"
        ];
        // 附件上传
        $scope.onFileSelect = function(files){
                console.log(files.length);

                angular.forEach(files,function(file){

                    console.log(file);
                    if(upload_type1.join(",").indexOf(file.type)<0){
                        toaster.clear('*');
                        toaster.pop('error', '', "只允许上传图片类型文件");
                        return false;
                    }

                    file.upload = Upload.upload({
                        "url":"/upload/file",
                        "data":{file:file},
                        "headers":{'Content-Type':'multipart/form-data'}
                    });

                    file.upload.then(function(response){
                        console.log(response);

                        $scope.record.pic = response.data.data[0].id;
                        console.log($scope.record.pic);
                        $scope.record.cover = response.data.data[0].imgUrl;

                    })

                })
                
          };

    $scope.submit_form= function(){
        console.log(validator.form());
        if(validator.form()){
            $scope.submit();
        }
    }      
    

    var validator;      
    validate();
    function validate(){

            validator = jQuery('#bookadd_form').validate({
                rules: {
                    name: {
                        required: true
                    },
                    isbn: {
                        required: true
                    },
                    typeCode: {
                        required: true
                    },
                    totalNum: {
                        required: true
                    }
                    
                },
                messages: {
                    name: {
                        required: '请输入名称'
                    },
                    isbn: {
                        required: "请输入ISBN"
                    },
                    typeCode: {
                        required: "请选择分类"
                    },
                    totalNum: {
                        required: "请输入总数量"
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
     // 回车事件
    $scope.enterEvent = function(e) {

        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.queryThirdInfo();
        }

       e.preventDefault();
    }

    $scope.$watch("record.isbn",function(a,b){

        // console.log('new:'+a);
        // console.log('old:'+b);

        // console.log($scope.record.isbn);
        // if(a==b){
        //     console.log('数据不变了');
        //      if(!$scope.record.isbn){
        //         return false;
        //      }

        //     $scope.queryThirdInfo();
        // }

         // if(!$scope.record.isbn){
         //    return false;
         // }


/*
         if($scope.record.isbn!=""){
            $scope.queryThirdInfo();
         }*/


    })

    //查询第三方图书信息
    $scope.queryThirdInfo = function(){
        var success = function(result){
            $scope.record = result.data;
            $scope.$apply();
        }
        var error = function(result){
            console.log(result.msg);
            toaster.clear('*');
            toaster.pop('error', '', result.msg);
        }
        API.post('/res/books/thirdPartyInfo',$scope.record,success,error);
    }
}])