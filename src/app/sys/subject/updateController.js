'use strict';

    angular.module('app')
        .controller('updateController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster',
                                             function($scope, $rootScope, $state, $timeout, toaster) {
                                          	
        var title = "";
        
        $scope.myCroppedImage = '';
        if($state.includes('**.subject.update')){
            title="编辑科目";
            var id = $state.params.id;
            activate(id);
            validate(id);
        }else if($state.includes('**.subject.create')){
            title="添加科目";
            validate(null);
            

        }
        
        //初始化验证
        //validate($scope);
        $scope.title = title;
        $scope.loading = true;

        $scope.submit= function(){
            var m = $scope.record;
            $scope.record.createTime = null;
            $scope.record.updateTime = null;
            if(m){
                $scope.isDisabled = true;//提交disabled
                $.ajax({
    				url : $scope.record.id ? '/subject/update' : 'subject/add',
    				data: $scope.record
    			}).then(callback);
            }
            function callback(result) {
                if(result.httpCode ==200){//成功
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.sys.subject.list');
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
				url : '/subject/read/detail',
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
                	basegradeName: {
                        required: true,
                        stringCheck:[],
                        maxLengthB:[20]
                    },
                    sortNo: {
                        required: true
                    }
                },
                messages: {
                	basegradeName: {
                        required: '请填写科目名称',
                        maxLengthB:"科目名称不得超过{0}个字符"
                    },
                    sortNo: {
                        required: '请填写排序'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

    }]);