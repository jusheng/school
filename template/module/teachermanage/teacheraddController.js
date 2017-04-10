'use strict';

angular.module('app')
	.controller('teacheraddController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {



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


            //上级部门列表 （不带分页）
            $scope.get_all_dept = function() {

                var success = function(msg) {
                    $scope.schooldept = $scope.create_select(msg.data);
                    $scope.$apply();
                };
                var error = function(msg) {
                    toaster.clear('*');
                    toaster.pop('error', '', msg.msg);
                }

                API.post('/schoolDept/read/tree', {
                    "schoolId": 30
                }, success, error);
                
            }

             $scope.get_all_dept();

           //判断添加还是修改
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

            API.post("/edu/teacher/read/detail",{"id":id},success,error);

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

        if($state.params.id){
            $scope.app_name = "修改老师信息";
            $scope.init($state.params.id);
        }else{
            $scope.app_name = "添加老师信息";
        }
	
	   $scope.submit = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.teachermanage.teacherlist');
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}

            delete $scope.record.createTime;
            delete $scope.record.updateTime;
            delete $scope.record.updateBy;

            if($state.params.id){
                API.post('/edu/teacher/updateTeacher',$scope.record,success,error);

            }else{
                API.post('/edu/teacher/addTeacher',$scope.record,success,error);
            }

	   }
       //checkbox
       $scope.chk = false;
       $scope.check = function(){
         $scope.chk.selected = !$scope.chk.selected;
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
                	name: {
                        required: true
                    },
                    pic: {
                        required: true
                    },
                    //sex: {
                      //  required: true
                   // },
                    code: {
                        required: true
                    },
                    //idCard: {
                   //     required: true
                   // },
                    tel: {
                        required: true
                    },
                    //email: {
                    //    required: true
                    //},
                    deptId: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写姓名'
                    },
                    pic: {
                        required: '请上传头像'
                    },
                    // sex: {
                    //     required: '请填写性别'
                    // },
                    code: {
                        required: '请填写工号'
                    },
                    idCard: {
                        required: '请填写身份证'
                    },
                    tel: {
                        required: '请填写电话'
                    },
                    email: {
                        required: '请填写邮箱'
                    },
                    deptId: {
                        required: '请填写部门'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            })
        }



	}
])