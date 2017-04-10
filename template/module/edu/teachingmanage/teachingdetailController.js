'use strict';

angular.module('app')
	.controller('teachingdetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {
          
          $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false
          }
        $scope.init=function(){
            var success = function(result){
                $scope.record = result.data;
                // alert(1);
                console.log($scope.record);
                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/teaching/activity/read/detail",{"id":$state.params.id},success,error);
            
        }

        $scope.init();


      


        $scope.height = function(){
           return angular.element("#ue_lay").height();
        } 


} ]);