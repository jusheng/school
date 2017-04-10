'use strict';

    angular.module('app')
        .controller('dicUpdateController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster','$stateParams',
                                             function($scope, $rootScope, $state, $timeout, toaster,$stateParams) {
        var title = "";

        console.log($stateParams.id);
        
        var defaultAva = $rootScope.defaultAvatar;
        $scope.myImage='';
        // $scope.myCroppedImage=$scope.myCroppedImage ;
        $scope.myCroppedImage = '';
        if($state.includes('**.dic.update')){
            title="编辑字典";
            var id = $state.params.id;
            activate(id);
            validate(id);

        }else if($state.includes('**.dic.create')){
            title="添加字典";
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
                delete $scope.record.updateTime;
                $scope.isDisabled = true;//提交disabled
                $.ajax({
    				url : $scope.record.id ? '/dicIndex/update' : 'dicIndex/add',
    				data: $scope.record
    			}).then(callback);
            }
            function callback(result) {
                if(result.httpCode ==200){//成功
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.sys.dic.list');
                    },2000);
                }else{
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                    $scope.isDisabled = false;
                }
            }
        }

        // var handleFileSelect=function(evt) {
        //     var file=evt.currentTarget.files[0];
        //     if(!/image\/\w+/.test(file.type)){
        //         return false;
        //     }
        //     var reader = new FileReader();
        //     reader.onload = function (evt) {
        //         $scope.$apply(function($scope){
        //             $scope.myImage=evt.target.result;
        //         });
        //     };
        //     reader.readAsDataURL(file);
        // };
        // angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


        // 初始化页面
        function activate(id) {
	        $scope.loading = true;
        	$.ajax({
				url : '/dicIndex/read/detail',
				data: {'id': id}
			}).then(function(result) {
                console.log(result);
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
                	name: {
                        required: true
                    },
                    key: {
                        required: true
                    },
                    catalogId: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写字典名称'
                    },
                    key: {
                        required: '请填写Key'
                    },
                    catalogId: {
                        required: '请填写CatalogId'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

    }]);