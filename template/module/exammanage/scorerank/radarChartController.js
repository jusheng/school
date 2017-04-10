'use strict';

angular.module('app')
    .controller('radarChartController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.param = {
                classId: Number($state.params.classId),
                // studentId: $state.params.studentId,
                examId: Number($state.params.examId)
            };
            $scope.studentId = $state.params.studentId
            $scope.loading = false;

            //获取所带班级列表
            $scope.getClass = function () {

                var success = function (result) {
                    $scope.classNameList = result.data;
                    $scope.getexam();
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/oa/addressbook/read/list/class', {}, success, error);

            }
            $scope.getClass();

            //获取班级考试列表
            $scope.getexam = function () {

                var success = function (result) {
                    $scope.examList = result.data;
                    if ($scope.examList.length > 0) {
                        $scope.getScoreData();
                        $scope.getClassData();
                    } else {
                        $scope.record = {};
                        $scope.scoreData = {};
                    }
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/read/all', {classId: $scope.param.classId,isStudent:1}, success, error);

            }
            // $scope.getexam();

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
            // 获取这次考试 的科目
            $scope.getexamsubject = function (id) {
                var success = function (result) {
                    $scope.examData = result.data;
                    $scope.subjects = {};
                    for (var i = 0; i < $scope.examData.details.length; i++) {
                        $scope.subjects[$scope.examData.details[i].code] = $scope.examData.details[i].name
                    }
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post("/res/exam/read/detail", {"id": id}, success, error);
            }

            // 获取班级学生成绩
            $scope.getScoreData = function () {
                $scope.getexamsubject($scope.param.examId);
                var success = function (result) {
                    $scope.scoreData = result.data;
                    for (var i = 0; i < $scope.scoreData.length; i++) {
                        if ($scope.scoreData[i].student.id == $state.params.studentId) {
                            // console.log($scope.scoreData[i].student.id, $state.params.studentId);
                            $scope.studentIndex = i + "";
                            break;
                        }
                    }
                    // console.error($scope.studentIndex);
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                // $scope.param["orderBy"] = "er.total_score desc";
                API.post('/res/exam/score/read/all', $scope.param, success, error);
            }

            //请求数据
            $scope.getClassData = function () {

                var success = function (result) {
                    $scope.classData = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/score/avg', {
                    examId: $state.params.examId,
                    classId: $state.params.classId
                }, success, error);

            }

            $scope.buildChartData = function () {
                if (typeof($scope.studentIndex) == "undefined" || typeof($scope.scoreData) == "undefined" || typeof($scope.classData) == "undefined" || typeof($scope.examData) == "undefined") {
                    setTimeout(function () {
                        $scope.buildChartData();
                    }, 200);
                    return;
                }
                $scope.data = [{
                    name: $scope.scoreData[$scope.studentIndex].student.name,
                    type: "radar",
                    data: [{
                        name: "个人成绩",
                        value: function () {
                            var result = [];
                            for (var i = 0; i < $scope.examData.details.length; i++) {
                                result.push($scope.scoreData[$scope.studentIndex][$scope.examData.details[i].subject.code]);
                            }
                            return result;
                        }()
                    }]
                }, {
                    name: $scope.scoreData[$scope.studentIndex].student.name,
                    type: "radar",
                    data: [{
                        name: "班级平均成绩",
                        value: function () {
                            var result = [];
                            for (var i = 0; i < $scope.examData.details.length; i++) {
                                result.push($scope.classData[$scope.examData.details[i].subject.code]);
                            }
                            return result;
                        }()
                    }]
                }];

                $scope.config = {
                    title: '图',
                    // subtitle: 'Line Chart Subtitle',
                    debug: true,
                    showXAxis: true,
                    showYAxis: true,
                    showLegend: true,
                    stack: false,
                    polar: [
                        {
                            scale: true,
                            name: {
                                show: true,
                                formatter: function (value) {
                                    return value;
                                },
                                textStyle: {
                                    color: "#888"
                                }
                            },
                            indicator: function () {
                                var result = [];
                                for (var i = 0; i < $scope.examData.details.length; i++) {
                                    result.push({
                                        text: $scope.examData.details[i].subject.name,
                                        max: $scope.examData.details[i].totalPoint
                                    });
                                }
                                return result;
                            }()
                            // [
                            //     {text: '销售（sales）', max: 6000},
                            //     {text: '管理（Administration）', max: 16000},
                            //     {
                            //         text: '信息技术（Information Techology）', max: 40000
                            //     },
                            //     {text: '客服（Customer Support）', max: 38000},
                            //     {text: '研发（Development）', max: 52000},
                            //     {text: '市场（Marketing）', max: 25000}
                            // ]
                        }
                    ],
                    legend: {
                        data: ['个人成绩', '班级平均成绩']
                    },
                };
                $scope.$apply();
            }
            $scope.buildChartData();
            //获取考试状态
            $scope.getRadarData = function () {
                var success = function (result) {
                    $scope.radarData = result.data;
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/score/read/getRadarData', $scope.param, success, error);
            }

            $scope.getRadarData();

        }]);