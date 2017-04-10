'use strict';

angular.module('app')
	.controller('newsclassaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API) {
		
	// $scope._simpleConfig = {
 //                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
 //                toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
 //                //focus时自动清空初始化时的内容
 //                //autoClearinitialContent:true,
 //                //关闭字数统计
 //                wordCount:false,
 //                //关闭elementPath
 //                elementPathEnabled:false
 //          }

         $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


            API.post("scl/newssorts/read/detail",{"id":id},success,error);

         }  

        if($state.params.id){
            $scope.title = "修改分类";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加分类";
        }
	
	   $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.news.newsclass');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}
            //delete $scope.record.createTime;
            //delete $scope.record.updateTime;
            if($state.params.id){
                API.post('/scl/newssorts/update',$scope.record,success,error);

            }else{
                API.post('/scl/newssorts/add',$scope.record,success,error);
            }

	   }

	   function validate(){
	   	//console.log('form:'+jQuery('form').length);
            jQuery('#news_form').validate({
                rules: {
                	title: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请填写标题'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();

} ]);