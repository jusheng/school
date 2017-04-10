'use strict';

angular.module('app')
	.controller('newsaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
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
                "initialFrameHeight":300
          }



        $scope.init = function(id){
        	var success=function(result){
        		$scope.record = result.data;

        		$scope.$apply();
        	}
        	var error = function(result){
        		toaster.clear('*');
        		toaster.pop('error','',result.msg);
        	}
        	API.post("scl/news/read/detail",{"id":id},success,error);
        }

        if($state.params.id){
            $scope.title = "修改新闻";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加新闻";
            $scope.record = {};
        }

         $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.news.newslist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            recordFormat.format($scope.record,'.');

            if($state.params.id){

                API.post('/scl/news/update',$scope.record,success,error);

            }else{
                API.post('/scl/news/add',$scope.record,success,error);
            }

	   }
       //获取新闻分类id
       $scope.get_class = function(){

        var success = function(result){
            $scope.newsclass = result.data;
            $scope.$apply();
            console.log($scope.newsclass);
        }
        var error = function(result){

        }

        API.post('scl/newssorts/read/list',{},success,error);
       }
       $scope.get_class();

       // 图片上传
       $scope.upload_img = function(base64){
            
            var success = function(result){
                $scope.record.pic = result.data[0].id;
                $scope.record.imgUrl = result.data[0].imgUrl;
                toaster.clear('*');
                toaster.pop('success', '', "图片上传成功");
            }
            var error = function(result){

            }

           API.post("/upload/fileBase64",{"imgs":base64},success,error);

       }
  


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