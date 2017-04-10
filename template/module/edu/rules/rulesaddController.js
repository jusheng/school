'use strict';

angular.module('app')
	.controller('rulesaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat) {

        $scope.title = "添加班级制度";
        $scope.param={

        }
        $scope.record = {};
        $scope.type = true;
        $scope.record.type = true;
        $scope.record.flag = 0;
        $scope.change = function(s){
                $scope.type = s;
                console.log($scope.type);
                $scope.record.type = $scope.type;
                console.log($scope.record.type);
        }
        
        
         $scope.submit = function(){
            console.log($scope.record.type);
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.rules.list');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            recordFormat.format($scope.record,'.');

            if($state.params.id){

                API.post('/classes/rewardOrPunish/update',$scope.record,success,error);

            }else{
                API.post('/classes/rewardOrPunish/add',$scope.record,success,error);
            }

	   }
       //获取新闻分类id
       $scope.get_class = function(){

        var success = function(result){
            $scope.newsclass = result.data;
            $scope.$apply();
            console.log($scope.newsclass);
        }
        var error = function(result){

        }

        API.post('scl/newssorts/read/list',{},success,error);
       }
       $scope.get_class();

       // 图片上传
       $scope.upload_img = function(base64){
            
            var success = function(result){
                $scope.record.pic = result.data[0].id;
                $scope.record.imgUrl = result.data[0].imgUrl;
                toaster.clear('*');
                toaster.pop('success', '', "图片上传成功");
            }
            var error = function(result){

            }

           API.post("/upload/fileBase64",{"imgs":base64},success,error);

       }



	   validate();

	   function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    sortsId: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请填写标题'
                    },
                    sortsId: {
                        required: '请选择所属分类'
                    }
        
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

} ]);