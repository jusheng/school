'use strict';

angular.module('app')
    .controller('threadaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
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
            $scope.title = "修改帖子";
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

             
            API.post('/scl/bbs/add',$scope.record,success,error);
        }


         $scope.submit = function(){

            var callback = function(id){
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

                recordFormat.format($scope.record,'.');

               /* 
                if(id){ 
                    API.post('/bbs/update',$scope.record,success,error);

                }else{*/
                    API.post('/scl/bbs/publish',{"bbsId":id},success,error);
                //}


            }


            if(!$scope.sign){
                $scope.hold();
            }else{
                $scope.hold(callback);
            }

            


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
                        $scope.record.imgurl = response.data.data[0].imgUrl;

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

