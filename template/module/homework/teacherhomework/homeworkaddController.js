'use strict';

angular.module('app')
	.controller('homeworkaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','recordFormat','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,recordFormat,$compile) {

       $scope.set_curr(1);

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
                "initialFrameHeight":300
          }
       
                                            
       
       $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data;
                $scope.$apply();
            }   

            var error = function(){

            }

            API.post("/homework/read/detail",{"id":id},success,error);
       }

       if(!$state.params.id){
            $scope.record = {
                        "homeworkType":0,
                        "subject":{
                            "id":0
                        } 
                   } 
            $scope.title = "添加课后作业";       

       }else{
          $scope.init($state.params.id);
          $scope.title = "编辑课后作业";

       }
       
       $scope.get_subjects = function(){
            
            var success = function(result){
                console.log(result);
                $scope.subjects = result.data;

                if($scope.subjects.length>0){
                    $scope.record.subject.id = $scope.subjects[0].id;
                }

                $scope.$apply();    
                
            };
            var error = function(){

            }

            API.post("/edu/teacher/getTeacherSubject",{},success,error);
       }

       $scope.get_subjects();

       $scope.select_km = function(id){
            $scope.record.subject.id = id;
       }


       $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "操作成功");

                $timeout(function(){
                    $state.go("main.teacherhomework.list");
                },200);
                
            };
            
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            $scope.record.subject = {
                "id":$scope.record.subject.id
            }
            recordFormat.format($scope.record,'.');


            if(!$state.params.id){
                API.post("/homework/add",$scope.record,success,error);
            }else{

                API.post("/homework/update",$scope.record,success,error);
            }

       }                                

	
	   function validate(){
	   	//console.log('form:'+jQuery('form').length);
            jQuery('#homewordadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    km: {
                        required: true
                    }

                },
                messages: {
                	title: {
                        required: '请填写作业名称'
                    },
                    km: {
                        required: '请选择科目'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();
	                                	
}])	                                	