'use strict';

angular.module('app')
	.controller('indexController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','timeago',
	                                function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,timeago) {
       	$scope.menu.curr=1;  



        $scope.formatTime = function(t){
          return  timeago.timeagoFactory().format(t,'zh_CN');
        }


       	//用户信息
       	$scope.get_profile = function(){

       		var success = function(result){
       			$scope.profile = result.data;
       			$scope.$apply();
       		}

       		var error = function(){

       		}

       		API.post("/user/read/userDetail",{},success,error);

       	}

       	$scope.get_profile();


        //学校规模
        var get_scope = function(){
              var success = function(result){
                      console.log(result);
                      for (var i = 0; i < result.data.list.length; i++) {
                            if(result.data.list[i].code==$scope.profile[1].scope){

                                    $scope.profile[1].scopeName = result.data.list[i].codeText;
                                    break;
                            }
                      }
                      
                      $scope.$apply();
               };
               var error  = function(){

               } 
               
               API.post('/dic/read/list',{"key":"SCHOOL_SCOPE"},success,error);   
        }


        //学校类型 
        var get_type = function(){

            var success = function(result){
                      console.log(result);
                      for (var i = 0; i < result.data.list.length; i++) {
                            if(result.data.list[i].code==$scope.profile[1].type){

                                    $scope.profile[1].typeName = result.data.list[i].codeText;
                                    break;
                            }
                      }
                      
                      $scope.$apply();
               };
               var error  = function(){

               } 
               
               API.post('/dic/read/list',{"key":"GRADE_TYPE"},success,error);   
        }


        //学校性质
        var get_nature = function(){
               
               var success = function(result){
                      console.log(result);
                      for (var i = 0; i < result.data.list.length; i++) {
                            if(result.data.list[i].code==$scope.profile[1].nature){

                                    $scope.profile[1].natureName = result.data.list[i].codeText;
                                    break;
                            }
                      }
                      
                      $scope.$apply();
               };
               var error  = function(){

               } 
               
               API.post('/dic/read/list',{"key":"SCHOOL_NATURE"},success,error);   

        }

        $scope.$watch('profile',function(){
               if(!$scope.profile){
                      return false;
               }

               //get_scope();
               //get_type();
               //get_nature();
               

        });




        //个人动弹
        $scope.record = {
          "tempimgurl":[]
        };
        $scope.del_img = function(index){
          $scope.record.tempimgurl.splice(index,1);
        }

        $scope.submit = function(){
            
            var success = function(result){
              toaster.clear('*');
              toaster.pop('success', '', "发布成功！");

              $scope.record = {
                "tempimgurl":[]
              };

              $scope.pageInfo = {};
              $scope.get_dtlist();


            }

            var error = function(){

            }  

            if($scope.record.tempimgurl.length>0 ){
               $scope.record.imgurl = $scope.record.tempimgurl.join(",");
               delete $scope.record.tempimgurl;  
            }
           

            API.post("/personal/state/add",$scope.record,success,error);
        }  


        $scope.onFileSelect = function(files){
            

            angular.forEach(files,function(file){
              file.upload = Upload.upload({
                "url":"/upload/file",
                "data":{file:file},
                "headers":{'Content-Type':'multipart/form-data'}
              });

              file.upload.then(function(response){
                console.log(response);

                // $scope.record.picApp = response.data.data[0].id;
                // $scope.record.imgUrlApp = response.data.data[0].imgUrl;

                $scope.record.tempimgurl.push(response.data.data[0].imgUrl);

              })

            })
            
        };


         //表单验证
            function validate() {

                jQuery('#dt_form').validate({
                    rules: {
                        releaseContent: {
                            required: true
                        },
                    },
                    messages: {
                        releaseContent: {
                            required: "说点什么吧！"
                        },
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }

            validate();


            $scope.param = {};
            $scope.pageInfo = {

            }

            //动弹分页
            $scope.get_dtlist = function(){
              
              var success = function(result){
                 console.log(result);
                 if($scope.pageInfo.list){

                    result.data.list = $scope.pageInfo.list.concat(result.data.list);
                    $scope.pageInfo = result.data;
                    //$scope.pageInfo.list = $scope.pageInfo.list.concat(result.data.list);

                 }else{

                    $scope.pageInfo = result.data;

                 }
                 

                  for (var i = 0; i < $scope.pageInfo.list.length; i++) {
                    
                    if($scope.pageInfo.list[i].imgurl!=null &&  $scope.pageInfo.list[i].imgurl!=""){
                        if($scope.pageInfo.list[i].imgurl.indexOf(',')>-1){  //多张图片
                             $scope.pageInfo.list[i].tempimgurl = [];

                             var temp = $scope.pageInfo.list[i].imgurl.split(",");
                             for (var j = 0; j < temp.length; j++) {
                                  $scope.pageInfo.list[i].tempimgurl.push(temp[j]);
                             }


                          }else{
                            $scope.pageInfo.list[i].tempimgurl = [$scope.pageInfo.list[i].imgurl];
                          }
                    }

                  }

                  $scope.$apply();
              }

              var error = function(){

              }

              API.post("/personal/state/list",$scope.param,success,error);
            }

            $scope.get_dtlist();


            $scope.clearSearch = function() {
                $scope.param.keyword= null;
                $scope.get_dtlist();
            }

            // 翻页
            $scope.pagination = function (page) {
              
                $scope.param.pageNum=page;
                $scope.get_dtlist();
            };

        //授课班级信息
        $scope.get_class_subject_info = function(){

          var success = function(result){
            $scope.classSubject = result.data;
            $scope.$apply();
          }

          var error = function(){

          }

          API.post("/edu/teacher/getTeacherClassAndSubject",{},success,error);

        }
        $scope.get_class_subject_info();
}])