'use strict';

angular.module('app')
	.controller('studentbooklistController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API) {

	$scope.param={ };
	$scope.loading=false;
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
                API.post('/dic/read/key', {key:"SCHEDULE_TIME_ZONE"}, success, error);
            }
    $scope.dict();
    //请求数据
	$scope.search=function(){
		$scope.s_all = 0;
		var success = function(result){
			var week = ["mon","tue","wed","thu","fri","sat","sun"];
			$scope.studentcourse = {};
			for(var i=0;i<result.data.length;i++){
				$scope.studentcourse[result.data[i].lesson] = result.data[i];
			}
			for(var i=1;i<=result.data.length;i++){
				if(!$scope.studentcourse.hasOwnProperty(i)){
					$scope.studentcourse[i] = (function(){
						var tmp = {lesson:i};
						for(var j in week){
							tmp[week[j]]={name:"自习"}
						}
						return tmp
					})()
				}else{
					for(var j in week){
					console.log($scope.studentcourse[i],$scope.studentcourse[i].hasOwnProperty(week[j]))
						if($scope.studentcourse[i][week[j]]==null){
							$scope.studentcourse[i][week[j]] = {name:"自习"};
						}
					}
				}
			}
			$scope.$apply();
		}

		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
		$scope.param["classId"] = $state.params.id;
		API.post('/edu/schedule/read/all',$scope.param,success,error);

	}
	$scope.search();

	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}

	// 翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };    

    //默认显示第一个年级的考试列表
            if ($state.params.id != 0) {
                $scope.param.classId = $state.params.id;

                $scope.set_curr($scope.param.classId);

                $scope.search();
            } else {
                $scope.$watch("className", function () {
                    if (!$scope.className) {
                        return false;
                    }

                    console.log('有值了');
                    $scope.param.classId = ($scope.className.length > 0 && $scope.className[0].id);
                    $scope.set_curr($scope.param.classId);
                    $scope.id = $scope.className[0].id;
                    $scope.search();
                })
            }                         	
} ]);