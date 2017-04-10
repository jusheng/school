'use strict';

angular.module('app')
    .controller('drafteditController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {
        //内容编辑框的样式
       $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source','undo','redo','bold','italic','underline','fontsize','fontfamily', 'justifyleft', 
        'justifyright', 
        'justifycenter', 
        'justifyjustify', 'insertimage']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                "imageActionName": "uploadimage", /* 执行上传图片的action名称 */  
                "imageFieldName": "upfile", /* 提交的图片表单名称 */  
                "imageMaxSize": 2048000, /* 上传大小限制，单位B */  
                "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */  
                "imageCompressEnable": true, /* 是否压缩图片,默认是true */  
                "imageCompressBorder": 1600, /* 图片压缩最长边限制 */  
                "imageInsertAlign": "none", /* 插入的图片浮动方式 */  
          }


        $scope.init = function(id){
            var success=function(result){
                
                $scope.record = result.data[0].bbs_Info;
                console.log($scope.record);
                $scope.$apply();
                
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/scl/bbs/read/detail",{"id":id},success,error);
        }

        if($state.params.id){
            $scope.title = "修改草稿";
            $scope.init($state.params.id);
        }else{
            $scope.title = "发布新帖";
            $scope.record = {
                "sectorId":$state.params.id,
            };
        }

    



        $scope.sign = false; 

        $scope.set_sign = function(s){

               $scope.sign = s;    
        }


        $scope.hold = function(callback){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");

                console.log(result);

                if(callback){
                    callback(result.data.id);
                }else{
                    $timeout(function(){
                        $state.go('main.scl_bbs.draftlist');
                    },500);
                }
               
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            recordFormat.format($scope.record,'.');

            var temp = {
                bbsId:$scope.record.id,
                title:$scope.record.title,
                content:$scope.record.content
            }

            API.post('/scl/bbs/update',temp,success,error);
        }


         $scope.submit = function(){


           var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");

        
                $timeout(function(){
                    $state.go('main.scl_bbs.threadlist',{"id":0});
                },1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

               
            API.post('/scl/bbs/publish',{"bbsId":$scope.record.id},success,error);
           
            


       }
        
       //获取版块
       $scope.get_class = function(){

        var success = function(result){
            $scope.activityclass = result.data;
            $scope.$apply();
            // console.log($scope.activityclass);
        }
        var error = function(result){

        }

        API.post('/scl/bbs/plate/read/list',{},success,error);
       }
       $scope.get_class();

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
                        $scope.record.imgUrl = response.data.data[0].imgUrl;

                    })

                })
                
          };



       validate();

       function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                    title: {
                        required: true
                    },
                    sortsId: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                    title: {
                        required: '请填写标题'
                    },
                    sortsId: {
                        required: '请选择所属版块'
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

} ]);

