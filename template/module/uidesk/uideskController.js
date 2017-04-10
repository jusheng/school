'use strict';

angular.module('app')
	.controller('uideskController', ['$rootScope', '$scope', '$http', '$state','$compile','$timeout',
		function($rootScope, $scope, $http, $state,$compile,$timeout) {

		$scope.app_name = "我的桌面";	

			//布局管理器
			var DATA = {
				'appL' : [
					'my-clock',
					'my-note',
					'my-plan'
				],
				'appM' :[
					'my-email',
					'my-course'
				],
				'appR' : [
					'my-news',
					'my-telbook'
				]
			}	


			Jh.fn.init(DATA);
			Jh.Portal.init(DATA);

			//动态编译指令 (对应放在桌面上的app展示) （非常重要）
			$timeout(function(){
				var temp = [];
				for (var i = 0; i < DATA.appL.length; i++) {
					temp.push(DATA.appL[i]);
				}
				for (var i = 0; i < DATA.appM.length; i++) {
					temp.push(DATA.appM[i]);
				}
				for (var i = 0; i < DATA.appR.length; i++) {
					temp.push(DATA.appR[i]);
				}


				for (var i = 0; i < temp.length; i++) {
						var scope = angular.element($('.'+temp[i])[0]).scope();
						var link = $compile($('.'+temp[i])[0]);
						link(scope);
					}	

			})

}])
