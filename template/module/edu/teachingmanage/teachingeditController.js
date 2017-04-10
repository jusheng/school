'use strict';

angular.module('app')
    .controller('teachingeditController', [ '$rootScope', '$scope', '$http', '$state','Upload','$timeout','ngDialog','toaster','API','recordFormat','$compile',
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
                $scope.record.attendeePlanList1 = [];
                $scope.record.attendeePlanList1 = $scope.record.attendeePlanList.concat();
                
                console.log($scope.record.attendeePlanList);
                $scope.$apply();
                
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/teaching/activity/read/detail",{"id":id},success,error);
        }

        if($state.params.id){
            $scope.title = "编辑评课";
            $scope.record = {
                 "attendeePlanList":[],
                 "attendeeList":[],
                 "defaulterList":[]
            };
            $scope.init($state.params.id);
        }else{
            $scope.title = "";
             
        }
            
        //删除操作
        $scope.del_a = function(i) {
                console.log($scope.record.attendeePlanList1[length]);
                $scope.record.attendeePlanList1.push($scope.record.attendeeList[i]);
                $scope.record.attendeeList.splice(i,1);
        }
        $scope.del_b = function(i) {
                console.log($scope.record.defaulterList[i]);
                $scope.record.attendeePlanList1.push($scope.record.defaulterList[i]);
                $scope.record.defaulterList.splice(i,1);
        }

        $scope.submit = function(){

                //实际参评人员---------------------
                var teId = [];
                var teName = [];
                if ($scope.record.attendeeList.length) {       
                    if ($scope.record.attendeeList.length > 1) {
                            for (var i = 0; i < $scope.record.attendeeList.length; i++) {           

                                teId.push($scope.record.attendeeList[i].id);
                                teName.push($scope.record.attendeeList[i].name);

                            }

                            $scope.record.attendeeIds = teId.join(',');
                            $scope.record.attendeeNames = teName.join(',');  
                         }else if($scope.record.attendeeList.length == 1){
                        $scope.record.attendeeIds = $scope.record.attendeeList[0].id;
                        $scope.record.attendeeNames = $scope.record.attendeeList[0].name; 
                    }
                } 
               
                 //缺席人员---------------------
                var temId = [];
                var temName = [];        
                if($scope.record.defaulterList){
                    if ($scope.record.defaulterList.length > 1) {
                        for (var i = 0; i < $scope.record.defaulterList.length; i++) {           

                            temId.push($scope.record.defaulterList[i].id);
                            temName.push($scope.record.defaulterList[i].name);

                        }

                        $scope.record.defaulterIds = temId.join(',');
                        $scope.record.defaulterNames = temName.join(','); 

                     }else if($scope.record.defaulterList.length == 1){
                    $scope.record.defaulterIds = $scope.record.defaulterList[0].id;
                    $scope.record.defaulterNames = $scope.record.defaulterList[0].name; 
                    }
                }

                  

                //---------------end--------------           

                delete $scope.record.recorderList;
                delete $scope.record.attendeeList;
                delete $scope.record.attendeePlanList;
                delete $scope.record.attendeePlanList1;
                delete $scope.record.recorder;
                delete $scope.record.attendeeidStr;
                delete $scope.record.defaulterList;

                console.log($scope.record);
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

            API.post('/teaching/activity/commit',$scope.record,success,error);

       }
        

       validate();

       function validate(){
            jQuery('#newsadd_form').validate({
                rules: {
                    name3: {
                        required: true
                    },
                    remark: {
                        required: true
                    }
                },
                messages: {
                    name3: {
                        required: '请选择出席人员'
                    },
                    remark: {
                        required: '请填写评课发言'
                    }
                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
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

