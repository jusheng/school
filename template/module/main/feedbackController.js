'use strict';

angular.module('app')
	.controller('feedbackController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

        $scope.title="问题反馈";

        // 提交
        $scope.record={
            
        }
        $scope.submit = function(){
           
            
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
              
                $timeout(function(){
                    $scope.closeThisDialog();
                   
                },200);    
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
            console.log($scope.record);
            API.post('/edu/feedback/add',$scope.record,success,error);

        }


              
       function validate(){

            if(jQuery('#teacheradd_form').length==0){
                setTimeout(function(){
                    validate();
                },200);

            }

            jQuery('#teacheradd_form').validate({
                rules: {
                    remark: {
                        required: true
                    }
                    
                },
                messages: {
                    remark: {
                        required: '请填写宝贵建议'
                    }
                    
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }
        
        validate();

} ]);