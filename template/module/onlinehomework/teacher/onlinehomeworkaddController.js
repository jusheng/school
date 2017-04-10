'use strict';

angular.module('app')
	.controller('onlinehomeworkaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API','recordFormat','$compile',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API,recordFormat,$compile) {
                                 
       $scope.set_curr(1);

      //内容编辑框的样式
       $scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['Source', 'Undo', 'Redo','Bold','insertimage']],
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
                "initialFrameHeight":300
          } 

       $scope.id = $state.params.id;    

       //取得年级
       $scope.get_grade = function(){
            
            var success = function(result){
                console.log(result);
                $scope.grade = result.data;

                if(!$state.params.id){
                    //默认选第一个年级
                    if(result.data.length >0 ){
                        $scope.record.grade.id =  result.data[0].id;
                        $scope.record.grade.base_id =  result.data[0].basegrade.id;
                    }                    
                }else{

                     $scope.record.grade = {};
                    for (var i = 0; i < $scope.grade.length; i++) {
                        if($scope.record.baseGradeId == $scope.grade[i].basegrade.id){
                            $scope.record.grade.id =  result.data[0].id;
                            $scope.record.grade.base_id =  result.data[0].basegrade.id;
                        }
                    }

                }

                
                $scope.$apply();    
                $scope.get_subjects();
                
            };
            var error = function(){

            }

            API.post("/grade/getGradeByTeacherId",{},success,error);
       }                        
       

       $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data;
                console.log(result.data);
                $scope.record.chapter.Id = $scope.record.chapter.id;
                $scope.record.knowledgePoint.Id = $scope.record.knowledgePoint.id;


                //删除没用的子对象 避免提交不了
                delete $scope.record.chapter.grade;
                delete $scope.record.chapter.textbook;
                delete $scope.record.chapter.subject;
                delete $scope.record.knowledgePoint.subject;


                // $scope.record.grade = {"base_id":$scope.record.baseGradeId};
                $scope.get_grade();
                $scope.$apply();
            }   

            var error = function(){

            }

            API.post("/homework/read/detail",{"id":id},success,error);
       }

       if(!$state.params.id){
            $scope.record = {
                        "homeworkType":1,
                        "subject":{
                            "id":0
                        },
                        "grade":{
                            "id":0,
                            "base_id":0
                        },
                        "isShowAnswer":0 
                   } 
            $scope.title = "创建在线作业";       
            $scope.get_grade();
       }else{  
          $scope.init($state.params.id);
          $scope.title = "编辑在线作业";

       }


       $scope.get_subjects = function(){
            
            var success = function(result){
                console.log(result);
                $scope.subjects = result.data;

                if(!$state.params.id){
                  if($scope.subjects.length>0){
                        $scope.record.subject.id = $scope.subjects[0].id;
                    }  
                }
                

                $scope.$apply();    
                
            };
            var error = function(){

            }

            API.post("/edu/teacher/getTeacherSubjectByGradeId",{"gradeId":$scope.record.grade.id},success,error);
       }


       $scope.submit = function(){
            var success = function(result){
                toaster.clear('*');
                toaster.pop('success', '', "操作成功");

                $timeout(function(){
                    $state.go("main.teacheronlinehomework.list");
                },200);
                
            };
            
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

           /* $scope.record.subject = {
                "id":$scope.record.subject.id
            }*/
            $scope.record["subject.id"] = $scope.record.subject.id;
            recordFormat.format($scope.record,'');

            console.log($scope.record);

            $scope.record.baseGradeId = $scope.record.gradebase_id;


            if(!$state.params.id){
                API.post("/homework/add",$scope.record,success,error);
            }else{

                API.post("/homework/update",$scope.record,success,error);
            }

       }



       //选择章节
       $scope.select_chapter = function(){

            ngDialog.open({
                    template: 'template/module/onlinehomework/teacher/chapter.html',
                    controller: 'chapterController',
                    className: 'ngdialog-theme-primary',
                    scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/onlinehomework/teacher/chapterController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    ]);
                            });
                        }]}
                });    

       }

       $scope.select_knowledge = function(){
            ngDialog.open({
                    template: 'template/module/onlinehomework/teacher/knowledge.html',
                    controller: 'knowledgeController',
                    className: 'ngdialog-theme-primary',
                    scope:$scope,
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/onlinehomework/teacher/knowledgeController.js').then(function(){
                                return $ocLazyLoad.load([
                                    'toaster',
                                    'ng-iscroll',
                                    'Dtree',
                                    ]);
                            });
                        }]}
                });
       }


	
	   function validate(){
	   	//console.log('form:'+jQuery('form').length);
            jQuery('#homewordadd_form').validate({
                rules: {
                	title: {
                        required: true
                    },
                    km: {
                        required: true
                    },
                    chapter: {
                        required: true
                    },
                    knowledge: {
                        required: true
                    }
                },
                messages: {
                	title: {
                        required: '请填写作业名称'
                    },
                    km: {
                        required: '请选择科目'
                    },
                    chapter: {
                        required: '请选择章节'
                    },
                    knowledge: {
                        required: '请选择知识点'
                    }

                },
                submitHandler: function() {
                    $scope.submit();
                }
            });
        }

        validate();
	                                	
}])	                                	