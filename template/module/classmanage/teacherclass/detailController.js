'use strict';

angular.module('app')
	.controller('detailController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {
         
	$scope.id = $state.params.id;  
	$scope.classId = $state.params.classId;                                	



	$scope.get_detail = function(id){
		var success = function(result){
                 $scope.record = result.data;
                 $scope.record.pic != "" && ($scope.myCroppedImage = $scope.record.imgUrl);
                 $scope.$apply();
            }
        var error = function(result){

        }

		API.post("/edu/student/read/detail",{"id":id},success,error);
	}

	$scope.get_detail($scope.id);


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

    //性别
    $scope.get_sex = function(key){
        
            var success = function(result){
                 $scope.sexData = result.data.list;

                 $scope.$apply();
            }
            var error = function(result){

            }

            API.post("/dic/read/list",{"key":"SEX"},success,error);
     }  
     $scope.get_sex();


     $scope.submit = function(){
     	var success = function(result){
     			toaster.clear('*');
                toaster.pop('success', '', "保存成功!");
                $timeout(function(){
                    $state.go('main.teacherclass.list',{"id":$scope.classId});
                },1000)
     	}
     	var error = function(){

     	}

     	delete $scope.record.school;
     	delete $scope.record.user;

     	recordFormat.format($scope.record,'.');

     	API.post("/edu/student/update",$scope.record,success,error);
     }

       //表单验证
            function validate() {
                jQuery('#student_form').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        nation: {
                            required: false
                        },
                        sex: {
                            required: false
                        },
                        code: {
                            required: true
                        },
                        idCard: {
                            required: false
                        },
                        politics: {
                            required: false
                        },
                        address: {
                            required: false
                        },
                        parentName: {
                            required: true
                        },
                        parentTel: {
                            required: true
                        }
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
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();
}])