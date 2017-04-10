'use strict';

angular.module('app')
    .controller('examGradeScoreChartController', ['$rootScope', '$scope', '$http', '$state', '$timeout', 'Upload', 'ngDialog', 'toaster', 'API',
        function ($rootScope, $scope, $http, $state, $timeout, Upload, ngDialog, toaster, API) {

            $scope.loading = false;

            //获取班级考试列表
            $scope.getExam = function () {

                var success = function (result) {
                    $scope.examList = result.data;
                    if ($scope.examList.length > 0) {
                        $scope.getSubjectData();
                        $scope.getGradeData();
                    } else {
                        $scope.record = [];
                        $scope.scoreData = [];
                        $scope.subjectData = [];
                    }
                    $scope.param.examId = $scope.examList.length > 0 ? $scope.examList[0].id : null;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/res/exam/read/all', {
                    subjectGroupId: $scope.param.subjectGroupId,
                    // isStudent: 1
                }, success, error);

            }

            //获取班级考试列表
            $scope.getSubjectGroup = function () {

                var success = function (result) {
                    $scope.subjectGroup = result.data;
                    // console.info($scope.subjectGroup)
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }
                API.post('/subjectGroup/read/all', {}, success, error);

            }
            $scope.getSubjectGroup();


            // $scope.getExam();

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

            // 获取科目信息
            $scope.getSubjectData = function () {
                var success = function (result) {
                    $scope.subjectData = result.data;
                    $scope.subjectIndex = 0;
                    if($scope.subjectData){
                        $scope.subjectData.push({code:"totalScore",name:"总分"})
                    }
                    $scope.$apply();
                }
                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                // $scope.param["orderBy"] = "er.total_score desc";
                API.post('/subjectGroup/read/subjectList', $scope.param, success, error);
            }

            //请求数据
            $scope.getGradeData = function () {

                var success = function (result) {
                    $scope.gradeData = result.data;
                    // console.info($scope.gradeData)
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/getGradeScoreData', {
                    examId: $scope.param.examId, groupByClassId: 1
                }, success, error);

            }

            $scope.buildChartData = function (index) {
                if (typeof($scope.gradeData) == "undefined" || typeof($scope.subjectData) == "undefined") {
                    setTimeout(function () {
                        $scope.buildChartData();
                    }, 200);
                    return;
                }
                $scope.data = [function () {
                    var obj = {
                        name: "最高分",
                        barWidth: 25,
                        barCategoryGap: '50%', datapoints: function (data) {
                            var result = [];
                            angular.forEach($scope.gradeData.max, function (val) {
                                console.info(data);
                                result.push({x: val.eduClass.name, y: val[data.code] || 0});
                            })
                            return result;
                        }($scope.subjectData[index])
                    };
                    return obj;
                }(),function () {
                    var obj = {
                        name: "平均分",
                        barWidth: 25,
                        barCategoryGap: '50%', datapoints: function (data) {
                            var result = [];
                            angular.forEach($scope.gradeData.avg, function (val) {
                                console.info(data);
                                result.push({x: val.eduClass.name, y: val[data.code] || 0});
                            })
                            return result;
                        }($scope.subjectData[index])
                    };
                    return obj;
                }(),function () {
                    var obj = {
                        name: "最低分",
                        barWidth: 25,
                        barCategoryGap: '50%', datapoints: function (data) {
                            var result = [];
                            angular.forEach($scope.gradeData.min, function (val) {
                                console.info(data);
                                result.push({x: val.eduClass.name, y: val[data.code] || 0});
                            })
                            return result;
                        }($scope.subjectData[index])
                    };
                    return obj;
                }()];

                //     [{
                //         name: "个人成绩",
                //         datapoints: function () {
                //             var result = [];
                //             for (var i = 0; i < $scope.examData.details.length; i++) {
                //                 result.push($scope.scoreData[$scope.studentIndex][$scope.examData.details[i].subject.code]);
                //             }
                //             return result;
                //         }()
                // }, {
                //         name: "班级平均成绩",
                //         datapoints: function () {
                //             var result = [];
                //             for (var i = 0; i < $scope.examData.details.length; i++) {
                //                 result.push($scope.gradeData[$scope.examData.details[i].subject.code]);
                //             }
                //             return result;
                //         }()
                // }];
                $scope.$apply();
            }

            $scope.config = {
                title: '图',
                // subtitle: 'Line Chart Subtitle',
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
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