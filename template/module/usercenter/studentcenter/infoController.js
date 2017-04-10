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

       	
       		}

       		var error = function(){

       		}



       		API.post("/user/read/userDetail",{},success,error);

       	}

       	$scope.get_profile();




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
                $timeout(function(){
                    $state.go('main.studentcenter.index');
                },1000)
            };
            
            var error = function(){

            }

            recordFormat.format($scope.record);


            API.post("/user/update/userDetail",$scope.record,success,error);
        }


        $scope.get_nation = function(key){
        
            var success = function(result){
                 $scope.nation = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"NATIONAL"},success,error);
     }  
     $scope.get_nation();

     // 政治面貌
    $scope.get_politics = function(key){
        
            var success = function(result){
                 $scope.politics = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"POLITICS_STATUS"},success,error);
     }  
     $scope.get_politics();

     
     function validate() {
                jQuery('#infoedit').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        //nation: {
                       //    required: true
                       // },
                       // sex: {
                        //    required: true
                        //},
                        code: {
                            required: true
                        },
                        //idCard: {
                          //  required: true
                        //},
                        //age: {
                          //  required: true
                        //},
                        //tel: {
                       //     required: true
                       // },
                        //politics: {
                        //    required: true
                        //},
                        //a/ddress: {
                            //required: true
                        //},
                        parentName: {
                            required: true
                        },
                        parentTel: {
                            required: true
                        }
                        //parentWork: {
                         //   required: true
                        //}
                    },
                    messages: {
                         name: {
                            required: "请添写姓名"
                        },
                        nation: {
                            required: "请选择民族"
                        },
                        sex: {
                            required: "请选择性别"
                        },
                        code: {
                            required: "请添写学号"
                        },
                        idCard: {
                            required: "请添写身份证号码"
                        },
                        age: {
                            required: "请添写年龄"
                        },
                        tel: {
                            required: "请添写电话"
                        },
                        politics: {
                            required: "请选择政治面貌"
                        },
                        address: {
                            required: "请添写家庭住址"
                        },
                        parentName: {
                            required: "请添写家长姓名"
                        },
                        parentTel: {
                            required: "请添写家长电话"
                        },
                        parentWork: {
                            required: "请添写家长工作"
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();
           

}])