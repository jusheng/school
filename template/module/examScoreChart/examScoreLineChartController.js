'use strict';

angular.module('app')
    .controller('examScoreLineChartController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API) {

            //请求数据
            $scope.param = {};
            $scope.examId = $state.params.examId;
            //$scope.classId = $state.params.classId;

            $scope.buildChartData = function () {
                var scoreData = $scope.scoreData;
                var subjectData = $scope.subjectData;
                if (!scoreData || scoreData.length == 0) {
                    setTimeout(function () {
                        $scope.buildChartData();
                    }, 200);
                    return false;
                }
                var subject = subjectData[$scope.subjectIndex];

                $scope.data = [{
                    name: "自己成绩",
                    datapoints: (function () {
                        var result = [];
                        for (var i = 0; i < scoreData["historyScore"].length; i++) {
                            var tmp = {};
                            tmp.x = scoreData["historyScore"][i].exam.name;
                            tmp.y = scoreData["historyScore"][i][subject.code] > 0 ? scoreData["historyScore"][i][subject.code] : 0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }, {
                    name: subject.name + "年级平均成绩",
                    datapoints: (function () {
                        var result = [];
                        for (var i = 0; i < scoreData["gradeHistoryAvg"].length; i++) {
                            var tmp = {};
                            tmp.x = scoreData["gradeHistoryAvg"][i].exam.name;
                            tmp.y = scoreData["gradeHistoryAvg"][i][subject.code]>0?scoreData["gradeHistoryAvg"][i][subject.code]:0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }, {
                    name: subject.name + "班级平均成绩",
                    datapoints: (function () {
                        var result = [];
                        for (var i = 0; i < scoreData["classHistoryAvg"].length; i++) {
                            var tmp = {};
                            tmp.x = scoreData["classHistoryAvg"][i].exam.name;
                            tmp.y = scoreData["classHistoryAvg"][i][subject.code]>0?scoreData["classHistoryAvg"][i][subject.code]:0;
                            result.push(tmp);
                        }
                        return result;
                    })()
                }];
                $scope.$apply();
            }

            $scope.getData = function () {
                var success = function (result) {
                    $scope.scoreData = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/score/read/score/history', {}, success, error);
            }

            $scope.getSubjectData = function () {

                var success = function (result) {
                    $scope.subjectData = result.data;
                    $scope.subjectIndex = "0";
                    $scope.buildChartData();
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/current/subject', {
                    examId: $scope.examId,
                    classId: $scope.param["classId"]
                }, success, error);

            }

            $scope.getData();
            $scope.getSubjectData();

            $scope.config = {
                title: {text: '历史成绩', x: "center"},
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                smooth: true,
                grid: {borderWidth: 0, x: 60, x2: 60, y: 40, y2: 40},
                legend: {
                    y: "bottom", orient: "horizontal", x: "center"
                },
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