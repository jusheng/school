'use strict';

angular.module('app')
	.controller('plandetailController', [ '$rootScope', '$scope', '$http', '$state','Upload','ngDialog','toaster', 'API',
	                                function($rootScope, $scope, $http, $state,Upload,ngDialog,toaster, API) {
		
    // 	$scope.s_all = 0;  //全选标记
    // $scope.select_all = function(){
    // 	$scope.s_all = !$scope.s_all;

    // 	for (var i = 0; i < $scope.pageInfo.list.length; i++) {
    // 		$scope.pageInfo.list[i].selected = $scope.s_all;
    // 	}
    // };	

    // $scope.select_per = function(index){
    // 	$scope.pageInfo.list[index].selected = !$scope.pageInfo.list[index].selected;
    // }


    $scope.detailPage = function() {
                var success = function(result) {
                    // console.log(result);
                    $scope.detailForm = result.data;
                    $scope.$apply();
                    console.log($scope.detailForm);
                }


                var error = function(result) {
                    toaster.clear('*');
                    toaster.pop('error', '', result.msg);
                }

                API.post('/oa/plan/read/detail', {
                    "id": $state.params.id
                }, success, error);

            }
            $scope.detailPage();

} ]);