'use strict';

angular.module('app')
	.controller('shareController', [ '$rootScope', '$scope', '$http', '$state','$timeout','Upload','ngDialog','toaster','API','$compile',
	                                function($rootScope, $scope, $http, $state,$timeout,Upload,ngDialog,toaster,API,$compile) {

	$scope.share = {
		"rangeType":2
	}

	 $scope.dirId = $scope.ngDialogData.dirId;
	 $scope.callback = $scope.ngDialogData.callback;

	$scope.$parent.myScrollOptions = {
            snap: false,
            hScrollbar:true,
            vScrollbar:true,
            scrollbars:true,
            fadeScrollbars:true,
            click: !0,
           /* onScrollEnd: function ()
            {
                alert('finshed scrolling');
            }*/
    };    

	$scope.get_teacher =  function(){
		var success = function(result){
			console.log(result);
			$scope.teachers = result.data;
			$scope.$apply();


			$timeout(function(){
				$scope.$parent.myScrollOptions.myScroll && $scope.$parent.myScrollOptions.myScroll.refresh();
			});
		}
		var error = function(){

		}

		API.post("/edu/teacher/read/all",{},success,error);

	}
	$scope.get_teacher();
	$scope.pop = function(){
            toaster.pop('success', "title", "text");
        };
	$scope.submit = function(){
		if($scope.share.rangeType==2){
			if($scope.share.userIds==undefined || $scope.share.userIds.length==0){
		
				$timeout(function(){
					toaster.pop("error",'','请选择至少一位老师！');
				})
				return false;
			}
		}


		$scope.callback($scope.dirId,$scope.share.rangeType,$scope.share.userIds);
		$scope.closeThisDialog();
	}




}])