'use strict';

angular.module('app')
    .controller('examScorePieChartController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API) {

            $scope.app_name = "考试成绩";
            $scope.param = {};
            $scope.examId = $state.params.examId;
            $scope.classId = $state.params.classId;

            //$scope.buildChartData = function(gradeData,classData){
            //
            //    if(gradeData.length==0||classData.length==0||$scope.examSubject.length==0){
            //        setTimeout(function(){
            //            validate();
            //        },200);
            //    }
            //
            //    var cData = {
            //        name:'班级平均成绩',
            //        datapoints:function(){
            //            var result = [];
            //            for(var i=0;i<$scope.examSubject.length;i++){
            //                result.push({
            //                    x:$scope.examSubject[i].name,
            //                    y:classData[$scope.examSubject[i].code]
            //                });
            //            }
            //            return result;
            //        }()
            //    };
            //    var gData = {
            //        name:'年级平均成绩',barWidth: 10,
            //        datapoints:function(){
            //            var result = [];
            //            for(var i=0;i<$scope.examSubject.length;i++){
            //                result.push({
            //                    x:$scope.examSubject[i].name,
            //                    y:gradeData[$scope.examSubject[i].code]
            //                });
            //            }
            //            return result;
            //        }()
            //    };
            //    var data = [cData,gData];
            //    return data;
            //}
            //
            ////请求数据
            //$scope.getClassData = function () {
            //
            //    var success = function (result) {
            //        $scope.classData = result.data;
            //        $scope.$apply();
            //    }
            //
            //    var error = function (result) {
            //        toaster.clear('*');
            //        toaster.pop('error', '', result.msg);
            //    }
            //
            //    API.post('/res/exam/score/read/score/avg', {
            //        examId: $state.params.examId,
            //        classId: $state.params.classId
            //    }, success, error);
            //
            //}
            //
            //$scope.getClassData();
            //
            //$scope.getGradeData = function () {
            //
            //    var success = function (result) {
            //        $scope.gradeData = result.data;
            //        $scope.$apply();
            //    }
            //
            //    var error = function (result) {
            //        toaster.clear('*');
            //        toaster.pop('error', '', result.msg);
            //    }
            //
            //    API.post('/res/exam/score/read/score/avg', {examId: $state.params.examId}, success, error);
            //
            //}
            //
            //$scope.getGradeData();
            //
            //$scope.getExamSubject = function () {
            //
            //    var success = function (result) {
            //        $scope.examSubject = result.data;
            //        $scope.data = $scope.buildChartData($scope.gradeData,$scope.classData);
            //        $scope.$apply();
            //    }
            //
            //    var error = function (result) {
            //        toaster.clear('*');
            //        toaster.pop('error', '', result.msg);
            //    }
            //
            //    API.post('/res/exam/score/getExamSubjects', {
            //        examId: $state.params.examId
            //    }, success, error);
            //
            //}
            //
            //$scope.getExamSubject();
            //
            //$scope.config = {
            //    title: '平均成绩',
            //    subtitle: '',
            //    debug: true,
            //    showXAxis: true,
            //    showYAxis: true,
            //    showLegend: true,
            //    stack: false,
            //    series:{
            //        barWidth:10
            //    }
            //};

            //请求数据
            $scope.param = {};
            $scope.a = 0;
            $scope.buildChartData = function (classData, code) {

                if (classData.length == 0) {
                    setTimeout(function () {
                        $scope.buildChartData;
                    }, 200);
                }

                $scope.data = [{
                    name: '分数分布',
                    datapoints: [
                        {x: '优秀', y: classData[code].excellent},
                        {x: '良好', y: classData[code].good},
                        {x: '及格', y: classData[code].pass},
                        {x: '不及格', y: classData[code].unpass},
                    ]
                }];
            }

            $scope.getData = function () {
                $scope.getClassData($scope.subject);
            }

            $scope.getexamClass2 = function () {
                var success = function (result) {
                    $scope.examclassInfograde = result.data;

                    if ($scope.examclassInfograde.length > 0) {
                        $scope.getexamlist2($scope.examclassInfograde[0].id);
                    }

                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/addressbook/read/list/class', $scope.param, success, error);

            }
            $scope.getexamClass2();

            //获取考试状态
            $scope.getExamStatus = function () {
                var success = function (result) {
                    $scope.examStatus = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/dic/read/key', {key: "EXAM_STATUS"}, success, error);
            }
            $scope.getExamStatus();
            //获取科目字典
            $scope.dict = function () {
                var success = function (result) {
                    $scope.sDict = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/subject/read/dict', {}, success, error);
            }
            $scope.dict();
            // 获取最后这次考试 的科目
            $scope.getexamsubject2 = function (id) {
                var success = function (result) {
                    $scope.examSubject2 = result.data;
                    $scope.config.title.subtext = $scope.examSubject2.name;
                    $scope.subject = $scope.examSubject2.details[0].subject.code;
                    $scope.getClassData();
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }
            $scope.getexamsubject2($state.params.examId);

            $scope.submit2 = function (id) {

                var temp = [];
                temp.push(id);
                if ($scope.examSubject2.details.length == 0) {
                    return false;
                }
                var ids = temp.join(",");
                $scope.ids = id;
            };

            $scope.getClassData = function () {

                var success = function (result) {
                    $scope.classData = result.data;
                    $scope.buildChartData($scope.classData, $scope.subject);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/fourRate', {
                    examId: $scope.examId,
                    classId: $scope.classId
                }, success, error);

            }

            $scope.config = {
                title: {text:'分数分布',x:"center"},
                //subtitle: '',
                //showXAxis: true,
                //showYAxis: true,
                //showLegend: true,
                //stack: false,
                x: 10,y:10,
                toolbox: {
                    show: true,
                    feature: {
                        /*mark : {show: true},
                         dataView : {show: true, readOnly: false},
                         magicType : {show: true, type: ['line', 'bar']},*/
                        restore: {show: true},
                        // saveAsImage : {show: true}
                    }
                }
            };
        }]);