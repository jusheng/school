'use strict';

angular.module('app')
	.controller('examaddController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		$scope.param={};
        $scope.param={"gradeId":$state.params.gradeId};
        $scope.id= $state.params.gradeId;

        $scope.hour = (function(){
            var temp = [];
            for (var i = 8; i < 19; i++) {
                var t = i<10?'0'+i+'':i+'';
                temp.push({'h':t});
            }
            return temp;
        })();

        $scope.minutes = (function(){
            var temp = [];
            for (var i = 0; i < 60; i+=10) {

                var t = i<10?'0'+i+'':i+'';
                temp.push({'m':t});

            }
            return temp;

        })();

         //获取考试类型
        $scope.getType = function(){
            var success = function(result){
                $scope.eType = result.data;
                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post('/res/exam/type/read/all',{},success,error);
        }
       $scope.getType();

       //获取科目组
        $scope.getSubjectgroup = function(){
             var success = function (result) {
                    $scope.subjectgroup = result.data;
                    $scope.$apply();





                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subjectGroup/read/all', $scope.param, success, error);
        }
       $scope.getSubjectgroup();

       function isNumber(n) {  
                return !isNaN(parseFloat(n)) && isFinite(n);  
            }  
       $scope.js_time = function(index){
                


                if($scope.subjects[index].duration && isNumber($scope.subjects[index].duration)){  //时长存在时 计算结束时间
                    var s = $scope.subjects[index].beginTime_temp +" "+ $scope.subjects[index].s_hour +":"+ $scope.subjects[index].s_minutes +":00";
                    $scope.subjects[index].endTime = moment(s).add($scope.subjects[index].duration,'minutes').format('YYYY-MM-DD HH:mm:ss');
                }else{
                    $scope.subjects[index].endTime = "";
                    $scope.subjects[index].duration = "";
                }
                
            }

// 考试显示
       $scope.insert_ks = function(id){

            for (var j = 0; j < $scope.subjects.length; j++) {
                    
                $scope.subjects[j].totalPoint = 100;
                $scope.subjects[j].checked = true;
                $scope.subjects[j].s_hour = '08';
                $scope.subjects[j].s_minutes = '00';
                $scope.subjects[j].beginTime_temp = moment().format('YYYY-MM-DD');

            };

            for (var i = 0; i < $scope.subjects.length; i++) {
                    if($scope.subjects[i].checked){
                         //$("#totalPoint_"+i).rules("add",{required:true,messages:{required:""}});
                        // $("#hour_"+i).rules("add",{required:true,messages:{required:""}}); 
                        // $("#minutes_"+i).rules("add",{required:true,messages:{required:""}}); 
                        $("#duration_"+i).rules("add",{required:true,messages:{required:""}});  
                        
                    }else{
                         //$("#totalPoint_"+i).rules("remove");
                        // $("#hour_"+i).rules("remove");
                        // $("#minutes_"+i).rules("remove");
                        $("#duration_"+i).rules("remove");
                        
                    }
            }


       }

       //获取科目组已选科目
       $scope.getSubject = function(id){
             var success = function (result) {
               
                    $scope.subjects= result.data;
                    $scope.$apply();               
                    $scope.insert_ks($state.params.id);
                    $scope.$apply();




                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/subjectGroup/read/subjectList', {subjectGroupId:id,onlyMajor:1}, success, error);
        }

        
        function getSubjectObject(subject) {
            var detail = {};
            var tmp = ["beginTime","endTime","totalPoint","duration"];
            detail["subject"] = {};
            for(var i in tmp){
                    if(tmp[i]=='beginTime'){
                        detail[tmp[i]] = subject.beginTime_temp +" "+subject.s_hour+":"+subject.s_minutes+":00";
                    }else{
                        detail[tmp[i]] = subject[tmp[i]];
                    }
            }
            detail.subject["id"] = subject.id;
            return detail;
        }

         $scope.init = function(id){
            var success = function(result){
                $scope.record = result.data;  
                if($state.params.id){
                    //$scope.getSubject($scope.record.subjectGroupId);
                    var d = $scope.record.details;
                    $scope.subjects = [];
                    for(var i=0;i<d.length;i++){
                        $scope.subjects.push(
                                {
                                  "totalPoint": d[i].totalPoint,
                                  "checked": d[i].checked,
                                  "s_hour": d[i].beginTime.substring(11,13),
                                  "s_minutes": d[i].beginTime.substring(14,16),
                                  "beginTime_temp": d[i].beginTime.substring(0,10),
                                  "endTime": d[i].endTime,
                                  "name": d[i].subjectName ,
                                  "duration" : d[i].duration,
                                  "id" : d[i].subjectId
                                }
                            );
                    }
                }
                $scope.$apply(); 
            }

            var error = function(result){
                toaster.clear('*');
                toaster.pop('error', '', result.msg);
            }

            API.post("/res/exam/read/detailInfo",{"id":id},success,error);

         }  

        if($state.params.id){
            $scope.title = "修改考试";
            $scope.init($state.params.id);
        }else{
            $scope.title = "添加考试";            
        }

	   $scope.submit = function(){

           // angular.forEach($scope.subjects,function(s){
           //     if(s.checked){
           //         if(!s.beginTime&&!s.endTime){
           //             throw "请输入开始时间和结束时间";
           //         }
           //         if(!s.totalPoint){
           //             throw "请输入总分";
           //         }
           //     }
           // })

            if ($state.params.id) {
                // for(var i in $scope.record.details){
                //     delete $scope.record.details[i].id;
                // }
                $scope.record.details = [];
                for(var i in $scope.subjects){
                $scope.subjects[i]['checked'] && $scope.subjects[i]['checked']==true && $scope.record.details.push(getSubjectObject($scope.subjects[i]));
                }

                if($scope.record.details.length==0 ){
                    return false;
                }

            }else{
                    var temp = [];
                    for(var i in $scope.subjects){
                       $scope.subjects[i]['checked'] && $scope.subjects[i]['checked']==true && temp.push(getSubjectObject($scope.subjects[i]));
                    }
                    if(temp.length==0 ){
                        return false;
                    } 
                    $scope.record.details = temp;
                }
            $scope.record.subjectGroup={"id":$scope.record.subjectGroupId};

            // console.log($scope.record);

	   		var success = function(result){
	   			toaster.clear('*');
                toaster.pop('success', '', "保存成功");
                $timeout(function(){
                    $state.go('main.exam.examlist',{"id":$state.params.gradeId});
                },2000);	
	   		}

	   		var error = function(result){
	   			toaster.clear('*');
                toaster.pop('error', '', result.msg);
	   		}
            $scope.record["id"] = $state.params.id;

            //$scope.record["details"] = details;
            $scope.record && (delete $scope.record.createTime);
            $scope.record && (delete $scope.record.updateTime);


            if($state.params.id){
                API.jsonpost('/res/exam/update',$scope.record,success,error);
            }else{
                API.jsonpost('/res/exam/add',$scope.record,success,error);
            }
	   }

        $scope.examType = function (id) {
                /* ngDialog.open({
                 template: 'templateId',
                 className: 'ngdialog-theme-default',
                 width: 650,
                 plain: true
                 });*/
                ngDialog.open({
                    template: 'template/module/exam/examtype.html',
                    controller: 'examtypeController',
                    className: 'ngdialog-theme-green',
                    // width:700,
                    data:{subjectGroupId:id,"parent_scope":$scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/exam/examtypeController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
            }

       $scope.select = function(index){
                if($scope.subjects[index].checked){
                    $("#duration_"+index).rules("add",{required:true,messages:{required:""}});   
                    //validator.form();  
                }else{
                    $("#duration_"+index).rules("remove");
                    $("#duration_"+index).removeClass("error");
                }

            }

              
	   function validate(){
            jQuery('#examadd').validate({
                rules: {
                	name: {
                        required: true
                    },
                    type: {
                        required: true
                    },
                    subjectGroupId: {
                        required: true
                    },
                    subject: {
                        required: true
                    }
                },
                messages: {
                	name: {
                        required: '请填写考试名称'
                    },
                    type: {
                        required: '请填写考试类型'
                    },
                    subjectGroupId: {
                        required: '请填写考试科目组'
                    },
                    subject: {
                        required: '请填写考试科目'
                    }
                },
                submitHandler: function() {
                    //try{
                        $scope.submit();
                    // }catch (e){
                    //     toaster.clear('*');
                    //     toaster.pop('warning', '', e);
                    // }
                }
            });
        }

        validate();


} ])
    