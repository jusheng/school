'use strict';

angular.module('app')
	.controller('planclassaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,$timeout) {


	   $scope.submit = function(){

	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.plan.planclass');
                },1000);

                $scope.$emit("addnewclass","ok");


	   		};
	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		};

           if($state.params.id){
               API.post("/oa/plan/updatePlanType",$scope.record,success,error);  
           }else{
               API.post("/oa/plan/addPlanType",$scope.record,success,error);
           }

	   }


       $scope.init = function(id){

            var success = function(result){
                console.log(result);
                $scope.record = result.data;
                $scope.$apply();
            };
            var error = function(result){

            };

            API.post("/oa/plan/read/PlanTypeDetail",{"id":id},success,error);

       } 


    if($state.params.id){
        $scope.init($state.params.id);
        $scope.title="编辑分类";    
    }else{
        $scope.title="添加分类";    
    }

	 function validate(){
            jQuery('#classadd').validate({
                rules: {
                	planType: {
                        required: true
                    }
                },
                messages: {
                	planType: {
                        required: '请填写分类'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();                               	


} ]);