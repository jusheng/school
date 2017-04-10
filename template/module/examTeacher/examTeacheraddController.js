'use strict';

angular.module('app')
    .controller('examTeacheraddController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', '$timeout', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, $timeout, toaster, API) {
           
            $scope.param = {};
            $scope.param = {"classId": $state.params.id};
            $scope.id = $state.params.id;

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

            //按班级查询科目
            $scope.getSubject = function (id) {
                var success = function (result) {
                    $scope.subjects = result.data;


                    // if ($state.params.practiseId) {
                    //     $scope.title = "修改测验";
                    //     $scope.init($state.params.practiseId);
                    // } else {
                    //     $scope.title = "添加测验";
                    //     $scope.insert_ks();
                    // }
                    $scope.insert_ks();

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/subject/read/class', {classId: id}, success, error);
            }

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

            function getSubjectObject(subject) {
                var detail = {};
                var tmp = ["beginTime", "endTime", "totalPoint","duration"];
                detail["subject"] = {};
                for (var i in tmp) {
                    if(tmp[i]=='beginTime'){
                        detail[tmp[i]] = subject.beginTime_temp +" "+subject.s_hour+":"+subject.s_minutes+":00";
                    }else{
                        detail[tmp[i]] = subject[tmp[i]];
                    }
                    
                }
                detail.subject["id"] = subject.id;
                return detail;
            }

            // 考试显示
            $scope.insert_ks = function (id) {
                for (var j = 0; j < $scope.subjects.length; j++){
                            
                        $scope.subjects[j].totalPoint = 100;
                        $scope.subjects[j].checked = true;
                        $scope.subjects[j].s_hour = '08';
                        $scope.subjects[j].s_minutes = '00';
                        $scope.subjects[j].beginTime_temp = moment().format('YYYY-MM-DD');
                }
            }

            $scope.init = function (id) {
                var success = function (result) {
                    $scope.record = result.data;
                    //$scope.insert_ks(id);
                    if($state.params.id){
                        // $scope.getSubject($scope.record.subjectGroup.id);
                        var d = $scope.record.details;
                        $scope.subjects = [];
                        for(var i=0;i<d.length;i++){



                            $scope.subjects.push(
                                    {
                                      "totalPoint": d[i].totalPoint,
                                      "checked": d[i].isChecked,
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
                
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/practise/read/detail_new", {"id": id,"classId":$scope.id}, success, error);

            }

            if($state.params.practiseId) {
                $scope.title = "修改测验";
                $scope.init($state.params.practiseId);
            } else {
                $scope.title = "添加测验";
                $scope.getSubject($state.params.id);
                
            }

            $scope.submit = function () {

                if ($state.params.id) {

                    $scope.record.details = [];
                    for (var i in $scope.subjects) {
                        $scope.subjects[i]['checked'] && $scope.subjects[i]['checked'] == true && $scope.record.details.push(getSubjectObject($scope.subjects[i]));
                    }

                    if ($scope.record.details.length == 0) {
                        return false;
                    }
                } else {
                    var temp = [];
                    for (var i in $scope.subjects) {
                        $scope.subjects[i]['checked'] && $scope.subjects[i]['checked'] == true && temp.push(getSubjectObject($scope.subjects[i]));
                    }
                    if (temp.length == 0) {
                        return false;
                    }
                    $scope.record.details = temp;
                }

                var success = function (result) {
                    toaster.clear('*');

                    toaster.pop('success', '', "保存成功");
                    $timeout(function () {
                        $state.go('main.examTeacher.examTeacherlist', {"id": $state.params.id});
                    }, 2000);

                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                $scope.record["id"] = $state.params.practiseId;
                $scope.record && (delete $scope.record.createTime);
                $scope.record && (delete $scope.record.updateTime);
                $scope.record["eduClass"] = {};
                $scope.record.eduClass.id = $state.params.id;


                if ($state.params.practiseId) {
                    API.jsonpost('/res/practise/update', $scope.record, success, error);
                } else {
                    API.jsonpost('/res/practise/add', $scope.record, success, error);
                }

            }

            $scope.select = function(index){
                if($scope.subjects[index].checked){
                    $("#duration_"+index).rules("add",{required:true,messages:{required:""}});   
                    //validator.form();  
                }else{
                    $("#duration_"+index).rules("remove");
                    
                }

            }

            $scope.$watch("subjects",function(){

                if(!$scope.subjects){
                    return false;
                }
                console.log('dd');
                $timeout(function(){
                   //console.log($(".duration").length); 
                   for (var i = 0; i < $scope.subjects.length; i++) {
                        if($scope.subjects[i].checked){
                            console.log($(".duration_"+i).length);
                            $("#duration_"+i).rules("add",{required:true,messages:{required:""}});  
                        }else{
                            
                            $("#duration_"+i).rules("remove");
                        }
                    }
                },200)
            })


            var validator;
            function validate() {
                validator = jQuery('#examadd').validate({
                    rules: {
                        name: {
                            required: true
                        },
                        type: {
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
                        subject: {
                            required: '请填写考试科目'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                });
            }

            validate();


             


        }])
    