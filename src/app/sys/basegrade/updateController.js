'use strict';

    angular.module('app')
        .controller('updateController', ['$scope', '$rootScope', '$state', '$timeout','toaster',
                                             function($scope, $rootScope, $state, $timeout,toaster) {
                                           	
        var title = "";

        if($state.includes('**.basegrade.update')){
            title="编辑年级";
            var id = $state.params.id;
            // console.log("id"+id);
            activate(id);
            validate(id);

        }else if($state.includes('**.basegrade.create')){
            title="添加年级";
            validate(null);
        }
        $scope.title = title;
        $scope.loading = true;
        //初始化验证
        //validate($scope);
        $scope.submit= function(){
            var m = $scope.record;
            $scope.record.createTime = null;
            $scope.record.updateTime = null;
    
            if(m){
                $scope.isDisabled = true;//提交disabled
                $.ajax({
    				url : $scope.record.id ? '/basegrade/update' : 'basegrade/add',
    				data: $scope.record
    			}).then(callback);
            }
            function callback(result) {
                if(result.httpCode ==200){//成功
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.sys.basegrade.list');
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
				url : '/basegrade/read/detail',
				data: {'id': id}
			}).then(function (result) {
                console.log("sswww"+result);
		        $scope.loading = false;
				if (result.httpCode == 200) {
					$scope.record = result.data;
				} else {
					$scope.msg = result.msg;
				}
				$scope.$apply();
			});
        }
        //获取类型
        function get_type(){
            $.ajax({
                url:'dic/read/key',
                data:{key:"GRADE_TYPE"}
            }).then(function (result) {
                // console.log("jjjsss"+result);
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.bType = result.data;
                        // console.log("ab"+result.data);
                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
            });
        }
        get_type();
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
                        required: '请填写部门名称',
                        maxLengthB:"部门名称不得超过{0}个字符"
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