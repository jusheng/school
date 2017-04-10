'use strict';

    angular.module('app')
        .controller('schedulerUpdateController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster',
                                             function($scope, $rootScope, $state, $timeout, toaster) {
        var title = "";
        var defaultAva = $rootScope.defaultAvatar;
        $scope.myImage='';
        // $scope.myCroppedImage=$scope.myCroppedImage ;
        $scope.myCroppedImage = '';
        if($state.includes('**.scheduler.update')){
            title="编辑任务";
            var id = $state.params.id;
            activate(id);
            validate(id);
        }else if($state.includes('**.scheduler.create')){
            title="添加任务";
            validate(null);
            setTimeout(function(){
                $scope.myCroppedImage = defaultAva;
                !$rootScope.$$phase && $scope.$apply();
            },300);

        }
        $scope.title = $rootScope.title = title;
        $scope.loading = true;
        //初始化验证
        //validate($scope);
        $scope.submit= function(){
            var m = $scope.record;
            if(m){
                $scope.isDisabled = true;//提交disabled
                $.ajax({
    				url : $scope.record.id ? '/task/update/scheduler' : 'task/add/scheduler',
    				data: $scope.record
    			}).then(callback);
            }
            function callback(result) {
                if(result.httpCode ==200){//成功
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.task.scheduler.list');
                    },2000);
                }else{
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                    $scope.isDisabled = false;
                }
            }
        }

        // 初始化页面
        function activate(id) {
	        $scope.loading = true;
        	$.ajax({
				url : '/task/read/scheduler',
				data: {'id': id}
			}).then(function(result) {
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.record = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
        }

        //表单验证
        function validate(userId){
            jQuery('form').validate({
                rules: {
                	schedulerName: {
                        required: true
                    },
                    schedulerDesc: {
                        required: true
                    },
                    taskType: {
                        required: true
                    },
                    taskCron: {
                        required: true
                    }
                },
                messages: {
                	schedulerName: {
                        required: '请填写任务'
                    },
                    schedulerDesc: {
                        required: '请填描述'
                    },
                    taskType: {
                        required: '请填任务类型'
                    },
                    taskCron: {
                        required: '请填执行周期'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

    }]);