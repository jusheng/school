'use strict';

angular.module('app')
    .controller('schoolYearController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster',
        function ($scope, $rootScope, $state, $timeout, toaster) {
            var title = "";
            // var defaultAva = $rootScope.defaultAvatar;
            // $scope.myImage='';
            // $scope.myCroppedImage=$scope.myCroppedImage ;
            $scope.myCroppedImage = '';
            if ($state.includes('**.schoolYear.update')) {
                title = "编辑学年";
                var id = $state.params.id;
                activate(id);
                validate(id);
            } else if ($state.includes('**.schoolYear.create')) {
                title = "添加学年";
                validate(null);
                // setTimeout(function(){
                //     $scope.myCroppedImage = defaultAva;
                //     !$rootScope.$$phase && $scope.$apply();
                // },300);
            }
            $scope.title = $rootScope.title = title;
            $scope.loading = true;

            $scope.permiss_record_arr = {};
            //初始化验证
            //validate($scope);
            $scope.submit = function () {
                var m = $scope.record;
                if (m) {
                    delete $scope.record.createTime;
                    delete $scope.record.updateTime;
                    $scope.record.startDate = new Date($scope.record.startDate);
                    $scope.record.endDate = new Date($scope.record.endDate);
                    $scope.isDisabled = true;//提交disabled
                    $.ajax({
                        url: $scope.record.id ? '/schoolYear/update' : '/schoolYear/add',
                        data: $scope.record
                    }).then(callback);
                }
                function callback(result) {
                    if (result.httpCode == 200) {//成功
                        toaster.clear('*');
                        toaster.pop('success', '', "保存成功");
                        $timeout(function () {
                            $state.go('main.edu.schoolYear.list');
                        }, 2000);
                    } else {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                        $scope.isDisabled = false;
                    }
                }
            }

            function get_menu() {

            }

            get_menu();


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
                    url: '/schoolYear/read/detail',
                    data: {'id': id}
                }).then(function (result) {
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
            function validate(userId) {
                jQuery('form').validate({
                    rules: {
                        deptName: {
                            required: true,
                            stringCheck: [],
                            maxLengthB: [20]
                        },
                        sortNo: {
                            required: true
                        }
                    },
                    messages: {
                        deptName: {
                            required: '请填写角色名称',
                            maxLengthB: "角色名称不得超过{0}个字符"
                        },
                        sortNo: {
                            required: '请填写排序'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                });
            }
            validate();

        }]);