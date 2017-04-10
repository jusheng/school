'use strict';

angular.module('app')
	.controller('taskaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','API','toaster','recordFormat','$timeout',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,API,toaster,recordFormat,$timeout) {
		

         
      	$scope._simpleConfig = {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
                //focus时自动清空初始化时的内容
                //autoClearinitialContent:true,
                //关闭字数统计
                wordCount:false,
                //关闭elementPath
                elementPathEnabled:false
          }




		$scope.init=function(id){
            var success = function(result){
                $scope.record = result.data;


                $scope.$apply();  
            }
            var error = function(result){
            	 toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }


            API.post("/oa/plan/read/detail",{"id":id},success,error);

        }

        if($state.params.id){
            $scope.init($state.params.id);
        }else{

            $scope.record={
                "periodType":{},
                "oaPlanType":{},
                "beginTime":"",
                "endTime":"",
                "reviewUser":{},

                "presideUser":{},  //主办人
                "withUsers":[]      //协办人

            }
        }


        function toDate(str) {
            if(str.length==10&&str.indexOf("-")>0){
                var yy = str.substring(0,4);
                var mm = str.substring(5,7);
                var dd = str.substring(8,10);
                var date = new Date("2000-0-1");
                date.setFullYear(yy);
                date.setMonth(mm-1);
                date.setDate(dd);
                date.setHours(1);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                return date;
            }
            return false;
        }

        $scope.submit1 = function(){
	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.task.mytask');
                },1000);	
	   		}
	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}


            delete $scope.record.createTime;
            delete $scope.record.updateTime;



            var b = toDate($scope.record.beginTime);
            var e = toDate($scope.record.endTime);


            $scope.record.beginTime = b;
            $scope.record.endTime = e;

            ($scope.record.presideUser　!= null) && ($scope.record.presideUser.school = null);
            ($scope.record.reviewUser != null) && ($scope.record.reviewUser.school = null);

            recordFormat.format($scope.record,".");
            



            for (var i in $scope.record) {
                if($scope.record[i]==null){
                    delete $scope.record[i];
                }
            }




            if($state.params.id){
                API.post('/oa/task/update',$scope.record,success,error);

            }else{


               API.post('/oa/task/add',$scope.record,success,error);
             


            }

	   }

       //任务类型 
       $scope.get_tasktype = function(key){
            var success = function(result){
                console.log(result);
                 $scope.tasktype = result.data.list.reverse();


                 //默认选中第一项
                 if($scope.tasktype.length>0){
                    $scope.record.taskType = {
                        "id":$scope.tasktype[0].id
                     }
                 }
                 


                 $scope.$apply();
            }
            var error = function(result){
                if(result==""){
                   $scope.get_tasktype();
                }
            }

            API.post("/dic/read/list",{"key":key},success,error);
       }
       $scope.get_tasktype("task_type");

       //重要程度 
       $scope.get_task_level = function(key){
            var success = function(result){
                console.log(result);
                 $scope.tasklevel = result.data.list.reverse();


                 //默认选中第一项
                 if($scope.tasklevel.length>0){
                    $scope.record.emphasisGrade = {
                        "id":$scope.tasklevel[0].id
                     }
                 }
                 


                 $scope.$apply();
            }
            var error = function(result){
                if(result==""){
                   //$scope.get_task_level();
                }
            }

            API.post("/dic/read/list",{"key":key},success,error);
       }
       $scope.get_task_level("task_level");

       /*可见人*/
       $scope.get_visibleType = function(key){
        
            var success = function(result){
                console.log(result);
                 $scope.visibleType = result.data.list.reverse();
                 $scope.$apply();
            }
            var error = function(result){
                if(result==""){
                   //$scope.get_visibleType();
                }
            }

            API.post("/dic/read/list",{"key":key},success,error);
       }

       $scope.get_visibleType("plan_user_look");
       




       // 
       $scope.$on("schoolmailList",function(ev,msg){
            $scope.userlist = msg;
       });

       // 主办人 过滤器
       $scope.zbr = function(item){
            //return item.id == $scope.record.presideUser.id;
            return item.zbr;
       }

       // 协办人 过滤器
       $scope.xbr = function(item){
            return item.xb;
       }

       // 知会人 过滤器
       $scope.zhr = function(item){
            return item.zh;
       }




       //弹出成员选择框  
       $scope.open_pp = function(t){

            $scope.curr = t;

            ngDialog.open({
                    template: 'template/module/oa/task/user.html',
                    controller: 'userController',
                    scope:$scope,
                    className: 'ngdialog-theme-green',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function(uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/oa/task/userController.js');
                        }]}
                });
       }
       


        function validate(){
            jQuery('#planadd').validate({
                rules: {
                    title: {
                        required: true
                    },
                    zq: {
                        required: true
                    }
                },
                messages: {
                    planType: {
                        required: '请填写标题'
                    },
                    zq: {
                        required: '请选择周期'
                    }
                },
                submitHandler: function() {
                    $scope.submit1();
                }
            });
        }

        validate();   

        // 编辑的默认选项
      //  $scope.

} ]);