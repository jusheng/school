'use strict';

angular.module('app')
	.controller('noteaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,$compile) {
		  
                                      
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
                elementPathEnabled:false
          }
    



         $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


            API.post("reminder/read/detail",{"id":id},success,error);

         }  

        if($state.params.id){
            $scope.title = "修改备忘";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加备忘";

            $scope.record = {
                "isRemind":0
            }
        }
	
	   $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.note.notelist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

           $scope.record && ($scope.record["type"] = 1);

            $scope.record && (delete $scope.record.createTime);
            $scope.record && (delete $scope.record.updateTime);

            if($state.params.id){
                API.post('/reminder/update',$scope.record,success,error);

            }else{
                API.post('/reminder/add',$scope.record,success,error);
            }

	   }

	   function validate(){
        console.log($('#noteadd').length);
            jQuery('#noteadd').validate({
                rules: {
                	title: {
                        required: true
                    },
                    remindTime: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请填写标题'
                    },
                    remindTime: {
                        required: '请填写时间'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();
      
        


} ])
    