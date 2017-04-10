'use strict';

angular.module('app')
	.controller('resourceController', [ '$rootScope', '$scope', '$http','$timeout', '$state','toaster',
	                                function($rootScope, $scope, $http,$timeout, $state,toaster) {
	$scope.title = "教材版本添加";

	$scope.init = function(id){

		var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功
	                   $scope.record = result.data;	                  
	                   $scope.$apply();	                   
	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			$.ajax({
				url : '/res/textbookVersion/read/detail',
				data: {"id":id}
			}).then(callback);

	};


	if($state.params.id){  //编辑
	   $scope.init($state.params.id);
	   $scope.title = "教材版本编辑";	
	}


	$scope.submit = function(){
		    console.log('提交');	
        	console.log($scope.record);

        	var callback = function(result){
				console.log(result);
				if(result.httpCode ==200){//成功

						toaster.clear('*');
	                    toaster.pop('success', '', "保存成功");
	                    $timeout(function(){
	                        $state.go('main.res.resource.list');
	                    },2000);

	                }else{
	                  	toaster.clear('*');
	                    toaster.pop('error', '', result.msg);
	                }
	            
			};

			delete $scope.record.updateTime;
			delete $scope.record.createTime;

			$.ajax({
				url : $state.params.id?'/res/textbookVersion/update':'/res/textbookVersion/add',
				data: $scope.record
			}).then(callback);

	}

	//表单验证
        function validate(){
            jQuery('form').validate({
                rules: {
                	name: {
                        required: true
                    },
                    code: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写教材版本名称'
                    },
                    code: {
                        required: '请填写教材版本编号'
                    },
                    remark: {
                        required: '请添写教材版本简介'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }


        validate();

}])