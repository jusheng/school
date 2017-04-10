'use strict';

angular.module('app')
    .controller('examScoreSilvChartController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API) {

            $scope.app_name = "考试成绩";
            $scope.param = {};
            $scope.examId = $state.params.examId;
            $scope.classId = $state.params.classId;

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
                        {x: '优秀率', y: classData[code].excellent},
                        {x: '良好率', y: classData[code].good},
                        {x: '及格率', y: classData[code].pass},
                        {x: '低分率', y: classData[code].total-classData[code].unpass},
                    ]
                }];
            }

            $scope.getData = function () {
                $scope.getClassData($scope.subject);
            }

            $scope.getexamClass2 = function () {
                var success = function (result) {
                    $scope.examclassInfograde = result.data;

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
            $scope.getexamsubject2($scope.examId);

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

                API.post('/res/exam/score/read/fourRate2', {
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