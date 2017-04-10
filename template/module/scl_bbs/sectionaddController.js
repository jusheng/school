'use strict';

angular.module('app')
	.controller('sectionaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
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
      
        //$scope.line = [{}];
 
        $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 

                $scope.moderatorList = JSON.parse(JSON.stringify($scope.record.moderatorList));


                if($scope.record.moderatorList.length > 0){
                
                    $scope.moderatorIds = "1";
                }else{
                    
                    $scope.moderatorIds = "";
                }

                $scope.$apply();         
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


            API.post("/scl/bbs/plate/read/detail",{"sectorId":id},success,error);

        }  



        if($state.params.id){
            $scope.title = "修改版块";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加版块";
            $scope.moderatorList = [];
            $scope.moderatorIds = "";
            $scope.record = {
                //"moderatorList":{}
                
            };
        }

	
	   $scope.submit = function(){
            $scope.record.moderatorIdStr="";

            for (var i = 0; i < $scope.moderatorList.length; i++) {           
                    $scope.record.moderatorIdStr+=$scope.moderatorList[i].eduUserId+",";
                };
            delete $scope.record.moderatorList;




	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $scope.$emit('sectionchage',"");
                $timeout(function(){
                    $state.go('main.scl_bbs.section');
                },2000);

	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}


            recordFormat.format($scope.record,'.');
            
            if($state.params.id){
                API.post('/scl/bbs/plate/update',$scope.record,success,error);

            }else{
               
                API.post('/scl/bbs/plate/add',$scope.record,success,error);
            }

	   }
       // //获取人员列表
       // $scope.get_class = function(){

       //      var success = function(result){
       //          $scope.peopleNames = result.data;
       //          $scope.$apply();
       //          console.log($scope.peopleNames);
       //      }
       //      var error = function(result){

       //      }

       //      API.post('/edu/teacher/read/all',{},success,error);
       // }
       // $scope.get_class();

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

	   function validate(){
	   	//console.log('form:'+jQuery('form').length);
            jQuery('#newsadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    moderatorIds: {
                        required: true
                    },
                },
                messages: {
                	title: {
                        required: '请填写标题'
                    },
                    moderatorIds: {
                        required: '请选择版主'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();


       $scope.del = function(index){
            $scope.moderatorList.splice(index,1);

            if($scope.moderatorList.length > 0){
                
                $scope.moderatorIds = "1";
            }else{
                
                $scope.moderatorIds = "";
            }

       } 

         //弹出成员选择框  
       $scope.open_pp = function(){
            ngDialog.open({
                    template: 'template/module/scl_bbs/user.html',
                    controller: 'userController',
                    scope:$scope,
                    className: 'ngdialog-theme-green',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/scl_bbs/userController.js');
                        }]}
                });
       }

} ]);