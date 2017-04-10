'use strict';

angular.module('app')
    .controller('editController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,$compile) {

        
        $scope._simpleConfig1 = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source', 'Undo', 'Redo','Bold']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false
        }          




        $scope.title="修改评论";
        $scope.id = $scope.ngDialogData.id;


        $scope.callback = $scope.ngDialogData.callback;

        // 初始化 
        $scope.init = function(){
           
            var success = function(result){
                $scope.record = result.data; 
                $scope.$apply();  
                console.log($scope.record);
                
  
            }

            var error = function(result){
                console.log(result);
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/scl/bbs/read/followDetail',{"bbsId":$scope.id},success,error);
        }


        $scope.init();
        // 提交
        $scope.submit = function(){
           console.log($scope.record);

           var temp = {
                "bbsId":$scope.record.id,
                "content":$scope.record.content
           }

          
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
              
                $timeout(function(){
                    //$scope.closeThisDialog();
                    $scope.ngDialogData.callback();
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post('/scl/bbs/update/followMessage',temp,success,error);

        }


        $scope.complie = function(){



            if($(".ppue_lay").length==0){
                setTimeout(function(){
                     $scope.complie();
                },200);
               
            }else{
                console.log("complie");
                var pre = Math.floor(Math.random()*100 + 1);
                var last = Math.floor(Math.random()*100 + 1);
                jQuery(".ppue_lay").html('<div class="ueditor" id="'+pre+'content'+last+'" type="text" ng-model="record.content" config="_simpleConfig1"></div> ');    
                //$("#content").addClass("ueditor");
                var scope = angular.element($("#"+pre+"content"+last)[0]).scope();
                var link = $compile($("#"+pre+"content"+last)[0]);

                link(scope);

                console.log($scope);

            }
      }

     $scope.complie();
              
         // 验证
       function validate(){

            if(jQuery('#teacheradd_form').length==0){
                setTimeout(function(){
                     validate();       
                },200);

            }
                
            jQuery('#teacheradd_form').validate({
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
                    $scope.submit();
                }
            });
        }
         validate();


} ]);