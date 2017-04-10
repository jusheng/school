'use strict';

angular.module('app')
    .controller('userUpdateController', ['$scope', '$rootScope', '$state', '$timeout', 'toaster','API','ngDialog',
        function($scope, $rootScope, $state, $timeout, toaster,API,ngDialog) {

            var title = "";

            var defaultAva = $rootScope.defaultAvatar;
            $scope.myImage = '';
            // $scope.myCroppedImage=$scope.myCroppedImage ;
            $scope.myCroppedImage = '';
            

            $scope.create_select = function(obj) {
                var list = [];
                
                var inner = function(obj,s){
                       
                     var ico = s?s + "--":"|--"; 
                        

                    for (var i = 0; i < obj.length; i++) {
                            list.push({
                                "id": obj[i].id,
                                "text": obj[i].label,
                                "pid":obj[i].pid,
                                "ico":ico
                            });

                        obj[i].children && inner(obj[i].children,ico);    
                    }


                }
                inner(obj);
                console.log(list);
                return list;

            }

            $scope.get_dept = function() {

                $.ajax({
                    url: 'dept/read/tree'
                }).then(function(result) {
                    console.log(result);
                    if (result && result.httpCode == 200) { //成功
                        
                        $scope.dept = $scope.create_select(result.data);
                        $scope.all_dept = {
                            "data":$scope.dept
                        }
                        if ($state.includes('**.user.update')) {
                            title = "编辑用户";
                            var id = $state.params.id;
                            activate(id);
                            validate(id);
                        } else if ($state.includes('**.user.create')) {
                            title = "添加用户";
                            validate();
                            setTimeout(function() {
                                $scope.myCroppedImage = defaultAva;
                                !$rootScope.$$phase && $scope.$apply();
                            }, 300);

                        }
                        $scope.title = $rootScope.title = title;
                        $scope.loading = true;




                        $scope.$apply();
                    } else {
                        //toaster.clear('*');
                        //toaster.pop('error', '', result.msg);
                    }
                });
            };

            $scope.get_dept();

            //获取类型
        function get_type(){
            $.ajax({
                url:'dic/read/key',
                data:{key:"USERTYPE"}
            }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.yType = result.data;
                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
            });
        }
        get_type();

            //初始化验证
            //validate($scope);
            $scope.submit = function() {
               
                saveData();

            };

            function saveData() {
                var m = $scope.record;
                if (m) {
                    $scope.isDisabled = true; //提交disabled
                    $.ajax({
                        url: $scope.record.id ? '/user/update' : 'user/add',
                        //data: {filename:$scope.myCroppedImage}
                        data: $scope.record
                    }).then(callback);
                }

                function callback(result) {
                    if (result.httpCode == 200) { //成功
                        toaster.clear('*');
                        toaster.pop('success', '', "保存成功");
                        $timeout(function() {
                            $state.go('main.sys.user.list');
                        }, 2000);
                    } else {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                        $scope.isDisabled = false;
                    }
                }
            }

            var handleFileSelect = function(evt) {
                console.log('上传图片');
                var file = evt.currentTarget.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    return false;
                }
                var reader = new FileReader();
                reader.onload = function(evt) {
                    //console.log(evt.target.result);
                    $scope.$apply(function($scope) {
                        $scope.myImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

             //上传头像
            $scope.uploadImg = function(){
                var success = function(result){
                    console.log(result);
                    $scope.record.pic = result.data[0].id;
                    $scope.record.imgUrl = result.data[0].imgUrl;

                    toaster.clear('*');
                    toaster.pop('success', '', "图片上传成功!");
                    $scope.$apply();
                };
                var error = function(){

                }


                API.post("/upload/fileBase64",{"imgs":$scope.myCroppedImage},success,error);
            }


            var create_dept = function(id){
                for (var i = 0; i < $scope.dept.length; i++) {
                    if($scope.dept[i].id==id){
                        $scope.record.deptName = $scope.dept[i].text;
                        break;
                    }
                }
            }

            // 初始化页面
            function activate(id) {
                $scope.loading = true;
                $.ajax({
                    url: '/user/read/detail',
                    data: {
                        'id': id
                    }
                }).then(function(result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.record = result.data;
                        $scope.record.imgUrl !="" && ($scope.myCroppedImage = $scope.record.imgUrl);

                        create_dept($scope.record.deptId);

                    } else {
                        $scope.msg = result.msg;
                    }
                    $scope.$apply();
                   /* $timeout(function() {
                        $scope.myCroppedImage = $scope.record.avatar || defaultAva; //初始化 预览图
                        $scope.record.avatar = null;
                    }, 300);*/
                });
            }

            //表单验证
            function validate(userId) {
                //notEqual 规则
                $.validator.addMethod('notEqual', function(value, ele) {
                    return value != this.settings.rules[ele.name].notEqual;
                });
                jQuery.validator.addMethod("isMobile", function(value, element) {
                    var length = value.length;
                    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
                    return this.optional(element) || (length == 11 && mobile.test(value));
                }, "请正确填写您的手机号码");

                jQuery('form').validate({
                    rules: {
                        account: {
                            required: true,
                            //stringCheck:[],
                            // maxLengthB:[10]
                            //isExist:['/user/checkName',userId]
                        },
                        userName: {
                            required: true
                        },
                        phone: {
                            required: true,
                            isMobile: true
                        },
                        password: {
                            maxlength: 16
                        },
                        userType: {
                            required: true
                        },
                        deptId: {
                            required: true
                        },
                        confirmPassword: {
                            // required: true,
                            maxlength: 16,
                            equalTo: "#password"
                        }
                    },
                    messages: {
                        account: {
                            required: '请填写帐号',
                            maxLengthB: "帐号不得超过{0}个字符"
                                //isExist:"该帐号已存在"
                        },
                        userName: {
                            required: '请填写用户名'
                        },
                        phone: {
                            required: '请填写联系方式',
                            isMobile: '请正确填写您的手机号码'
                        },
                        password: {
                            //required: '请填写密码',
                            maxlength: '密码长度不可大于16位'
                        },
                        confirmPassword: {
                            //required: '请填写确认密码',
                            maxlength: '密码长度不可大于16位',
                            equalTo: '两次输入的密码不相符'
                        },
                        userType: {
                            required: '请选择用户类型'
                        },
                        deptId: {
                            required: '请选择部门'
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

        $scope.select_dept = function(){

            ngDialog.open({
                    template: 'src/app/sys/user/select.html',
                    controller: 'selectController',
                    className: 'ngdialog-theme-green',
                    scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/user/selectController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    ]);
                            });
                        }]}
                });
        }   


        $scope.setParentId = function(id,name){
            

            if($scope.record){
                $scope.record.deptId=id;
                $scope.record.deptName=name;
            }else{
                $scope.record = {
                    "deptId":id,
                    "deptName":name
                }
            }
        }



}]);