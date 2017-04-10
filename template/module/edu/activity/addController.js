'use strict';

angular.module('app')
	.controller('addController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

        $scope.title="添加作品";
        $scope.record = {
                "activityId":$scope.ngDialogData.id,
                // "remark":$scope.s_remark,
                // "prize":$scope.s_prize,
                // "author":$scope.s_author,
                // "name":$scope.s_name
            };                                
        
        // 提交
        $scope.submit = function(){
           
            
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
              
                $timeout(function(){
                    $scope.closeThisDialog();
                    $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/scl/classics/add',$scope.record,success,error);

        }

      
        // 附件上传
        $scope.onFileSelect = function(files){
                console.log(files.length);

                angular.forEach(files,function(file){
                    file.upload = Upload.upload({
                        "url":"/upload/file",
                        "data":{file:file},
                        "headers":{'Content-Type':'multipart/form-data'}
                    });

                    file.upload.then(function(response){
                        console.log(response);

                        $scope.record.pic = response.data.data[0].id;
                        $scope.record.imgurl = response.data.data[0].imgUrl;

                    })

                })
                
          };

              

       function validate(){

            if(jQuery('#teacheradd_form').length==0){
                setTimeout(function(){
                    validate();
                },200);

            }

            jQuery('#teacheradd_form').validate({
                rules: {
                    title: {
                        required: true
                    },
                    sortsId: {
                        required: true
                    },
                    remark: {
                        required: true
                    },
                    author: {
                        required: true
                    },
                    sortNo: {
                        required: true
                    },
                    prize: {
                        required: true
                    },
                },
                messages: {
                    title: {
                        required: '请填写标题'
                    },
                    author: {
                        required: '请填写作者姓名'
                    },
                    num: {
                        required: '请填写作品序号'
                    },
                    prize: {
                        required: '请填写奖项'
                    },
                    sortNo: {
                        required: '请填写序号'
                    },
                    remark: {
                        required: '请填写简介'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }
         validate();

} ]);