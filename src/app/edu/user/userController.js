'use strict';

angular.module('app')
    .controller('userController', ['$rootScope', '$scope', '$timeout', '$http', '$state', 'toaster', 'API',
        function($rootScope, $scope, $timeout, $http, $state, toaster, API) {
            $scope.loading = false;

            $scope.school_id = $state.params.school_id;
            $scope.name = $state.params.name;


            $scope.create_select = function(obj) {
                var list = [];
                
                var inner = function(obj,curr_id,s,pre){
                       
                     var ico = s?s + "--":"|--"; 
                        

                    for (var i = 0; i < obj.length; i++) {


                            //当前部门以及下属部门不允许选择
                            //var select = pre ? (($scope.record.id==obj[i].id || $scope.record.parentId==obj[i].pid || (pre.disabled && pre.id==obj[i].pid))?true:false):false;
                            
                            if ($state.params.user_id) {
                                //var pre_id  = curr_id || $scope.record.id;
                                //var select = pre ? ((pre_id ==obj[i].pid || pre_id ==obj[i].id)?true:false):false;
                               var select = false;
                            }else{
                                var select = false;
                            }

                            list.push({
                                "id": obj[i].id,
                                "text": obj[i].label,
                                "pid":obj[i].pid,
                                "ico":ico,
                                "disabled":select
                            });

                            if(select){
                                var t = obj[i].id;
                            }else{
                                var t = "";
                            }

                        obj[i].children && inner(obj[i].children,t,ico,obj[i]);    
                    }
                }
                inner(obj);
               console.log(list);
                return list;
            }


            //上级部门列表 （不带分页）
            $scope.get_all_dept = function() {

                var success = function(result) {

                    $scope.schooldept = $scope.create_select(result.data);

                    $scope.$apply();
                };
                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };

                API.post('/schoolDept/read/tree', {
                    "schoolId": $scope.school_id
                }, success, error);


            }
            $scope.get_all_dept();


            //学校角色列表 (不要分页的)
            $scope.get_all_role = function(id) {

                var success = function(result) {

                    $scope.role = result.data;
                    $scope.$apply();
                };
                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };
                API.post('/edu/read/getlist', {
                    "schoolId": $state.params.school_id
                }, success, error);
            };

            //$scope.get_all_role();


            //编辑页初始化数据	
            $scope.init = function(id) {

                var success = function(result) {
                    $scope.record = result.data;
                    $scope.record.imgUrl !="" && ($scope.myCroppedImage = $scope.record.imgUrl);
                    $scope.$apply();
                };
                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                };

                API.post('/eduteacher/read/detail', {
                    "id": $state.params.user_id
                }, success, error);

            };



            if ($state.params.user_id) {
                $scope.title = $scope.name + " > 编辑教务人员";

                $scope.init($state.params.user_id);

            } else {
                $scope.title = $scope.name + " > 添加教务人员";

                $scope.record = {
                        "schoolId": $scope.school_id
                    }
                    //$scope.get_all_dept();     
            }



            //添加手机号自动生成登录用户名
            $scope.copy_accent = function(){
               
                $scope.record.account = $scope.record.tel;
               
            }



            $scope.submit = function() {

                    delete $scope.record.updateTime;
                    delete $scope.record.createTime;
                    delete $scope.record.school;
                    delete $scope.record.sList;
                    delete $scope.record.roleIds;

                    var success = function(result) {
                        toaster.clear('*');
                        toaster.pop('success', '', "保存成功");
                        $timeout(function() {
                            $state.go('main.edu.user.userlist', {
                                "school_id": $scope.school_id,
                                "name": $scope.name
                            });
                        }, 2000);
                    };

                    var error = function(result) {
                        toaster.clear('*');
                        toaster.pop('error', '', result.msg);
                    };
                    var url = $state.params.user_id ? '/eduteacher/update' : '/eduteacher/add';
                    API.post(url, $scope.record, success, error);

                }


        $scope.myImage = '';
        // $scope.myCroppedImage=$scope.myCroppedImage ;
        $scope.myCroppedImage = '';

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




                //表单验证
            function validate() {
                jQuery('form').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        age: {
                            required: true
                        },
                        sex: {
                            required: true
                        },
                        idCard: {
                            required: true
                        },
                        tel: {
                            required: true
                        },
                        code: {
                            required: true
                        },
                        email: {
                            required: true
                        },
                        deptId: {
                            required: true
                        },
                        roleId: {
                            required: true
                        },
                        address: {
                            required: true
                        },
                        remark: {
                            required: true
                        }
                    },
                    messages: {
                        name: {
                            required: "请添写姓名"
                        },
                        age: {
                            required: "请添写年龄"
                        },
                        sex: {
                            required: "请选择性别"
                        },
                        idCard: {
                            required: "请添写身份证号"
                        },
                        tel: {
                            required: "请添写电话"
                        },
                        code: {
                            required: "请添写工号"
                        },
                        email: {
                            required: "请添写邮箱"
                        },
                        deptId: {
                            required: "请选择所属部门"
                        },
                        roleId: {
                            required: "请选择角色"
                        },
                        address: {
                            required: "请添写详细地址"
                        },
                        remark: {
                            required: "请添写简介"
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();



        }
    ])