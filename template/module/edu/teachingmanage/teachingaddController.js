'use strict';

angular.module('app')
    .controller('teachingaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
                                    function($rootScope, $scope, $http, $state,Upload,$timeout,ngDialog,toaster,API,recordFormat,$compile) {
        //内容编辑框的样式
       $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test','simpleupload']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false,
                "imageActionName": "uploadimage", /* 执行上传图片的action名称 */  
                "imageFieldName": "upfile", /* 提交的图片表单名称 */  
                "imageMaxSize": 2048000, /* 上传大小限制，单位B */  
                "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"], /* 上传图片格式显示 */  
                "imageCompressEnable": true, /* 是否压缩图片,默认是true */  
                "imageCompressBorder": 1600, /* 图片压缩最长边限制 */  
                "imageInsertAlign": "none", /* 插入的图片浮动方式 */  
          }

       
        
        $scope.init = function(id){
            var success=function(result){
               
                $scope.record = result.data;
                $scope.record.presideUser = {
                        
                    "id":$scope.record.teacherId,
                    "name":$scope.record.teacherName

                },
                $scope.record.recorderList= {
                    "id":$scope.record.recorderId,
                    "name":$scope.record.recorderName
                }

                for (var i = 0; i < $scope.record.attendeePlanList.length; i++) {
                    $scope.record.attendeePlanList[i].id =  $scope.record.attendeePlanList[i].id-0; 
                }


                $scope.$apply();

            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/teaching/activity/read/detail",{"id":id},success,error);
        }

        if($state.params.id){
            $scope.title = "修改评课计划";
             $scope.record = {
                "presideUser" : {},
            };
            $scope.init($state.params.id);
        }else{
            $scope.title = "创建评课计划";
             
            
            $scope.record = {
                
                "presideUser" : {},
                "recorderList" : {},
                 "attendeePlanList":[],
                 "attendeeList":[]
                
            };
        }

       

         $scope.$watch("user_data",function(){
                if(!$scope.user_data){
                    return false;
                }
                $scope.record.recorderList = {

                    "id":$scope.user_data.id,
                    "name":$scope.user_data.name
                }
                $scope.record.recorderId = $scope.record.recorderList.id;
                $scope.record.recorderName = $scope.record.recorderList.name; 

         })

         

         //删除操作
        $scope.del_a = function() {

                delete $scope.record.presideUser;
                delete $scope.record.teacherId;
                delete $scope.record.teacherName;
                // $scope.record.attendeeList.splice(i,1);
        }
        $scope.del_b = function() {

                delete $scope.record.recorderList;
        }
        $scope.del_c = function(i) {

                $scope.record.attendeePlanList.splice(i,1);
        }

        $scope.submit = function(){
             

                $scope.record.attendeeidStr=[];
                $scope.record.recorder=[];
                $scope.record.teacher=[];

                
                //授课老师 -----------       
                $scope.record.teacherId == $scope.record.presideUser.id;
                $scope.record.teacherName == $scope.record.presideUser.name;    

                //----------end ----------
                
                //记录人---------------------
                $scope.record.recorderId = $scope.record.recorderList.id;
                $scope.record.recorderName = $scope.record.recorderList.name;  

                //----------end---------    



                //应邀参评人员---------------------

                var tempId = [];
                var tempName = [];        
                if ($scope.record.attendeePlanList.length > 1) {
                        for (var i = 0; i < $scope.record.attendeePlanList.length; i++) {           

                            tempId.push($scope.record.attendeePlanList[i].id);
                            tempName.push($scope.record.attendeePlanList[i].name);

                        }


                        $scope.record.attendeePlanIds = tempId.join(',');
                        $scope.record.attendeePlanNames = tempName.join(','); 
                }else if($scope.record.attendeePlanList.length == 1){
                    $scope.record.attendeePlanIds = $scope.record.attendeePlanList[0].id;
                    $scope.record.attendeePlanNames = $scope.record.attendeePlanList[0].name; 
                }

                // 时间处理
                $scope.record.classTimeStr = $scope.record.classTime;
                delete  $scope.record.classTime;

                //---------------end--------------           

                delete $scope.record.recorderList;
                delete $scope.record.attendeeList;
                delete $scope.record.attendeePlanList;
                delete $scope.record.recorder;
                delete $scope.record.attendeeidStr;
                delete $scope.record.presideUser;
                delete $scope.record.teacher;
                delete $scope.record.defaulterList;
                delete $scope.record.narray;


                var success = function(result){
                    toaster.clear('*');
                    toaster.pop('success', '', "保存成功");
                    $timeout(function(){
                        $state.go('main.teachingmanage.teachinglist');
                    },1000);    
                }

                var error = function(result){
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                recordFormat.format($scope.record,'.');

                
                if($state.params.id){ 
                    API.post('/teaching/activity/update',$scope.record,success,error);

                }else{
                    API.post('/teaching/activity/add',$scope.record,success,error);
                }


            }
            

       validate();

       function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                    title: {
                        required: true
                    },
                    place1: {
                        required: true
                    },
                    date: {
                        required: true
                    },
                    name: {
                        required: true
                    },
                    name1: {
                        required: true
                    },
                    name2: {
                        required: true
                    }

                },
                messages: {
                    title: {
                        required: '请填写标题'
                    },
                    place1: {
                        required: '请填写作课地点'
                    },
                    date: {
                        required: '请填写作课时间'
                    },
                    name: {
                        required: '请选择一位作课人'
                    },
                    name1: {
                        required: '请选择一位记录人'
                    },
                    name2: {
                        required: '请邀请至少一位评课人'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        // 主讲人 过滤器
       $scope.zbr = function(item){
            //return item.id == $scope.record.presideUser.id;
            return item.zbr;
       }

       // 录入人 过滤器
       $scope.xbr = function(item){
            return item.xbr;
       }

       // 邀请人 过滤器
       $scope.zhr = function(item){
            return item.zhr;
       }

       //弹出成员选择框  
       $scope.open_te = function(t){

            $scope.curr = t;
            ngDialog.open({
                    template: 'template/module/edu/teachingmanage/user.html',
                    controller: 'userController',
                    scope:$scope,
                    className: 'ngdialog-theme-green',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/edu/teachingmanage/userController.js');
                        }]}
                });
       }

} ]);

