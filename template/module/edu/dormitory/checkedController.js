'use strict';

angular.module('app')
	.controller('checkedController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {

                                
       $scope.value = $scope.ngDialogData.value;
       console.log($scope.value);

       $scope.init = function(){
            var success=function(result){

                $scope.list = result.data;
                              
               
                // console.log($scope.list);
                 $scope.data = [$scope.buildChartData($scope.list)[0]];
                 $scope.multiple = $scope.buildChartData($scope.list); 

                 // console.log($scope.data);
                 // console.log($scope.multiple);


                $scope.$apply();
            }
            var error = function(result){
                toaster.clear('*');
                toaster.pop('error','',result.msg);
            }
            API.post("/edu/dorm/check/read/all",{"dormId":$scope.value},success,error);
        }

        $scope.init();


        $scope.buildChartData = function(list){
                if(list.length==0){
                    setTimeout(function(list){
                        $scope.buildChartData(list);
                    },200);
                }

                var pageload = {
                    name: '得分',
                    datapoints:(function(){
                        var result = [];
                        for(var i=0;i<list.length;i++){
                            result.push({
                                x:list[i].updateTime,
                                y:list[i].score
                            });
                        }
                        return result;
                    })()
                };

                var firstPaint = {
                    name: 'page.firstPaint',
                    datapoints:(function(){
                        var result = [];
                        for(var i=0;i<list.length;i++){
                            result.push({
                                x:list[i].updateTime,
                                y:list[i].score
                            });
                        }
                        return result;
                    })()
                };
                return [pageload,firstPaint];
        }

        $scope.config = {
            title: '宿舍历史分数图',
            subtitle: '宿舍历次评分的分数图',
            debug: true,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            stack: false,
        };


} ]);