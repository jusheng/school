'use strict';

angular.module('app')
    .controller('examScoreAvgChartController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API',
        function ($rootScope, $scope, $http, $state, Upload, ngDialog, API) {

            $scope.app_name = "考试成绩";
            $scope.param = {};

            $scope.buildChartData = function(gradeData,classData){
                console.log(gradeData);
                if(!gradeData||!classData||gradeData.length==0||classData.length==0||$scope.examSubject.length==0){
                    setTimeout(function(){
                        $scope.buildChartData();
                    },200);
                }

                var cData = {
                    name:'班级平均成绩',
                    barWidth: 25,
                    barCategoryGap: '50%',
                    datapoints:(function(){
                        var result = [];
                        for(var i=0;i<$scope.examSubject.length;i++){
                            result.push({
                                x:$scope.examSubject[i].name,
                                y:classData[$scope.examSubject[i].code]?classData[$scope.examSubject[i].code]:0
                            });
                        }
                        return result;
                    })()
                };

                var gData = {
                    name:'年级平均成绩',
                    barWidth: 25,
                    barCategoryGap: '50%',
                    datapoints:(function(){
                        var result = [];
                        for(var i=0;i<$scope.examSubject.length;i++){
                            result.push({
                                x:$scope.examSubject[i].name,
                                y:gradeData[$scope.examSubject[i].code]?gradeData[$scope.examSubject[i].code]:0
                            });
                        }
                        return result;
                    })()
                };
                return [cData,gData];
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

            $scope.getClassData();

            $scope.getGradeData = function () {

                var success = function (result) {
                    $scope.gradeData = result.data;
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/read/score/avg', {examId: $state.params.examId}, success, error);

            }

            $scope.getGradeData();

            $scope.getExamSubject = function () {

                var success = function (result) {
                    $scope.examSubject = result.data;
                    $scope.data = $scope.buildChartData($scope.gradeData,$scope.classData);
                    $scope.$apply();
                }

                var error = function (result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/res/exam/score/getExamSubjects', {
                    examId: $state.params.examId
                }, success, error);

            }

            $scope.getExamSubject();

            $scope.config = {
                title: '平均成绩',
                subtitle: '',
                debug: true,
                showXAxis: true,
                showYAxis: true,
                showLegend: true,
                stack: false,
                series:{
                    barWidth:10
                }
            };

        }]);