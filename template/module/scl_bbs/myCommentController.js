'use strict';

angular.module('app')
	.controller('myCommentController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
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


          // 初始化
      $scope.init=function(){
            var success = function(result){
                $scope.pageInfo = result.data;
                console.log($scope.pageInfo);
                

                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/bbs/read/myBbsList",{"id":$state.params.id},success,error);
       }

       $scope.init();

      

       
       // 删除
       $scope.del=function(id){
            var success = function(){

                   
                $scope.$apply();
                $timeout(function(){
                    $scope.init();
                },200);  
                 
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/bbs/del/followMessage",{"bbsId":id},success,error);
       }

       // 删除确认
        $scope.op_confrim = function(id){
              console.log(id);
              ngDialog.open({
               template:'template/module/edu/activity/confirm.html',
               controller: 'activityconfirmController',
               className: 'ngdialog-theme-green',
               data:{
                 "id":id,
                 "callback":$scope.del
               },
               resolve: {
                                  deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                                   return uiLoad.load('template/module/edu/activity/activityconfirmController.js').then(function(){
                                     return $ocLazyLoad.load('toaster');
                                   });
                              }]}
              })


     }
       //弹出框
      $scope.op_edit = function(id){
        console.log(id);
        ngDialog.open({
          template:'template/module/scl_bbs/edit.html',
          controller: 'editController',
          className: 'ngdialog-theme-green',
          data:{
            "id":id,
            // "activityId":$scope.param.classId,
            "callback":$scope.init
          },
          resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                          return uiLoad.load('template/module/scl_bbs/editController.js').then(function(){
                            return $ocLazyLoad.load('toaster');
                          });
                     }]}
              })
          }

          // 验证
       function validate(){

            if(jQuery('#add_comment').length==0){
                setTimeout(function(){
                    validate();
                },200);

            }

            jQuery('#add_comment').validate({
                rules: {

                    content: {
                        required: true
                    },
                   
                },
                messages: {
                    
                    content: {
                        required: '请填写评论内容'
                    }
                },
                submitHandler: function() {
                    $scope.reply();
                }
            });
        }
         validate();


} ]);