'use strict';

angular.module('app')
    .controller('activityaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
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


        Date.prototype.Format = function(fmt)   
            { //author: meizz   
              var o = {   
                "M+" : this.getMonth()+1,                 //月份   
                "d+" : this.getDate(),                    //日   
                "h+" : this.getHours(),                   //小时   
                "m+" : this.getMinutes(),                 //分   
                "s+" : this.getSeconds(),                 //秒   
                "q+" : Math.floor((this.getMonth()+3)/3), //季度   
                "S"  : this.getMilliseconds()             //毫秒   
              };   
              if(/(y+)/.test(fmt))   
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
              for(var k in o)   
                if(new RegExp("("+ k +")").test(fmt))   
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
              return fmt;   
            }    

        $scope.init = function(id){
            var success=function(result){
                result.data.starttime = new Date(result.data.starttime).Format("yyyy/MM/dd");
                result.data.endtime = new Date(result.data.endtime).Format("yyyy/MM/dd");
                
                $scope.record = result.data;
                console.log($scope.record);
                 var temp = $scope.record.starttime;
                $scope.$watch("record.starttime",function(){
           
                        if($scope.record.starttime==""){
                            return false;
                        }

                        (temp != $scope.record.starttime) && ($scope.record.endtime = "");

                        $scope.compile_endtime();    
                $scope.$apply();
                })
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/scl/activity/getListById",{"id":id},success,error);
        }

        if($state.params.id){
            $scope.title = "修改活动";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加活动";
            $scope.record = {};


            $scope.$watch("record.starttime",function(){
           
                    if($scope.record.starttime==""){
                        return false;
                    }

                    $scope.record.endtime = "";

                    $scope.compile_endtime();
           })

        }

         $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.activity.activitylist');
                },1000);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            recordFormat.format($scope.record,'.');

            if($state.params.id){

                API.post('/scl/activity/update',$scope.record,success,error);

            }else{
                console.log($scope.record);
                API.post('/scl/activity/add',$scope.record,success,error);
            }

       }
        
        //重新编译endTime input
       $scope.compile_endtime = function(){
            angular.element('.endtime_lay').html("<input id=\"cycle-day-date\" type=\"text\" class=\"form-control endtime\" placeholder=\"截止日期\"  value=\"\" date-picker datefmt='yyyy/MM/dd' min-date=\""+$scope.record.starttime+"\" ng-model=\"record.endtime\">");
            
            var scope = angular.element($('.endtime_lay')[0]).scope();
            var link = $compile($('.endtime_lay')[0]);

            link(scope);
       }
       // $scope.compile_endtime();


       //获取活动分类
       $scope.get_class = function(){

        var success = function(result){
            $scope.activityclass = result.data;
            $scope.$apply();
            // console.log($scope.activityclass);
        }
        var error = function(result){

        }

        API.post('/scl/catalog/getListOfCatalog',{},success,error);
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
                        required: '请选择所属分类'
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

