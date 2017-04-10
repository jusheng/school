'use strict';
angular.module('app')
	.controller('noticeaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {
		//内容编辑框的样式
	   $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source', 'Undo', 'Redo','Bold','test']],
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
     

        $scope.fType = [
                    {
                        "id":1,
                        "name":"学生"
                    },
                    {
                        "id":2,
                        "name":"老师"
                    },
                    {
                        "id":0,
                        "name":"全部"
                    }
            ]
        $scope.init = function(id){
        	var success=function(result){
        		$scope.record = result.data;
        		$scope.$apply();
        	}
        	var error = function(result){
        		toaster.clear('*');
        		toaster.pop('error','',result.msg);
        	}
        	API.post("/scl/affiche/read/detail",{"id":id},success,error);
        }
        // $scope.record={
        //     "id":$state.params.id,
        // }
        
            
        if($state.params.id){
            $scope.title = "修改公告";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加公告";
            $scope.record = {
                status:1
            };
        }

         $scope.submit = function(){

	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.notice.noticelist');
                },2000);
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            delete $scope.record.publishTime;
            // $scope.record.publishTime = new Date($scope.record.publishTime);
            
            // recordFormat.format($scope.record,'.');

            if($state.params.id){
                console.log($scope.record);
                API.post('/scl/affiche/update',$scope.record,success,error);

            }else{
                API.post('/scl/affiche/add',$scope.record,success,error);
            }
	   }


	   validate();

	   function validate(){
            jQuery('#noticeadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    status: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    remark: {
                        required: false
                    },
                    context: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请填写标题'
                    },
                    status: {
                        required: '请填写发布状态'
                    },
                    type: {
                        required: '请填写发布类型'
                    },
                    remark: {
                        required: '请填写简介'
                    },
                    context: {
                        required: '请填写内容'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

} ]);