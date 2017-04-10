'use strict';

angular.module('app')
	.controller('planController', ['$rootScope', '$scope', '$http', '$state', 'Upload', 'ngDialog', 'API','toaster',
		function($rootScope, $scope, $http, $state, Upload, ngDialog, API,toaster) {

			$scope.app_name = "我的计划";


			$scope.getList = function() {
				var success = function(result) {
					$scope.class_list = result.data;
					// console.log(result);
					$scope.$apply();
				}
				var error = function(result) {
					toaster.clear('*');
					toaster.pop('error', '', result.msg);
				}
				API.post('/oa/plan/read/PlanTypeList', {}, success, error);
			}
		   $scope.getList();


		   $scope.$on("addnewclass",function(event,data){
		   	  $scope.getList();
		   })


		   //测试图表
		
		   //  var pageload = {
		   //      name: '周期',
		   //      datapoints: [
		   //          { x: '日计划', y: 50 },
		   //          { x: '周计划', y: 10 },
		   //          { x: '月计划', y: 20 },
					// { x: '季计划', y: 40 },
					// { x: '年计划', y: 67 },
					// { x: '自定义计划', y: 120 },

		   //      ],

		   //  };



		   //  $scope.config = {
		   //      title: "",
		   //      subtitle: '',
		   //      center: ['45%', '50%'],
		   //      debug: true,
		   //      showXAxis: true,
		   //      showYAxis: true,
		   //      showLegend: true,
		   //      stack: false,
			  //   legend: {
			  //       orient: 'horizontal',
			  //       x: 'center',
			  //       y:"bottom",
			  //       data:[
			  //       		'日计划',
					// 		'周计划',
					// 		'月计划',
					// 		'季计划',
					// 		'年计划',
					// 		'自定义计划'
					// 	]
			  // }
		   //  };

		   //  $scope.data = [pageload];

		    $scope.get_echarts_data = function(){
		    	var success = function(result) {

		    		 var pageload = {
					        name: '周期',
					        datapoints: result.data
					    };
					 console.log(pageload);   
					 var temp = [];
					 for (var i = 0; i < result.data.length; i++) {
					    	temp.push(result.data[i].x);
					    } 

					 $scope.config = {
				        title: "",
				        subtitle: '',
				        center: ['45%', '50%'],
				        debug: true,
				        showXAxis: true,
				        showYAxis: true,
				        showLegend: true,
				        stack: false,
					    legend: {
					        orient: 'horizontal',
					        x: 'center',
					        y:"bottom",
					        data:temp
					  }
				    };   	

				    $scope.data = [pageload];
					
					$scope.$apply();
				}
				var error = function(result) {
					// toaster.clear('*');
					// toaster.pop('error', '', result.msg);
				}

				API.post('/oa/plan/read/statistics', {}, success, error);
		    }
		    
			$scope.get_echarts_data();


}]);