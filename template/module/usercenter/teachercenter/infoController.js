'use strict';

angular.module('app')
	.controller('infoController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {

	 //用户信息
       	$scope.get_profile = function(){

       		var success = function(result){
       			$scope.record = result.data[0];
                $scope.record.pic != "" && ($scope.myCroppedImage = $scope.record.imgUrl);
       			$scope.$apply();

       			$scope.get_all_dept($scope.record.schoolId);



       		}

       		var error = function(){

       		}



       		API.post("/user/read/userDetail",{},success,error);

       	}

       	$scope.get_profile();



       	 //上级部门
       $scope.create_select = function(obj) {
                var list = [];
                
                var inner = function(obj,curr_id,s,pre){
                       
                     var ico = s?s + "--":"|--"; 
                        

                    for (var i = 0; i < obj.length; i++) {


                            //当前部门以及下属部门不允许选择
                            //var select = pre ? (($scope.record.id==obj[i].id || $scope.record.parentId==obj[i].pid || (pre.disabled && pre.id==obj[i].pid))?true:false):false;
                            
                            if ($state.params.dept_id) {
                                var pre_id  = curr_id || $scope.record.id;
                                var select = pre ? ((pre_id ==obj[i].pid || pre_id ==obj[i].id)?true:false):false;
                              
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
               // console.log(list);
                return list;
            }
       

       $scope.appstyle = function(){
            console.log(angular.element('#deptId').find("option").length);

            var obj = angular.element('#deptId').find("option");
            for (var i = 0; i < $scope.schooldept.length; i++) {
                if($scope.schooldept[i].ico=="|--" || $scope.schooldept[i].ico=="|----"){
                    obj[i+1].style.fontWeight = "bold";
                }
            }
       }
            

        //上级部门列表 （不带分页）
        $scope.get_all_dept = function(schoolId) {

            var success = function(msg) {
                $scope.schooldept = $scope.create_select(msg.data);
                $scope.$apply();
                $scope.appstyle();
            };
            var error = function(msg) {
                toaster.clear('*');
                toaster.pop('error', '', msg.msg);
            }

            API.post('/schoolDept/read/tree', {
                "schoolId": schoolId
            }, success, error);

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

        $scope.submit = function(){

            var success = function(result){
                console.log(result);
                toaster.clear('*');
                toaster.pop('success', '', "保存成功!");
                $scope.user_data.imgUrl = $scope.record.imgUrl;
               
                $timeout(function(){
                    $state.go('main.teachercenter.index');
                },1000)
            };
            
            var error = function(){

            }

            recordFormat.format($scope.record);


            API.post("/user/update/userDetail",$scope.record,success,error);
        }

              //表单验证
            function validate() {

                jQuery.validator.addMethod("isMobile", function(value, element) { 
                  var length = value.length; 
                  var mobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|170)\d{8}$/; 
                  return this.optional(element) || (length == 11 && mobile.test(value)); 
                }, "请正确填写您的手机号码"); 

                jQuery('#infoedit').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        //age: {
                        //    required: true,
                        //    number:true
                        //},
                        //sex: {
                         //   required: true
                       // },
                        //idCard: {
                        //    required: true
                        //},
                        tel: {
                            required: true,
                            isMobile:true
                        },
                        code: {
                            required: true
                        },
                        //email: {
                        //    required: true,
                        //    email:true
                        //},
                        deptId: {
                            required: true
                        },
                       /* roleId: {
                            required: true
                        },*/
                        //address: {
                        //    required: true
                        //},
                        //remark: {
                        //    required: true
                        //}
                    },
                    messages: {
                        name: {
                            required: "请添写姓名"
                        },
                        //age: {
                        //    required: "请添写年龄",
                        //    number: "请输入数字"
                        //},
                        sex: {
                            required: "请选择性别"
                        },
                        idCard: {
                            required: "请添写身份证号"
                        },
                        tel: {
                            required: "请添写手机号码",
                            isMobile:"请添写正确的手机号码"
                        },
                        code: {
                            required: "请添写工号"
                        },
                        //email: {
                        //    required: "请添写邮箱",
                        //    email:"请填写正确的邮箱"
                        //},
                        deptId: {
                            required: "请选择所属部门"
                        },
                        /*roleId: {
                            required: "请选择角色"
                        },*/
                        //address: {
                        //    required: "请添写详细地址"
                        //},
                        //remark: {
                        //    required: "请添写简介"
                        //}
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();

}])