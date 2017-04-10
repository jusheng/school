'use strict';

angular.module('app')
	.controller('practisescorelistController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','$timeout','toaster','API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,$timeout,toaster,API) {
		
		$scope.app_name = "学生成绩管理";
        $scope.param = {};
        //$scope.param["classId"] = Number($state.params.id);
        
	//请求数据
	$scope.search=function(){
		var success = function(result){
			$scope.pageInfo = result.data;
			$scope.$apply();
		}
		var error = function(result){
			toaster.clear('*');
            toaster.pop('error', '', result.msg);
		}
		// $scope.param["classId"] = $state.params.id;
		API.post('/res/practise/read/list',$scope.param,success,error);

	}
	
    //默认显示第一个年级的考试列表
                if($state.params.id != 0 ){
                    $scope.param.classId = $state.params.id;
                    $scope.set_curr($scope.param.classId);

                    $scope.search();
                }else{
                    $scope.$watch("classNameList",function(){
                        if(!$scope.classNameList){
                            return false;
                        }
                        
                        console.log('有值了');
                        $scope.param.classId = ($scope.classNameList.length>0 &&　$scope.classNameList[0].id);
                        $scope.set_curr($scope.param.classId);
                        $scope.search();
                    })
                }

	$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$scope.search();
	}
	//翻页
    $scope.pagination = function (obj) {
    	
        $scope.param.pageNum=obj.page;
        $scope.search();
    };
	//选择科目
	$scope.examSubject = function (id) {
                /* ngDialog.open({
                 template: 'templateId',
                 className: 'ngdialog-theme-default',
                 width: 650,
                 plain: true
                 });*/
                ngDialog.open({
                    template: 'template/module/practisescore/practisesubject.html',
                    controller: 'practisesubjectController',
                    className: 'ngdialog-theme-green',
                    // width:700,
                    data:{examsubjectId:id,"parent_scope":$scope},
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('template/module/practisescore/practisesubjectController.js').then(function () {
                                return $ocLazyLoad.load([
                                    'toaster'
                                ]);
                            });
                        }]
                    }
                });
            }

    

} ]);