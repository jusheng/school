'use strict';

angular.module('app')
	.controller('threaddetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {
          
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
    
          
        $scope.init=function(){
            var success = function(result){
                $scope.record = result.data;
                // alert(1);
                console.log($scope.record);
                $scope.followlist();
                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/bbs/read/detail",{"id":$state.params.id},success,error);
            
        }

        $scope.init();
        $scope.param = {
          "followBbsId":$state.params.id
        }

        $scope.followlist=function(){
            var success = function(result){
                $scope.pageInfo = result.data;
                console.log($scope.pageInfo);
                

                $scope.$apply();
                
              }  
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
              }
              
            API.post("/scl/bbs/read/followDetailList",$scope.param,success,error);
            
       }


       $scope.pagination = function (obj) {
        
          $scope.param.pageNum=obj.page;
          $scope.followlist();
      };





       // 跳转到回复
      $scope.tiaozhuan = function(){
          document.getElementById("divId").scrollIntoView();  
      }


       $scope.reply=function(){
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
              
            API.post("/scl/bbs/add/followMessage",{"bbsId":$state.params.id,"content":$scope.record.content},success,error);
       }
       
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

   
            jQuery('#add_comment').validate({
                rules: {

                    content_temp: {
                        required: true
                    },
                   
                },
                messages: {
                    
                    content_temp: {
                        required: '请填写评论内容'
                    }
                },
                submitHandler: function() {
                    $scope.reply();
                }
            });
        }
         validate();


        $scope.height = function(){
           return angular.element("#ue_lay").height();
        } 


} ]);