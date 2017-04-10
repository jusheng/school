'use strict';

angular.module('app')
	.controller('studentaddController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',"recordFormat",
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,recordFormat) {

	       $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data;
                $scope.record.pic != "" && ($scope.myCroppedImage = $scope.record.imgUrl);
                $scope.$apply();
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/edu/student/read/detail",{"id":id},success,error);

         }

        //获取性别
        $scope.getType = function(){
            var success = function(result){
                $scope.sexType = result.data;
                console.log($scope.sexType);
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"SEX"},success,error);
        }
       $scope.getType();
       //获取民族
        $scope.nationType = function(){
            var success = function(result){
                $scope.nationType = result.data;
                console.log($scope.sexType);
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"NATIONAL"},success,error);
        }
       $scope.nationType();
       //获取政治面貌
        $scope.statusType = function(){
            var success = function(result){
                $scope.statusType = result.data;
                console.log($scope.sexType);
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/dic/read/key',{key:"POLITICS_STATUS"},success,error);
        }
       $scope.statusType();
       // $scope.record.sex="0";
       //

        if($state.params.id){
            $scope.app_name = "修改学生信息";
            $scope.init($state.params.id);
        }else{
            $scope.app_name = "添加学生信息";
        }

	   $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.studentmanage.studentlist');
                },2000);
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}
           recordFormat.format($scope.record,".");

            if($state.params.id){
                API.post('/edu/student/update',$scope.record,success,error);

            }else{
                API.post('/edu/student/add',$scope.record,success,error);
            }

	   }
       // 搜索
       $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.studentmanage.studentlist');
                },2000);
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }
           recordFormat.format($scope.record,".");

            if($state.params.id){
                API.post('/edu/student/update',$scope.record,success,error);

            }else{
                API.post('/edu/student/add',$scope.record,success,error);
            }
       }
       //checkbox
       $scope.chk={
            "selected":0
        }
       $scope.check = function(){
        if( $scope.chk.selected){
             $scope.chk.selected = 0;
        }else{
             $scope.chk.selected = 1;
        }

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


	validate();
	function validate(){
            jQuery('#teacheradd_form').validate({
                rules: {
                    code:{
                        required: true
                    },
                    pic: {
                        required: false
                    },
                	name: {
                        required: true
                    },
                    //nation: {
                    //    required: true
                    //},
                    //sex: {
                    //    required: true
                   // }
                   parentName:{
                        required: true
                    },
                    parentTel:{
                        required: true
                    }

                },
                messages: {
                    code:{
                        required:'请填写学号'
                    }
                    ,
                	pic: {
                        required: '请上传头像'
                    },
                    name: {
                        required: '请填写姓名'
                    },
                    nation: {
                        required: '请填写民族'
                    },
                    sex: {
                        required: '请填写性别'
                    },
                    parentName:{
                        required: '请填写家长姓名'
                    },
                    parentTel:{
                        required: '请填写家长电话'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }



	}
])